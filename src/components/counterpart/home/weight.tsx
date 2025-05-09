"use client";

import { CheckIcon, MinusIcon, PlusIcon } from "lucide-react";
import { tw } from "@/lib/utils";
import { use, useState } from "react";
import { AnimateNumber } from "motion-number";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Package } from "@prisma/client";

const roundBtnStyle = tw`rounded-full bg-primary p-2 duration-300`;
const hoverBtnStyle = tw`hover:bg-primary/80`;

export default function InteractiveWeight({
	paket,
}: { paket: Promise<Package[]> }) {
	const paketList = use(paket);
	const [weight, setWeight] = useState(1);
	const { watch, register, getValues } = useForm({
		defaultValues: {
			paket: paketList[1].id,
		},
	});

	const searchParams = new URLSearchParams();
	searchParams.append("paket", getValues("paket"));

	return (
		<div className="flex flex-col justify-center bg-accent rounded-sm p-10 mt-10">
			<div className="flex flex-col items-center">
				<h1 className="text-4xl text-center font-semibold">
					Pilihlah Paket Cucian Anda!!!
				</h1>
				<div className="flex justify-center mt-5">
					<div>
						<h1 className="text-3xl text-nowrap">Paket :</h1>
						<fieldset className="mt-5 flex flex-col gap-5">
							{paketList.map(({ id, name, description, pricePerUnit }, i) => (
								<label className="group" key={id}>
									<input
										type="radio"
										{...register("paket")}
										value={id}
										defaultChecked={i === 1 && true}
										className="hidden"
									/>
									<div className="flex bg-primary/50 group-has-checked:bg-primary group-has-checked:border-2 border-foreground rounded-md p-5 w-100">
										<div className="grow">
											<h1 className="text-3xl">{name}</h1>
											<p className="">{description}</p>
										</div>
										<div className="flex flex-col items-end justify-around gap-2">
											<div className="p-1 rounded-full bg-stone-50 group-has-checked:bg-green-500 size-fit">
												<CheckIcon className="size-5 stroke-5 text-stone-50" />
											</div>
											<p className="text-nowrap">
												RP{" "}
												{pricePerUnit.toLocaleString("id-ID", {
													style: "decimal",
													currency: "IDR",
												})}{" "}
												/ Kg
											</p>
										</div>
									</div>
								</label>
							))}
						</fieldset>
					</div>
					<div className="grid grid-cols-2 items-center m-10 me-0 justify-items-center w-full">
						<div className="flex flex-col items-center">
							<button
								type="button"
								className={`${roundBtnStyle} ${hoverBtnStyle}`}
								onClick={() => {
									setWeight((prev) => {
										return prev + 1;
									});
								}}
							>
								<PlusIcon className="size-10" />
							</button>
							<div className="my-2 text-3xl">
								<AnimateNumber>{weight}</AnimateNumber> Kg
							</div>
							<button
								type="button"
								className={`${roundBtnStyle} ${hoverBtnStyle}`}
								onClick={() => {
									if (weight > 1) {
										setWeight((prev) => {
											return prev - 1;
										});
									}
								}}
							>
								<MinusIcon className="size-10" />
							</button>
						</div>
						<div>
							<h1 className="text-2xl">Total Harga :</h1>
							<div className="text-end text-3xl">
								<AnimateNumber
									transition={{ type: "spring" }}
									format={{ currency: "IDR", style: "currency" }}
								>
									{weight *
										(Number(
											paketList.find((p) => p.id === watch("paket"))
												?.pricePerUnit,
										) || 8000)}
								</AnimateNumber>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Link href={`/cucian/?${searchParams}`} className="self-end">
				<Button className="mt-10 text-xl p-5 w-fit self-end">
					Cuci Sekarang
				</Button>
			</Link>
		</div>
	);
}

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

	return (
		<div className="flex flex-col justify-center bg-accent rounded-sm p-10 mt-10">
			<div className="flex flex-col items-center">
				<h1 className="text-4xl text-center font-semibold">
					Pilihlah Paket Cucian Anda!!!
				</h1>
				<div>
					<h1 className="text-3xl text-nowrap mt-5">Paket :</h1>
					<fieldset className="mt-5 gap-5 grid grid-cols-3 max-h-150 overflow-y-auto overflow-x-clip">
						{paketList.map(({ id, name, description, pricePerUnit }, i) => (
							<label className="group" key={id}>
								<input
									type="radio"
									{...register("paket")}
									value={id}
									defaultChecked={i === 1 && true}
									className="hidden"
								/>
								<div className="flex flex-col bg-primary/50 group-has-checked:bg-primary group-has-checked:border-2 border-green-700 rounded-md p-5 h-full relative *:z-10 duration-500 transition-colors **:duration-500 **:transition-colors">
									<h1 className="text-3xl col-span-2">{name}</h1>
									<p className="line-clamp-3">{description}</p>
									<div className="text-nowrap text-end grow flex items-end justify-end mt-2 font-bold">
										Rp{" "}
										{pricePerUnit.toLocaleString("id-ID", {
											style: "decimal",
											currency: "IDR",
										})}{" "}
										/ Kg
									</div>
									<CheckIcon className="absolute right-5 top-0 stroke-3 stroke-primary-foreground/15 group-has-checked:stroke-green-800 size-30 z-0!" />
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
			<Link
				href={{
					pathname: "/cucian",
					query: {
						paket: getValues("paket"),
					},
				}}
				className="self-end"
			>
				<Button className="mt-10 text-xl p-5 w-fit self-end">
					Cuci Sekarang
				</Button>
			</Link>
		</div>
	);
}

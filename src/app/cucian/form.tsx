"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CucianFormSchema } from "@/lib/types/cucian";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { useEffect, useState } from "react";
import { type GetPaketList, PostCucianOrder } from "@/lib/cucian";
import { toast } from "sonner";
import { CheckIcon, Eye } from "lucide-react";
import { tw } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function CucianForm({
	isLogin,
	paketList,
	limit,
	...prop
}: z.infer<typeof CucianFormSchema> & {
	isLogin: boolean;
	paketList: Awaited<ReturnType<typeof GetPaketList>>;
	limit: boolean;
}) {
	const {
		fullName = "",
		email = "",
		phone = "",
		paket = "",
		alamat = "",
	} = prop;
	const form = useForm<z.infer<typeof CucianFormSchema>>({
		defaultValues: {
			email,
			phone,
			paket,
			fullName,
			alamat,
		},
		resolver: zodResolver(CucianFormSchema),
	});
	const [submitBtn, setSubmitBtn] = useState(true);
	const pakets = paketList;

	useEffect(() => {
		if (limit) {
			setSubmitBtn(false);
		}

		return () => {
			if (limit) {
				setSubmitBtn(false);
			}
		};
	}, [limit]);

	async function onSubmit(data: z.infer<typeof CucianFormSchema>) {
		if (limit) return;
		console.log(data);
		const res = await PostCucianOrder(data);
		if (res.success === true) {
			setSubmitBtn(false);
			toast(<strong>Berhasil Membuat Pesanan</strong>, {
				description: (
					<span className="text-muted-foreground">
						Id Pesanan Anda{" "}
						<span className="text-chart-2">{res.cucianOrderId}</span>
					</span>
				),
				action: {
					label: (
						<div className="flex gap-2 items-center">
							<Eye className="size-4" />
							<span>Detail</span>
						</div>
					),
					onClick: async () => {},
				},
				classNames: {
					actionButton: tw`p-4!`,
				},
			});
		}
		setTimeout(() => {
			form.reset();
			setSubmitBtn(true);
		}, 3000);
	}

	return (
		<>
			<Form {...form}>
				<form
					className="max-w-250 mx-auto mb-20"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div className="grid grid-cols-2 gap-10">
						<FormField
							control={form.control}
							name="fullName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nama Lengkap</FormLabel>
									<Input {...field} readOnly={isLogin} disabled={isLogin} />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{isLogin ? "Email" : "Guest Id"}</FormLabel>
									<Input {...field} readOnly disabled />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone</FormLabel>
									<Input {...field} type="number" />
									<FormMessage />
									<FormDescription>
										Nomor HP Yang bisa dihubungi jika pelanggan tidak memiliki
										akun maka bagian ini wajib diisi
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="alamat"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Alamat</FormLabel>
									<Input {...field} />
									<FormMessage />
									<FormDescription>
										Alamat Pengiriman jika kosong atau tidak jelas maka
										pelanggan harus menjemput pakaiannya sendiri
									</FormDescription>
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="paket"
						render={({ field }) => (
							<FormItem>
								<div className="mt-5 overflow-x-auto p-2">
									<h1 className="text-4xl font-semibold">Pilih Paket Cucian</h1>
									<FormMessage className="mt-2" />
									<fieldset className="mt-5 flex gap-5 flex-nowrap overflow-scroll contain-content p-1">
										{pakets?.map((e) => (
											<label key={e.id} className="aspect-square w-55 group">
												<input
													type="radio"
													{...field}
													value={e.id}
													className="hidden"
													defaultChecked={e.id === paket}
												/>
												<Card className="group-has-checked:bg-muted group-has-checked:border-green-700 ring-border ring-2 rounded-xl flex flex-col justify-center contain-content aspect-9/12 relative *:z-10">
													<CardHeader className="grow">
														<CardTitle className="text-2xl font-semibold line-clamp-2">
															{e.name}
														</CardTitle>
														<CardDescription className="line-clamp-5">
															{e.description}
														</CardDescription>
													</CardHeader>
													<CardContent className="mt-5 text-end">
														RP {Number(e.pricePerUnit)} / Kg
													</CardContent>
													<CheckIcon className="absolute right-5 top-0 stroke-3 stroke-primary-foreground/15 group-has-checked:stroke-green-800 size-30 z-0!" />
												</Card>
											</label>
										))}

										<div className="w-55 py-5 ring-border ring-2 px-5 rounded-xl flex flex-col justify-center">
											<h1 className="text-2xl font-semibold text-center">
												Coming Soon
											</h1>
											<p className="line-clamp-3 text-center mt-3">
												Paket Lainya Akan segera hadir
											</p>
										</div>
									</fieldset>
								</div>
								<FormDescription>
									Berat Kain akan dihitung di tempat dan harga akan di
									diberitahukan kepada pelanggan di notifikasi
								</FormDescription>
							</FormItem>
						)}
					/>

					<div className="flex justify-end gap-5 mt-10">
						<Button
							type="reset"
							variant={"secondary"}
							onClick={() => form.reset()}
						>
							Reset
						</Button>
						<Button type="submit" disabled={!submitBtn}>
							Pesan
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
}

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AddPaket } from "@/lib/cucian";
import { PaketFormSchema, type ServiceType } from "@/lib/types/cucian";
import { tw } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export default function AddPaketForm({ service }: { service: ServiceType[] }) {
	const form = useForm<z.infer<typeof PaketFormSchema>>({
		defaultValues: {
			name: "",
			desc: "",
			serviceIds: [],
		},
		resolver: zodResolver(PaketFormSchema),
	});
	async function Submit(data: z.infer<typeof PaketFormSchema>) {
		console.log(data);
		const res = await AddPaket(data);
		if (res?.success) {
			toast(res.message, {
				description: () => (
					<>
						{res.message} Paket ID: {res.paketId}
					</>
				),
				className: "bg-green-200! dark:bg-green-900!",
			});
			form.reset();
		} else {
			toast.error("Gagal Menambahkan Paket", {
				className: tw`bg-destructive!`,
			});
		}
	}

	return (
		<Form {...form}>
			<form
				className="space-y-10 max-w-full"
				onSubmit={form.handleSubmit(Submit)}
			>
				<div className="flex space-x-5">
					<FormItem>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nama Paket</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Masukkan Nama Paket" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormMessage />
					</FormItem>
					<FormField
						control={form.control}
						name="pricePerUnit"
						render={() => (
							<FormItem>
								<FormLabel>Harga Kiloan (Rp/Kg)</FormLabel>
								<FormControl>
									<Input
										placeholder="1000.00"
										type="number"
										step={0.01}
										{...form.register("pricePerUnit", { valueAsNumber: true })}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="desc"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Deskripsi</FormLabel>
							<FormControl>
								<Textarea {...field} className="h-30" />
							</FormControl>
							<FormMessage />
							<FormDescription>
								Deskripsi Paket untuk memperjelas pelanggan
							</FormDescription>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="serviceIds"
					render={() => (
						<FormItem>
							<h2 className="font-bold">Services</h2>
							<Card className="shadow-xs rounded-md p-5 space-y-3 max-h-50 overflow-y-auto">
								{service.map((e) => (
									<FormField
										control={form.control}
										key={e.id}
										name="serviceIds"
										render={({ field }) => (
											<FormItem className="flex">
												<FormControl>
													<Checkbox
														checked={field.value.includes(e.id)}
														onCheckedChange={(checked) => {
															if (checked) {
																field.onChange([...field.value, e.id]);
															} else {
																field.onChange([
																	...field.value.filter((id) => id !== e.id),
																]);
															}
														}}
													/>
												</FormControl>
												<div className="w-full">
													<FormLabel className="">{e.name}</FormLabel>
													<FormDescription>{e.description}</FormDescription>
												</div>
											</FormItem>
										)}
									/>
								))}
							</Card>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="float-end">
					Submit
				</Button>
			</form>
		</Form>
	);
}

"use client";

import { Button } from "@/components/ui/button";
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
import { EditService, type GetServiceById } from "@/lib/cucian";
import { ServiceFormSchema } from "@/lib/types/cucian";
import { tw } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export default function EditServisForm({
	currentData,
}: { currentData: Awaited<ReturnType<typeof GetServiceById>> }) {
	const param = useParams();
	const service = currentData?.data;
	const id = (param.id as string) ?? "";
	const form = useForm<z.infer<typeof ServiceFormSchema>>({
		defaultValues: {
			name: service?.name ?? "",
			desc: service?.description ?? "",
			estimatedTimeHours: service?.estimatedTimeHours ?? 0,
			priority: service?.priority ?? 0,
			pricePerUnit: service?.pricePerUnit ?? 0,
		},
		resolver: zodResolver(ServiceFormSchema),
	});
	async function Submit(data: z.infer<typeof ServiceFormSchema>) {
		console.log(data);
		const res = await EditService(id, data);
		if (res?.success) {
			toast.success(res.message, {
				description: () => (
					<>
						{res.message} Paket ID: {res.serviceId}
					</>
				),
				className: "bg-green-200! dark:bg-green-900!",
				classNames: {
					description: tw`text-green-900! dark:text-primary-foreground!`,
					title: tw`font-bold!`,
				},
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
				<div className="grid grid-cols-2 gap-5">
					<FormItem>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nama Servis</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Masukkan Nama Paket" />
									</FormControl>
									<FormMessage />
									<FormDescription>Nama Servis</FormDescription>
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
										placeholder="Rp"
										type="number"
										step={0.01}
										{...form.register("pricePerUnit", { valueAsNumber: true })}
									/>
								</FormControl>
								<FormMessage />
								<FormDescription>Harga tiap Kilo</FormDescription>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="estimatedTimeHours"
						render={() => (
							<FormItem>
								<FormLabel>Estimasi Waktu</FormLabel>
								<FormControl>
									<Input
										placeholder="Jam"
										type="number"
										{...form.register("estimatedTimeHours", {
											valueAsNumber: true,
										})}
									/>
								</FormControl>
								<FormMessage />
								<FormDescription>Perkiraan waktu pengerjaan</FormDescription>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="priority"
						render={() => (
							<FormItem>
								<FormLabel>Prioritas</FormLabel>
								<FormControl>
									<Input
										placeholder="Jam"
										type="number"
										{...form.register("priority", { valueAsNumber: true })}
									/>
								</FormControl>
								<FormMessage />
								<FormDescription>
									Perkiraan prioritas pengerjaan
								</FormDescription>
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
								Deskripsi Servis untuk memperjelas pelanggan
							</FormDescription>
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

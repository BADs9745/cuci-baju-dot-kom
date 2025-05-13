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
import { AddNewService } from "@/lib/cucian";
import { ServiceFormSchema } from "@/lib/types/cucian";
import { tw } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export default function AddServisForm() {
	const form = useForm<z.infer<typeof ServiceFormSchema>>({
		defaultValues: {
			name: "",
			desc: "",
		},
		resolver: zodResolver(ServiceFormSchema),
	});
	async function Submit(data: z.infer<typeof ServiceFormSchema>) {
		console.log(data);
		const res = await AddNewService(data);
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
			toast.error(res?.message, {
				className: "bg-red-200! dark:bg-red-900!",
				classNames: {
					description: tw`text-red-900! dark:text-primary-foreground!`,
					title: tw`font-bold!`,
				},
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

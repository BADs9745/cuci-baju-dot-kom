"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AddInvetoryItem } from "@/lib/inventory";
import { InventoryItemSchema } from "@/lib/types/inventory";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export default function AddForm() {
	const form = useForm<z.infer<typeof InventoryItemSchema>>({
		defaultValues: {
			name: "",
			desc: "",
		},
		resolver: zodResolver(InventoryItemSchema),
	});
	async function OnSubmit(data: z.infer<typeof InventoryItemSchema>) {
		const res = await AddInvetoryItem(data);
		if (res) {
			toast.success(`Berhasil Menmabahkan Item : ${res}`);
		} else {
			toast.error("Gagal Menmabahkan Item");
		}
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(OnSubmit)}
				className="grid grid-cols-2 gap-5"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nama Item</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="qty"
					render={() => (
						<FormItem>
							<FormLabel>Quantity</FormLabel>
							<FormControl>
								<Input
									placeholder="ex : 1"
									{...form.register("qty", { valueAsNumber: true })}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="desc"
					render={({ field }) => (
						<FormItem className="col-span-2">
							<FormLabel>Deskripsi</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-end gap-5 col-span-2">
					<Button variant={"secondary"}>Reset</Button>
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</Form>
	);
}

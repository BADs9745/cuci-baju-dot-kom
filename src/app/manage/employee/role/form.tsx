"use client";

import { Button } from "@/components/ui/button";
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
import { AddNewRole, EditRole, type GetRoleById } from "@/lib/profile";
import { roleSchema } from "@/lib/types/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

function AddForm() {
	const form = useForm<z.infer<typeof roleSchema>>({
		defaultValues: {
			name: "",
			admin: false,
		},
		resolver: zodResolver(roleSchema),
	});
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(async (data) => {
					const res = await AddNewRole(data);
					if (res?.success) {
						toast.success(res.message, {
							description: () => (
								<>
									{res.message} Role ID: {res.data?.id}
								</>
							),
							className: "bg-green-200! dark:bg-green-900!",
						});
						form.reset();
					}
				})}
			>
				<div className="grid grid-cols-2 gap-5">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nama</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
								<FormDescription>Nama Role pegaawai</FormDescription>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="authority_level"
						render={() => (
							<FormItem>
								<FormLabel>Authority Level</FormLabel>
								<FormControl>
									<Input
										{...form.register("authority_level", {
											valueAsNumber: true,
										})}
										placeholder="ex : 1"
										type="number"
									/>
								</FormControl>
								<FormMessage />
								<FormDescription>Tingkat akses pegawai</FormDescription>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="admin"
						render={({ field }) => (
							<FormItem className="flex items-center-safe p-3">
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
										className="size-5"
									/>
								</FormControl>
								<div className="w-full">
									<FormLabel className="block">
										<h1>Admin</h1>
										<FormDescription>Role sebagai admin</FormDescription>
									</FormLabel>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit">Save</Button>
			</form>
		</Form>
	);
}

function EditForm({
	initialValue,
	id,
}: { initialValue: Awaited<ReturnType<typeof GetRoleById>>; id: string }) {
	const initial = initialValue.data;
	const form = useForm<z.infer<typeof roleSchema>>({
		defaultValues: {
			name: initial?.name,
			authority_level: initial?.authority_level,
			admin: initial?.admin,
		},
		resolver: zodResolver(roleSchema),
	});
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(async (data) => {
					const res = await EditRole(data, id);
					if (res?.success) {
						toast.success(res.message, {
							description: () => (
								<>
									{res.message} Role ID: {res.data?.id}
								</>
							),
							className: "bg-green-200! dark:bg-green-900!",
						});
					}
				})}
			>
				<div className="grid grid-cols-2 gap-5">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nama</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
								<FormDescription>Nama Role pegaawai</FormDescription>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="authority_level"
						render={() => (
							<FormItem>
								<FormLabel>Authority Level</FormLabel>
								<FormControl>
									<Input
										{...form.register("authority_level", {
											valueAsNumber: true,
										})}
										placeholder="ex : 1"
										type="number"
									/>
								</FormControl>
								<FormMessage />
								<FormDescription>Tingkat akses pegawai</FormDescription>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="admin"
						render={({ field }) => (
							<FormItem className="flex">
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className="w-full">
									<FormLabel>Admin</FormLabel>
									<FormDescription>Role sebagai admin</FormDescription>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit">Save</Button>
			</form>
		</Form>
	);
}

export { AddForm, EditForm };

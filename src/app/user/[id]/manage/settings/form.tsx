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
import { UpdateProfile } from "@/lib/profile";
import { profileSchema } from "@/lib/types/profile";
import type { User } from "@/prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export default function ProfileSetttingForm({ profile }: { profile: User }) {
	const form = useForm<z.infer<typeof profileSchema>>({
		defaultValues: {
			alamat: "",
			email: profile.email,
			fullName: profile.fullName,
			phone: profile.phone ?? "",
			username: profile.username ?? "",
			password: "",
			confirmPassword: "",
		},
		resolver: zodResolver(profileSchema),
	});
	async function Submit(data: z.infer<typeof profileSchema>) {
		if (data.password.length > 0 && data.password.length < 8) {
			form.setError("password", {
				message: "Password minimal setidaknya 8 karakter",
			});
			return;
		}
		if (data.confirmPassword.length > 0 && data.password.length < 8) {
			form.setError("confirmPassword", {
				message: "Password minimal setidaknya 8 karakter",
			});
			return;
		}
		if (data.password !== data.confirmPassword) {
			form.setError("confirmPassword", {
				message: "Password Tidak sama dengan Confirm Password",
			});
		}
		const res = await UpdateProfile(profile.id, data);
		toast(res.message);
	}
	return (
		<Form {...form}>
			<form
				className="my-20 max-w-200 mx-auto space-y-10"
				onSubmit={form.handleSubmit(Submit)}
			>
				<div className="grid-cols-2 grid gap-5">
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input {...field} disabled readOnly />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Alamat Email</FormLabel>
								<FormControl>
									<Input {...field} disabled readOnly />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="fullName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nama Lengkap</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid-cols-2 grid gap-5">
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormDescription className="col-span-2">
						Isi Bagian ini jika ingin mengganti password. Kosongkan jika tidak
						ingin mengganti password
					</FormDescription>
				</div>

				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>No HP</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="alamat"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Alamat</FormLabel>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-end">
					<Button type="submit" className="">
						Simpan
					</Button>
				</div>
			</form>
		</Form>
	);
}

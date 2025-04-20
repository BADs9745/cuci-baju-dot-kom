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
import { Register } from "@/lib/auth";
import { stupidPassword } from "@/lib/stupidPassword";
import { type RegisterType, registerSchema } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export function RegisterContent() {
	const form = useForm<RegisterType>({
		defaultValues: {
			fullname: "",
			username: "",
			email: "",
			password: "",
			confirm_password: "",
			phone: "",
		},
		resolver: zodResolver(registerSchema),
	});

	async function onSubmit(data: z.infer<typeof registerSchema>) {
		if (data.password !== data.confirm_password) {
			form.setError("password", { message: "Password tidak sama" });
			form.setError("confirm_password", { message: "Password tidak sama" });
			return;
		}

		const stupidPasswordCheck = stupidPassword;
		if (stupidPasswordCheck.includes(data.password)) {
			form.setError("password", { message: "Password terlalu mudah" });
			form.setError("confirm_password", { message: "Password terlalu mudah" });
			return;
		}

		const formData = new FormData();
		for (const el in data) {
			formData.append(el, data[el as keyof typeof data]);
		}
		const res = await Register(formData);
		if (res?.meta) {
			if (res.meta.target?.includes("username")) {
				form.setError("username", { message: "Username sudah terdaftar" });
				return;
			}
			if (res.meta.target?.includes("email")) {
				form.setError("email", { message: "Email sudah terdaftar" });
				return;
			}
		}
		if (res) {
			toast("Berhasil mendaftar");
			// setTimeout(() => {
			// 	globalThis.location.replace("/");
			// }, 3000);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="contain-layout bg-muted p-10 rounded-xl"
			>
				<h1 className="text-center text-4xl font-semibold tracking-wide">
					Register
				</h1>
				<div className="grid grid-cols-2 gap-5 mt-5">
					<FormField
						name="username"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<Input {...field} />
								<FormMessage />
								<FormDescription>
									Nama yang akan digunakan untuk login
								</FormDescription>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<Input {...field} type="email" />
								<FormMessage />
								<FormDescription>Alamat email untuk verifikasi</FormDescription>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="fullname"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Fullname</FormLabel>
								<Input {...field} />
								<FormDescription>Nama lengkap untuk pendataan</FormDescription>
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
								<FormDescription>Nomor Hp yang bisa dihubungi</FormDescription>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<Input {...field} type="password" />
								<FormMessage />
								<FormDescription>Password akun anda</FormDescription>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirm_password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<Input {...field} type="password" />
								<FormMessage />
								<FormDescription>Konfirmasi Password anda</FormDescription>
							</FormItem>
						)}
					/>
				</div>
				<Button className="w-full mt-5 text-lg p-5" type="submit">
					Register
				</Button>
			</form>
		</Form>
	);
}

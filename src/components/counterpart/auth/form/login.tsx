"use client";
import { Button } from "@/components/ui/button";
import {
	FormField,
	FormItem,
	FormLabel,
	Form,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Login } from "@/lib/auth";
import type { LoginSchema } from "@/lib/types/auth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function LoginContent() {
	const form = useForm<LoginSchema>({
		defaultValues: {
			usernameOrEmail: "",
			password: "",
		},
	});

	async function onSubmit(data: LoginSchema) {
		const res = await Login(data);
		if (res === "success") {
			toast("Berhasil Login");
			return;
		}

		if (res === "user-not-found") {
			toast("Username atau Email tidak terdaftar");
			form.setError("usernameOrEmail", { message: "Username tidak terdaftar" });
			return;
		}

		if (res === "wrong-password") {
			toast("Password Salah");
			form.setError("password", { message: "Password Salah" });
			return;
		}
	}

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="contain-layout bg-muted p-10 rounded-xl space-y-10"
				>
					<h1 className="text-center text-4xl font-semibold tracking-wide">
						Login
					</h1>
					<FormField
						name="usernameOrEmail"
						control={form.control}
						render={({ field }) => (
							<FormItem className="max-w-100 mx-auto">
								<FormLabel>Username</FormLabel>
								<Input {...field} />
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="password"
						control={form.control}
						render={({ field }) => (
							<FormItem className="max-w-100 mx-auto">
								<FormLabel>Password</FormLabel>
								<Input {...field} type="password" className="max-w-100" />
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-end space-x-5 max-w-100 mx-auto">
						<Button
							type="reset"
							onClick={() => {
								form.reset();
							}}
							variant={"outline"}
						>
							Reset
						</Button>
						<Button type="submit">Submit</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}

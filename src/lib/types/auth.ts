import { z } from "zod";

export type LoginSchema = {
	usernameOrEmail: string;
	password: string;
};

export const registerSchema = z.object({
	fullname: z.string().min(5, "Nama Lengkap minimal setidaknya 5 huruf"),
	username: z.string().min(5, "Username minimal setidaknya 5 huruf"),
	email: z.string().email(),
	password: z.string().min(8, "Password minimal setidaknya 8 karakter"),
	confirm_password: z.string().min(8, "Password minimal setidaknya 8 karakter"),
	phone: z.string(),
});

export type RegisterType = z.infer<typeof registerSchema>;

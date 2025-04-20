import { z } from "zod";

export const profileSchema = z.object({
	username: z.string(),
	email: z.string().email(),
	fullName: z.string().min(5, "Nama Lengkap minimal setidaknya 5 huruf"),
	phone: z.string().optional(),
	alamat: z.string().optional(),
	password: z.string(),
	confirmPassword: z.string(),
});

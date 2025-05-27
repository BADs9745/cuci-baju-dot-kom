import { z } from "zod";

export const profileSchema = z
	.object({
		username: z
			.string()
			.min(3, "Username minimal setidaknya 3 huruf")
			.max(15, "Username maksimal 15 huruf"),
		email: z.string().email(),
		fullName: z.string().min(5, "Nama Lengkap minimal setidaknya 5 huruf"),
		phone: z.string().optional(),
		alamat: z.string().optional(),
		password: z.string().min(8, "Password minimal setidaknya 8 karakter"),
		confirmPassword: z
			.string()
			.min(8, "Password minimal setidaknya 8 karakter"),
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword;
		},
		{ message: "Password tidak sama" },
	);

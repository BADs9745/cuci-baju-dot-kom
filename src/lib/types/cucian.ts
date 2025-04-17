import { z } from "zod";

export type CucianSearchParam = {
	paket: "Paket Hemat" | "Paket Express" | "Paket Prioritas";
};

export const CucianFormSchema = z.object({
	fullName: z.string().min(5, "Nama Lengkap minimal setidaknya 5 huruf"),
	email: z.string(),
	phone: z.string().optional(),
	alamat: z.string().optional(),
	paket: z.string().min(5, "Paket Wajib Dipilih"),
});

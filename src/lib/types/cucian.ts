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

export const PaketFormSchema = z.object({
	name: z.string().min(5, "Nama Paket minimal setidaknya 5 huruf"),
	desc: z.string().min(10, "Deskripsi minimal setidaknya 10 huruf"),
	pricePerUnit: z.number({ message: "Harga harus diisi" }).multipleOf(0.01),
	serviceIds: z.array(z.string()).min(1, "Minimal 1 Servis harus dipilih"),
	id: z.string().optional(),
});

export const ServiceFormSchema = z.object({
	name: z.string().min(5, "Nama Servis minimal setidaknya 5 huruf"),
	desc: z.string().min(10, "Deskripsi minimal setidaknya 10 huruf"),
	pricePerUnit: z.number({ message: "Harga harus diisi" }).multipleOf(0.01),
	estimatedTimeHours: z.number({ message: "Estimasi waktu harus diisi" }),
	priority: z.number({ message: "Nilai Prioritas harus diisi" }),
});

export type ServiceType = {
	name: string;
	id: string;
	packageId: string | null;
	description: string | null;
	pricePerUnit: number;
	estimatedTimeHours: number;
	priority: number;
};

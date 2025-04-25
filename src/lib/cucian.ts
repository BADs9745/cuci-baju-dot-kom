"use server";
import "server-only";

import type { z } from "zod";
import { prisma } from "./prisma";
import type { CucianFormSchema } from "./types/cucian";
import type { PrismaClientError } from "./types/db";
import { revalidatePath } from "next/cache";
import type { $Enums } from "@/prisma";

export async function GetPaketList() {
	const paket = await prisma.package.findMany({
		orderBy: {
			pricePerUnit: "asc",
		},
	});
	return paket;
}

export async function DeleteCucianOrder(id: string) {
	try {
		const res = await prisma.cucianOrder.delete({
			where: { id },
			select: {
				id: true,
			},
		});
		return {
			success: true,
			message: "Berhasil Menghapus Order",
			cucianOrderId: res.id,
			meta: null,
		};
	} catch (error) {
		const { meta } = error as PrismaClientError;
		return {
			success: false,
			message: "Gagal Menghapus Order",
			cucianOrderId: null,
			meta,
		};
	}
}

export async function PostCucianOrder(data: z.infer<typeof CucianFormSchema>) {
	const user = await prisma.user.findUnique({
		where: {
			email: data.email,
		},
	});

	try {
		const cucianOrder = await prisma.cucianOrder.create({
			data: {
				nama: data.fullName,
				phone: data.phone,
				alamat: data.alamat,
				Paket: {
					connect: {
						id: data.paket,
					},
				},
			},
			select: {
				id: true,
			},
		});
		if (user) {
			await prisma.cucianOrder.update({
				where: {
					id: cucianOrder.id,
				},
				data: {
					User: {
						connect: {
							id: user.id,
						},
					},
				},
			});
		}
		revalidatePath("/cucian");
		return {
			success: true,
			message: "Berhasil Membuat Order",
			cucianOrderId: cucianOrder.id,
			meta: null,
		};
	} catch (error) {
		const { meta } = error as PrismaClientError;
		return {
			success: false,
			message: "Gagal Membuat Order",
			cucianOrderId: null,
			meta: meta,
		};
	}
}

export async function CountUserCucianOrder(id: string) {
	const cucianOrders = await prisma.cucianOrder.findMany({
		where: {
			userId: id,
			status: {
				notIn: ["COMPLETED", "CANCELLED"],
			},
		},
		select: {
			id: true,
		},
	});
	return cucianOrders.length;
}

export async function GetAllCucianOrder(
	namaOrId?: string,
	status?: $Enums.StatusOrder,
) {
	const cucian = await prisma.cucianOrder.findMany({
		where: {
			OR: [
				{
					User: {
						fullName: {
							contains: namaOrId,
							mode: "insensitive",
						},
					},
				},
				{
					id: {
						contains: namaOrId,
					},
				},
			],
			status: status,
		},
		include: {
			Paket: true,
			User: true,
			Service: true,
		},
		orderBy: {
			createAt: "desc",
		},
	});
	return cucian;
}

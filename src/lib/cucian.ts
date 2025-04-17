"use server";
import "server-only";

import type { z } from "zod";
import { prisma } from "./prisma";
import type { CucianFormSchema } from "./types/cucian";
import type { PrismaClientError } from "./types/db";

export async function GetPaketList() {
	const paket = await prisma.package.findMany({
		orderBy: {
			pricePerUnit: "asc",
		},
	});
	return paket;
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
				paket: {
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
		return {
			success: 1,
			message: "Create Order Successful",
			cucianOrderId: cucianOrder.id,
			meta: null,
		};
	} catch (error) {
		const { meta } = error as PrismaClientError;
		return {
			success: 1,
			message: "Create Order Successful",
			cucianOrderId: null,
			meta: meta,
		};
	}
}

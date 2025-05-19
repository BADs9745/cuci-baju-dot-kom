"use server";
import "server-only";

import type { z } from "zod";
import { prisma } from "./prisma";
import type {
	CucianFormSchema,
	PaketFormSchema,
	ServiceFormSchema,
} from "./types/cucian";
import type { PrismaClientError } from "./types/db";
import { revalidatePath } from "next/cache";
import type { $Enums } from "@/prisma";
import { PrismaClientKnownRequestError } from "@/prisma/runtime/library";

async function GetPaketById(id: string) {
	const paket = await prisma.package.findUnique({
		where: {
			id,
		},
		include: {
			Service: true,
		},
	});
	return {
		...paket,
		pricePerUnit: paket?.pricePerUnit.toNumber(),
		Service: paket?.Service.map((e) => ({
			...e,
			pricePerUnit: e.pricePerUnit.toNumber(),
		})),
	};
}

async function GetPaketList(
	{
		includeService,
		getActivate,
	}: { includeService?: boolean; getActivate?: boolean } = {
		includeService: false,
		getActivate: undefined,
	},
) {
	const paket = await prisma.package.findMany({
		orderBy: {
			pricePerUnit: "asc",
		},
		include: {
			Service: includeService,
		},
		where: {
			active: getActivate,
		},
	});
	return paket.map((e) => ({
		...e,
		pricePerUnit: e.pricePerUnit.toNumber(),
		Service: e.Service?.map((e) => ({
			...e,
			pricePerUnit: e.pricePerUnit.toNumber(),
		})),
	}));
}

async function AddPaket(data: z.infer<typeof PaketFormSchema>) {
	try {
		const paket = await prisma.package.create({
			data: {
				name: data.name,
				pricePerUnit: data.pricePerUnit,
				description: data.desc,
				Service: {
					connect: [
						...data.serviceIds.map((id) => ({
							id,
						})),
					],
				},
			},
			select: {
				id: true,
			},
		});
		revalidatePath("/manage/cucian/paket");
		return {
			success: true,
			message: "Berhasil Menambahkan Paket",
			paketId: paket.id,
		};
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			const { meta } = error as PrismaClientError;
			return {
				success: false,
				message: "Gagal Menambahkan Paket",
				paketId: null,
				meta,
			};
		}
	}
}
async function EditPaket(data: z.infer<typeof PaketFormSchema>, id: string) {
	try {
		const paket = await prisma.package.update({
			where: {
				id,
			},
			data: {
				name: data.name,
				pricePerUnit: data.pricePerUnit,
				description: data.desc,
				Service: {
					connect: [
						...data.serviceIds.map((id) => ({
							id,
						})),
					],
				},
			},
			select: {
				id: true,
			},
		});
		revalidatePath("/manage/cucian/paket");
		return {
			success: true,
			message: "Berhasil Mengubah Paket",
			paketId: paket.id,
		};
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			const { meta } = error as PrismaClientError;
			return {
				success: false,
				message: "Gagal Mengubah Paket",
				paketId: null,
				meta,
			};
		}
	}
}

async function GetAllService(
	{ timestamp }: { timestamp?: boolean } = {
		timestamp: false,
	},
) {
	return await prisma.service.findMany({
		orderBy: { name: "asc" },
		omit: {
			createdAt: !timestamp,
			updatedAt: !timestamp,
		},
	});
}

async function GetServiceById(id: string) {
	async function GetData(id: string) {
		const val = await prisma.service.findUnique({
			where: {
				id,
			},
		});
		return {
			...val,
			pricePerUnit: val?.pricePerUnit.toNumber(),
		};
	}

	try {
		const res = await GetData(id);

		return {
			success: true,
			message: "Berhasil Mendapatkan Layanan",
			serviceId: res?.id,
			data: res,
		};
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			return {
				success: false,
				message: error.message,
				serviceId: null,
				meta: error.meta,
				data: null as unknown as Awaited<ReturnType<typeof GetData>>,
			};
		}
	}
}

async function AddNewService(data: z.infer<typeof ServiceFormSchema>) {
	console.log("first");
	async function AddService(data: z.infer<typeof ServiceFormSchema>) {
		const res = await prisma.service.create({
			data: {
				name: data.name,
				description: data.desc,
				pricePerUnit: data.pricePerUnit,
				estimatedTimeHours: data.estimatedTimeHours,
				priority: data.priority,
			},
		});
		return res;
	}
	try {
		const res = await AddService(data);
		revalidatePath("/manage/cucian/servis");
		return {
			success: true,
			message: "Berhasil Menambahkan Layanan",
			serviceId: res.id,
		};
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			const res = error.meta;
			return {
				success: false,
				message: "Gagal Menambahkan Layanan",
				serviceId: null,
				meta: res,
			};
		}
	}
}
async function DeleteService(id: string) {
	async function Delete(id: string) {
		const service = await prisma.service.delete({
			where: {
				id,
			},
		});
		return service;
	}
	try {
		const res = await Delete(id);
		revalidatePath("/manage/cucian/servis");
		return {
			success: true,
			message: "Berhasil Menghapus Layanan",
			serviceId: res.id,
		};
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			const res = error.meta;
			return {
				success: false,
				message: "Gagal Menghapus Layanan",
				serviceId: null,
				meta: res,
			};
		}
	}
}
async function EditActivatePaket(id: string, active: boolean) {
	try {
		const res = await prisma.package.update({
			where: { id },
			data: { active },
			select: {
				id: true,
			},
		});
		return {
			success: true,
			message: "Berhasil Mengupdate Paket",
			paketId: res.id,
			meta: null,
		};
	} catch (error) {
		const { meta } = error as PrismaClientError;
		return {
			success: false,
			message: "Gagal Mengupdate Paket",
			paketId: null,
			meta,
		};
	}
}

async function DeleteCucianOrder(id: string) {
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

async function PostCucianOrder(data: z.infer<typeof CucianFormSchema>) {
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
				userIndentifier: data.email,
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

async function CountUserCucianOrder(id: string, guestId: string) {
	let cucianQty: number;
	if (id) {
		const cucianOrder = await prisma.cucianOrder.findMany({
			where: {
				OR: [
					{
						userId: id,
						status: {
							notIn: ["COMPLETED", "CANCELLED"],
						},
					},
				],
			},
			select: {
				id: true,
			},
		});
		cucianQty = cucianOrder.length;
	} else {
		const GuestcucianOrders = await prisma.cucianOrder.findMany({
			where: {
				OR: [
					{
						userIndentifier: guestId,
						status: {
							notIn: ["COMPLETED", "CANCELLED"],
						},
					},
				],
			},
			select: {
				id: true,
			},
		});
		cucianQty = GuestcucianOrders.length;
	}
	return cucianQty;
}

async function GetAllCountCucianOrder(
	namaOrId?: string,
	status: $Enums.StatusOrder = "PENDING",
) {
	try {
		const cucian = await prisma.cucianOrder.findMany({
			where: {
				OR: [
					{
						User: {
							fullName: {
								contains: namaOrId || "",
								mode: "insensitive",
							},
						},
					},
					{
						id: {
							contains: namaOrId || "",
						},
					},
				],
				status,
			},
			select: {
				id: true,
			},
		});
		return cucian.length;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		const cucian = await prisma.cucianOrder.findMany({
			where: {
				OR: [
					{
						User: {
							fullName: {
								contains: namaOrId || "",
								mode: "insensitive",
							},
						},
					},
					{
						id: {
							contains: namaOrId || "",
						},
					},
				],
			},
			select: {
				id: true,
			},
		});
		return cucian.length;
	}
}

async function GetAllCucianOrder(
	namaOrId?: string,
	status: $Enums.StatusOrder = "PENDING",
	page = 1,
) {
	let skip = 0;
	if (page > 0) {
		skip = (page - 1) * 10;
	}
	try {
		const cucian = await prisma.cucianOrder.findMany({
			where: {
				OR: [
					{
						User: {
							fullName: {
								contains: namaOrId || "",
								mode: "insensitive",
							},
						},
					},
					{
						id: {
							contains: namaOrId || "",
							mode: "insensitive",
						},
					},
					{
						nama: {
							contains: namaOrId || "",
							mode: "insensitive",
						},
					},
				],
				status,
			},
			include: {
				Paket: true,
				User: true,
				Service: true,
			},
			orderBy: {
				createAt: "desc",
			},
			skip,
			take: 11,
		});
		return cucian.map((e) => ({
			...e,
			Paket: { ...e.Paket, pricePerUnit: e.Paket.pricePerUnit.toNumber() },
			Service: e.Service.map((el) => ({
				...el,
				pricePerUnit: el.pricePerUnit.toNumber(),
			})),
		}));
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		const cucian = await prisma.cucianOrder.findMany({
			where: {
				OR: [
					{
						User: {
							fullName: {
								contains: namaOrId || "",
								mode: "insensitive",
							},
						},
					},
					{
						id: {
							contains: namaOrId || "",
						},
					},
				],
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
		return cucian.map((e) => ({
			...e,
			Paket: { ...e.Paket, pricePerUnit: e.Paket.pricePerUnit.toNumber() },
			Service: e.Service.map((el) => ({
				...el,
				pricePerUnit: el.pricePerUnit.toNumber(),
			})),
		}));
	}
}

async function EditOrderStatus(id: string, status: $Enums.StatusOrder) {
	const cucianOrder = await prisma.cucianOrder.update({
		where: {
			id,
		},
		data: {
			status,
		},
	});
	return cucianOrder;
}

async function GetOrderById(id: string) {
	const order = await prisma.cucianOrder.findUnique({
		where: {
			id,
		},
		include: {
			Paket: true,
			User: true,
			Service: true,
		},
	});
	const mappedOrder = {
		...order,
		Paket: {
			...order?.Paket,
			pricePerUnit: order?.Paket.pricePerUnit.toNumber(),
		},
		Service: order?.Service.map((el) => ({
			...el,
			pricePerUnit: el.pricePerUnit.toNumber(),
		})),
	};
	return mappedOrder;
}

async function EditService(
	id: string,
	data: z.infer<typeof ServiceFormSchema>,
) {
	async function Edit(data: z.infer<typeof ServiceFormSchema>) {
		const service = await prisma.service.update({
			where: {
				id,
			},
			data: {
				name: data.name,
				description: data.desc,
				pricePerUnit: data.pricePerUnit,
				estimatedTimeHours: data.estimatedTimeHours,
				priority: data.priority,
			},
		});
		return service;
	}
	try {
		const res = await Edit(data);
		revalidatePath("/manage/cucian/servis");
		return {
			success: true,
			message: "Berhasil Mengubah Layanan",
			serviceId: res.id,
		};
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			const res = error.meta;
			return {
				success: false,
				message: "Gagal Mengubah Layanan",
				serviceId: null,
				meta: res,
			};
		}
	}
}
export {
	// Get
	GetAllCucianOrder,
	GetPaketList,
	GetPaketById,
	GetAllCountCucianOrder,
	GetAllService,
	GetOrderById,
	GetServiceById,
	// Add
	AddPaket,
	AddNewService,
	// Post
	PostCucianOrder,
	// Count
	CountUserCucianOrder,
	// Edit
	EditPaket,
	EditActivatePaket,
	EditOrderStatus,
	EditService,
	// Delete
	DeleteCucianOrder,
	DeleteService,
};

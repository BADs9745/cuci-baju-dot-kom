"use server";
import "server-only";
import { prisma } from "./prisma";
import type { PrismaClientError } from "./types/db";
import type { User } from "@/prisma/client";
import type { z } from "zod";
import type { profileSchema, roleSchema } from "./types/profile";
import { Hash } from "./crypto";
import { revalidatePath } from "next/cache";

async function GetProfileById(id: string) {
	try {
		const profile = await prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				Role: {
					select: {
						name: true,
						id: true,
					},
				},
			},
			omit: {
				passwordHash: true,
			},
		});
		return profile as unknown as PrismaClientError & {
			Role: { name: string; id: string };
		} & User;
	} catch (error) {
		const { meta } = error as unknown as PrismaClientError;
		return { meta } as PrismaClientError & {
			Role: { name: string; id: string };
		} & User;
	}
}

async function UpdateProfile(id: string, data: z.infer<typeof profileSchema>) {
	if ((data.password ?? "").length >= 8) {
		const hashedPassword = await Hash(data.password ?? "");
		await prisma.user.update({
			where: { id },
			data: {
				passwordHash: hashedPassword,
			},
		});
	}
	try {
		await prisma.user.update({
			where: { id },
			data: {
				fullName: data.fullName,
				phone: data.phone,
				alamat: data.alamat,
			},
			omit: {
				createdAt: true,
				updatedAt: true,
				passwordHash: true,
			},
		});
		return {
			meta: {
				modelName: "",
				target: "",
			},
			success: true,
			message: "Profile Updated Successfully",
		} as PrismaClientError & {
			success: boolean;
			message: string;
		};
	} catch (error) {
		const { meta } = error as unknown as PrismaClientError;
		return {
			meta,
			success: false,
			message: "Failed to update profile",
		} as PrismaClientError & {
			success: boolean;
			message: string;
		};
	}
}

async function GetAllProfile() {
	async function getAll() {
		const profiles = await prisma.user.findMany({
			omit: {
				passwordHash: true,
				Settings: true,
			},
			include: {
				Role: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
		return profiles;
	}
	try {
		const profiles = await getAll();
		return {
			data: profiles,
			success: true,
			message: "Profiles retrieved successfully",
		};
	} catch (error) {
		if (error) {
		}
		return {
			data: [],
			success: false,
			message: "Profiles retrieved failed",
		};
	}
}

async function GetAllRoles() {
	return await prisma.userRole.findMany();
}

async function GetRoleById(id: string) {
	async function get(id: string) {
		return await prisma.userRole.findUnique({
			where: {
				id,
			},
		});
	}
	let res: {
		success: boolean;
		message: string;
		data: Awaited<ReturnType<typeof get>> | null;
	};
	try {
		res = {
			success: true,
			message: "Role retrieved successfully",
			data: await get(id),
		};
	} catch (error) {
		if (error) {
		}
		res = {
			success: false,
			message: "Role retrieved failed",
			data: null,
		};
	}
	return res;
}

async function AddNewRole(data: z.infer<typeof roleSchema>) {
	async function create(cdata: typeof data) {
		return await prisma.userRole.create({
			data: {
				name: cdata.name,
				admin: cdata.admin,
				authority_level: cdata.authority_level,
			},
		});
	}
	let res: {
		success: boolean;
		message: string;
		data: Awaited<ReturnType<typeof create>> | null;
	};
	try {
		res = {
			success: true,
			message: "Role created successfully",
			data: await create(data),
		};
		revalidatePath("/manage/employee");
	} catch (error) {
		if (error) {
		}
		res = {
			success: false,
			message: "Failed to create role",
			data: null,
		};
	}
	return res;
}
async function EditRole(data: z.infer<typeof roleSchema>, id: string) {
	async function Edit(cdata: typeof data, id: string) {
		return await prisma.userRole.update({
			data: {
				name: cdata.name,
				admin: cdata.admin,
				authority_level: cdata.authority_level,
			},
			where: {
				id,
			},
		});
	}
	let res: {
		success: boolean;
		message: string;
		data: Awaited<ReturnType<typeof Edit>> | null;
	};
	try {
		res = {
			success: true,
			message: "Role created successfully",
			data: await Edit(data, id),
		};
		revalidatePath("/manage/employee");
	} catch (error) {
		if (error) {
		}
		res = {
			success: false,
			message: "Failed to create role",
			data: null,
		};
	}
	return res;
}

async function DeleteRoleById(id: string) {
	async function Delete(id: string) {
		return await prisma.userRole.delete({
			where: {
				id,
			},
			select: {
				id: true,
			},
		});
	}
	let res: {
		success: boolean;
		message: string;
		data: Awaited<ReturnType<typeof Delete>> | null;
	};
	try {
		res = {
			success: true,
			message: "Role deleted successfully",
			data: await Delete(id),
		};
	} catch (error) {
		if (error) {
		}
		res = {
			success: false,
			message: "Someone using this role",
			data: null,
		};
	}

	revalidatePath("/manage/employee");
	return res;
}

async function EditChangeUserRole(id: string, roleId: string) {
	async function update(id: string, roleId: string) {
		return await prisma.user.update({
			where: { id },
			data: {
				Role: {
					connect: {
						id: roleId,
					},
				},
			},
			select: {
				id: true,
				Role: {
					select: {
						id: true,
					},
				},
			},
		});
	}
	try {
		revalidatePath("/manage/employee");
		const userRole = await update(id, roleId);
		return {
			success: true,
			message: "User role updated successfully",
			data: userRole,
		};
	} catch (error) {
		if (error) {
		}
		return {
			success: true,
			message: "User role updated failed",
			data: null,
		};
	}
}

export {
	// Get
	GetProfileById,
	GetAllProfile,
	GetAllRoles,
	GetRoleById,
	EditRole,
	// Update / Edit
	UpdateProfile,
	EditChangeUserRole,
	AddNewRole,
	DeleteRoleById,
};

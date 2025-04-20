"use server";
import "server-only";
import { prisma } from "./prisma";
import type { PrismaClientError } from "./types/db";
import type { User } from "@/prisma/client";
import type { z } from "zod";
import type { profileSchema } from "./types/profile";
import { Hash } from "./crypto";

export async function GetProfileById(id: string) {
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

export async function UpdateProfile(
	id: string,
	data: z.infer<typeof profileSchema>,
) {
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

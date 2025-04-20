"use server";
import { cookies } from "next/headers";
import { prisma } from "./prisma";
import type { User } from "@/prisma/client";
import type { PrismaClientError } from "./types/db";
import { revalidatePath } from "next/cache";

export async function isLogin() {
	const cookie = await cookies();
	const token = cookie.get("token");
	if (token) return token.value;
	return false;
}

export async function ReNewSession(token: string) {
	const cookie = await cookies();
	try {
		const session = await prisma.loginSession.update({
			where: {
				id: token,
			},
			data: {
				expire: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
				User: {
					update: {
						lastLogin: new Date(),
					},
				},
			},
		});
		cookie.set("token", session.id, {
			expires: session.expire,
		});
	} catch (error) {
		const { meta } = error as unknown as PrismaClientError;
		if (meta.modelName === "LoginSession") {
			cookie.delete("token");
		}
	}
}

export async function GetProfileByToken(token: string) {
	try {
		const profileData = await prisma.user.findFirstOrThrow({
			where: {
				Session: {
					some: { id: token },
				},
			},
			omit: {
				createdAt: true,
				updatedAt: true,
				passwordHash: true,
			},
			include: {
				Role: {
					select: {
						name: true,
						id: true,
					},
				},
			},
		});
		return profileData as unknown as User &
			PrismaClientError & {
				Role: {
					name: string;
					id: string;
				};
			};
	} catch (error) {
		const { meta } = error as unknown as PrismaClientError;
		return { meta } as unknown as PrismaClientError &
			User & {
				Role: {
					name: string;
					id: string;
				};
			};
	}
}

export async function LogOut() {
	const token = await isLogin();
	if (token) {
		try {
			await prisma.loginSession.delete({
				where: {
					id: token,
				},
				select: {
					id: true,
				},
			});
			revalidatePath("/");
		} catch (error) {
			const { meta } = error as unknown as PrismaClientError;
			return { meta };
		}
	}
}

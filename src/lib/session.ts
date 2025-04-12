"use server";
import { cookies } from "next/headers";
import { prisma } from "./prisma";
import type { User } from "@prisma/client";
import type { PrismaClientError } from "./types/db";

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

export async function GetProfile(token: string) {
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
					},
				},
			},
		});
		return profileData as unknown as User & PrismaClientError;
	} catch (error) {
		const { meta } = error as unknown as PrismaClientError;
		return { meta } as unknown as PrismaClientError & User;
	}
}

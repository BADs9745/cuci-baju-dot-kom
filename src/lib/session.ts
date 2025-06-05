"use server";
import { cookies } from "next/headers";
import { prisma } from "./prisma";
import type { PrismaClientError } from "./types/db";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { PrismaClientKnownRequestError } from "@/prisma/runtime/library";

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
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		cookie.delete("token");
		GuestAccountHandler();
	}
}

export async function GuestAccountHandler() {
	const cokiees = await cookies();
	const getGuest = cokiees.get("guest");
	if (getGuest?.value.length === 21) return;
	const newGuestId = nanoid(21);
	cokiees.set("guest", newGuestId);
}

export async function GetProfileByToken(token: string) {
	async function GetProfile() {
		return await prisma.user.findFirstOrThrow({
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
				Role: true,
			},
		});
	}
	try {
		const profileData = await GetProfile();
		return {
			data: profileData as unknown as Awaited<ReturnType<typeof GetProfile>>,
			error: null,
		};
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			return {
				data: {} as unknown as Awaited<ReturnType<typeof GetProfile>>,
				error: error as PrismaClientKnownRequestError,
			};
		}
		return {
			data: null as unknown as Awaited<ReturnType<typeof GetProfile>>,
			error: error,
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
			revalidatePath("/", "layout");
		} catch (error) {
			const { meta } = error as unknown as PrismaClientError;
			return { meta };
		}
	}
}

"use server";
import "server-only";
import { GetFormDatas } from "./utils";
import { Hash } from "./crypto";
import { prisma } from "./prisma";
import { cookies } from "next/headers";
import type { PrismaClientError } from "./types/db";
import type { LoginSchema, RegisterType } from "./types/auth";

export async function Register(formData: FormData) {
	const data = GetFormDatas<RegisterType & { hashedPassword: string }>(
		formData,
	);
	data.hashedPassword = await Hash(data.password);

	try {
		const user = await prisma.user.create({
			data: {
				username: data.username.toLocaleLowerCase(),
				email: data.email.toLocaleLowerCase(),
				fullName: data.fullname,
				passwordHash: data.hashedPassword,
				phone: data.phone,
				Role: {
					connectOrCreate: {
						where: { name: "user" },
						create: { name: "user" },
					},
				},
			},
			select: {
				username: true,
			},
		});
		const login = await Login({
			usernameOrEmail: user.username,
			password: data.password,
		});
		return login as unknown as PrismaClientError & boolean;
	} catch (error) {
		const { meta } = error as unknown as PrismaClientError;
		return { meta } as PrismaClientError & boolean;
	}
}

export async function Login(
	data: LoginSchema,
): Promise<"user-not-found" | "wrong-password" | "success"> {
	const user = await prisma.user.findFirst({
		where: {
			OR: [
				{ email: data.usernameOrEmail.toLocaleLowerCase() },
				{
					username: data.usernameOrEmail.toLocaleLowerCase(),
				},
			],
		},
	});
	if (!user) return "user-not-found";
	const isPasswordMatch = (await Hash(data.password)) === user.passwordHash;
	if (isPasswordMatch) {
		const cookie = await cookies();
		const session = await prisma.loginSession.create({
			data: {
				userId: user.id,
				expire: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // Set expiration to 24 hours from now
			},
		});
		cookie.set("token", session.id, {
			expires: session.expire,
		}); // Set expiration to 24 hours from now
	}
	return isPasswordMatch ? "success" : "wrong-password";
}

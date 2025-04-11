"use server";
import "server-only";
import type { RegisterType } from "@/components/counterpart/auth/form/register";
import { GetFormDatas } from "./utils";
import { Hash } from "./crypto";
import { prisma } from "./prisma";
import type { LoginSchema } from "@/components/counterpart/auth/form/login";
import type { User } from "@prisma/client";
import { cookies } from "next/headers";
import type { PrismaClientError } from "./types/db";

export async function Register(formData: FormData) {
	const data = GetFormDatas<RegisterType>(formData);
	data.password = await Hash(data.password);

	try {
		const user = await prisma.user.create({
			data: {
				username: data.username.toLocaleLowerCase(),
				email: data.email.toLocaleLowerCase(),
				fullName: data.fullname,
				passwordHash: data.password,
				phone: data.phone,
				Role: {
					connectOrCreate: {
						where: { name: "user" },
						create: { name: "user" },
					},
				},
			},
		});

		return user as User & PrismaClientError;
	} catch (error) {
		const { meta } = error as unknown as PrismaClientError;
		return { meta } as PrismaClientError & User;
	}
}

export async function Login(data: LoginSchema) {
	const user = await prisma.user.findFirstOrThrow({
		where: {
			OR: [
				{ email: data.usernameOrEmail.toLocaleLowerCase() },
				{
					username: data.usernameOrEmail.toLocaleLowerCase(),
				},
			],
		},
	});
	if (!user) return null;
	const isPasswordMatch = (await Hash(data.password)) === user.passwordHash;
	if (isPasswordMatch) {
		const cookie = await cookies();
		const session = await prisma.loginSession.create({
			data: {
				userId: user.id,
				expire: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // Set expiration to 24 hours from now
			},
		});
		cookie.set("token", session.id);
	}
	return isPasswordMatch;
}

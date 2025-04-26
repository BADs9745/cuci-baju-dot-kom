"use client";
import { isLogin, ReNewSession } from "@/lib/session";
import { useEffect } from "react";

export default function SessionProvider() {
	useEffect(() => {
		async function SessionHandler() {
			const token = (await isLogin()) ?? "";
			await ReNewSession(token as string);
		}
		SessionHandler();
	}, []);

	return null;
}

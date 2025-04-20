"use server";

import { GetProfileByToken, isLogin } from "@/lib/session";

export default async function AaaadminPage() {
	const token = (await isLogin()) || "";
	const profile = await GetProfileByToken(token);
	if (profile.Role?.id !== "329c0b43-4615-465f-a03c-ab718f679f43") {
		return <>You are not admin</>;
	}
	return <>Your Admin</>;
}

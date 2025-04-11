"use client";

import { GetProfile, isLogin } from "@/lib/session";
import type { User } from "@prisma/client";
import { useEffect, useState } from "react";

export default function AvatarProfile() {
	const [profile, setProfile] = useState({} as User);
	useEffect(() => {
		async function ProfileInitializer() {
			const token = await isLogin();
			const profile = await GetProfile(token as string);
			console.log(profile);
			setProfile(profile);
		}
		ProfileInitializer();
		return () => {};
	}, []);

	return (
		<div className="cursor-pointer">{profile.fullName ?? "Not Found"}</div>
	);
}

"use client";

import { playwrite, varelaRound } from "@/font/font";
import { CalendarDaysIcon } from "lucide-react";
import { Button } from "../ui/button";
import AvatarProfile from "../custom/client/avatar";
import { useEffect, useState } from "react";
import { GetProfileByToken, isLogin } from "@/lib/session";
import { NavbarDropDownMenu } from "../custom/client/dropdown";
import { NavigationList } from "../custom/client/navigationList";
import Link from "next/link";

export default function Navbar() {
	const [profile, setProfile] = useState(
		{} as Awaited<ReturnType<typeof GetProfileByToken>>,
	);

	useEffect(() => {
		async function ProfileInitializer() {
			const token = await isLogin();
			const profile = await GetProfileByToken(token as string);
			setProfile(profile);
		}
		ProfileInitializer();
		return () => {};
	}, []);
	return (
		<nav className="py-10 flex justify-between items-center">
			<Link href={"/"}>
				<h1 className={`${playwrite.className} italic font-black text-4xl`}>
					Cuci Baju Dot Kom
				</h1>
			</Link>
			<NavigationList />
			<div className="flex gap-5">
				<NavbarDropDownMenu />
				<Button className={`${varelaRound.className} text-base`}>
					Reservasi <CalendarDaysIcon className="size-5 ms-2" />
				</Button>
				<AvatarProfile profile={profile} />
			</div>
		</nav>
	);
}

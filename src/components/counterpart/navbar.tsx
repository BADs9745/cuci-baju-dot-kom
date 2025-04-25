"use client";

import { playwrite, varelaRound } from "@/font/font";
import { CalendarDaysIcon } from "lucide-react";
import { Button } from "../ui/button";
import AvatarProfile from "../custom/clientComponent/avatar";
import { useEffect, useState } from "react";
import type { User } from "@/prisma/client";
import { GetProfileByToken, isLogin } from "@/lib/session";
import { NavbarDropDownMenu } from "../custom/clientComponent/dropdown";
import { NavigationList } from "../custom/clientComponent/navigationList";

export default function Navbar() {
	const [profile, setProfile] = useState({} as User);
	useEffect(() => {
		async function ProfileInitializer() {
			const token = await isLogin();
			const profile = await GetProfileByToken(token as string);
			console.log(profile);
			setProfile(profile);
		}
		ProfileInitializer();
		return () => {};
	}, []);
	return (
		<nav className="py-10 flex justify-between items-center">
			<h1 className={`${playwrite.className} italic font-black text-4xl`}>
				Cuci Baju Dot Kom
			</h1>
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

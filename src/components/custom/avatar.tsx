"use client";

import { GetProfile, isLogin } from "@/lib/session";
import type { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { CircleUserRoundIcon, SettingsIcon } from "lucide-react";

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

	return profile.id ? <LoginAvatar profile={profile} /> : <LoginBtn />;
}

function LoginAvatar({ profile }: { profile: User }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="text-base text-ellipsis">
					<CircleUserRoundIcon className="size-5" />
					<span>{profile.fullName.split(" ")[0]}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>
					{profile.fullName} <br />{" "}
					<span className="text-muted-foreground">{profile.username}</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link href="/profile">
						<DropdownMenuItem>
							<SettingsIcon className="" />
							Edit Profile{" "}
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function LoginBtn() {
	const searchParams = new URLSearchParams();
	searchParams.append("opt", "login");
	return (
		<Link href={`/auth?${searchParams}`}>
			<Button type="button" className="text-base">
				Login
			</Button>
		</Link>
	);
}

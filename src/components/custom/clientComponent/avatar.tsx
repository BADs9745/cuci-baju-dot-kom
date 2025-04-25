"use client";

import { LogOut } from "@/lib/session";
import type { User } from "@prisma/client";
import { Button } from "../../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import Link from "next/link";
import {
	CircleUserRoundIcon,
	EyeIcon,
	LogOutIcon,
	SettingsIcon,
} from "lucide-react";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "../../ui/hover-card";

export default function AvatarProfile({ profile }: { profile?: User }) {
	return profile?.id ? <LoginAvatar profile={profile} /> : <LoginBtn />;
}

function LoginAvatar({ profile }: { profile: User }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="text-base">
					<CircleUserRoundIcon className="size-5" />
					<div className="truncate max-w-20">{profile.fullName.trim()}</div>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="max-w-30 **:truncate">
				<DropdownMenuLabel>
					{" "}
					<HoverCard>
						<HoverCardTrigger>
							<div>{profile.fullName.trim()}</div>
							<div>{profile.username.trim()}</div>
						</HoverCardTrigger>
						<HoverCardContent>
							<div>{profile.fullName.trim()}</div>
							<div>{profile.username.trim()}</div>
						</HoverCardContent>
					</HoverCard>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href={`/user/${profile.id}/settings`}>
							<SettingsIcon />
							Edit Profile
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link href={`/user/${profile.id}`}>
							<EyeIcon />
							View Profile
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild variant="destructive">
						<button
							type="button"
							className="w-full"
							onClick={async () => {
								await LogOut();
								globalThis.location.reload();
							}}
						>
							<LogOutIcon />
							Log Out
						</button>
					</DropdownMenuItem>
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

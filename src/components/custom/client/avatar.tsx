"use client";

import { type GetProfileByToken, LogOut } from "@/lib/session";
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
	PackageSearch,
	SettingsIcon,
} from "lucide-react";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "../../ui/hover-card";
import { Badge } from "@/components/ui/badge";

export default function AvatarProfile({
	profile,
}: { profile?: Awaited<ReturnType<typeof GetProfileByToken>> }) {
	return profile?.data?.id ? (
		<LoginAvatar profileData={profile} />
	) : (
		<LoginBtn />
	);
}

function LoginAvatar({
	profileData,
}: { profileData: Awaited<ReturnType<typeof GetProfileByToken>> }) {
	const profile = profileData.data;
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="text-base">
					<CircleUserRoundIcon className="size-5" />
					<div className="truncate max-w-20">{profile.fullName.trim()}</div>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="max-w-30 **:truncate z-100">
				<DropdownMenuLabel>
					{" "}
					<HoverCard>
						<HoverCardTrigger>
							<div className="font-bold">{profile.fullName.trim()}</div>
							<div className="text-muted-foreground truncate">
								{profile.username.trim()}@
								<Badge className="float-end">
									{profile.Role?.name ?? "User"}
								</Badge>
							</div>
						</HoverCardTrigger>
						<HoverCardContent className="z-100">
							<div className="font-bold">{profile.fullName.trim()}</div>
							<div className="text-muted-foreground">
								@{profile.username.trim()}
							</div>
						</HoverCardContent>
					</HoverCard>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href={`/user/${profile.id}/manage/settings`}>
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
					<DropdownMenuItem asChild>
						<Link href={`/user/${profile.id}/my-order`}>
							<PackageSearch />
							Order Cucian
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

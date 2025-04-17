"use client";

import { playwrite, varelaRound } from "@/font/font";
import clsx from "clsx";
import { CalendarDaysIcon, ChevronDownIcon } from "lucide-react";
import { AnimatePresence, motion as m } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "../ui/navigation-menu";
import AvatarProfile from "../custom/avatar";

export default function Navbar() {
	return (
		<nav className="py-10 flex justify-between items-center">
			<h1 className={`${playwrite.className} italic font-black text-4xl`}>
				Cuci Baju Dot Kom
			</h1>
			<NavigationList />
			<div className="flex gap-5">
				<DropdownMenu>
					<DropdownMenuTrigger asChild className="group">
						<Button className={`${varelaRound.className} text-base`}>
							Services
							<ChevronDownIcon
								className={
									"group-aria-expanded:rotate-z-180 duration-300 size-5 stroke-3"
								}
							/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="bg-popover text-center">
						<DropdownMenuLabel className="text-base font-semibold">
							Menu Reservasi
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup className="*:px-3">
							<DropdownMenuItem>Jadwal Pengambilan</DropdownMenuItem>
							<DropdownMenuItem>Cek Status</DropdownMenuItem>
							<DropdownMenuItem>Layanan Pengantaran</DropdownMenuItem>
							<DropdownMenuItem>Daftar Cucian</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
				<Button className={`${varelaRound.className} text-base`}>
					Reservasi <CalendarDaysIcon className="size-5 ms-2" />
				</Button>
				<AvatarProfile />
			</div>
		</nav>
	);
}

const navigationItem: [string, string][] = [
	["Home", "/"],
	["Tentang", "/tentang"],
	["Kontak", "/kontak"],
	["Syarat dan Ketentuan", "/syarat-dan-ketentuan"],
];

function NavigationList() {
	const pathname = usePathname();
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{navigationItem.map(([label, url]) => (
					<NavigationMenuItem key={url}>
						<Link href={url} passHref legacyBehavior>
							<NavigationMenuLink
								className={clsx(
									"text-xl font-bold",
									"hover:text-primary transition-colors duration-300",
								)}
							>
								<span>{label}</span>{" "}
								<AnimatePresence mode="popLayout">
									{url === pathname && (
										<m.div
											className="h-1 bg-primary rounded-3xl"
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											exit={{ scale: 0 }}
											transition={{ type: "spring", duration: 0.3 }}
										/>
									)}
								</AnimatePresence>
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}

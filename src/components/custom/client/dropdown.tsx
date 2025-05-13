"use client";
import {
	BikeIcon,
	CalendarCheckIcon,
	ChartBarIcon,
	ChevronDownIcon,
	WashingMachineIcon,
} from "lucide-react";
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
import { varelaRound } from "@/font/font";
import Link from "next/link";
export function NavbarDropDownMenu() {
	return (
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
					Pilihan Menu Service
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup className="*:px-3">
					<DropdownMenuItem>
						<CalendarCheckIcon />
						<span>Jadwal Pengambilan</span>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link href={"/cucian/list"}>
							<ChartBarIcon />
							<span>Cek Order Cucian</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<BikeIcon />
						<span>Layanan Pengantaran</span>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link href={"/cucian"}>
							<WashingMachineIcon />
							<span>Daftar Cucian</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

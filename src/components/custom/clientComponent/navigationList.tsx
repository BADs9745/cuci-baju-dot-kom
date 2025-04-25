"use client";

import clsx from "clsx";
import { AnimatePresence, motion as m } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "../../ui/navigation-menu";

const navigationItem: [string, string][] = [
	["Home", "/home"],
	["Tentang", "/tentang"],
	["Kontak", "/kontak"],
	["Syarat dan Ketentuan", "/syarat-dan-ketentuan"],
];

export function NavigationList() {
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

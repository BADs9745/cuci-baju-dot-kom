"use client";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function LinkBasedBreadcrumb() {
	const pathname = usePathname();
	const pathList = pathname.split("/").filter((path) => path !== "");
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{pathList.map((path, index, array) => (
					<Fragment key={path}>
						{index === array.length - 1 ? (
							<BreadcrumbItem>
								<BreadcrumbPage>
									{array.slice(-1)[0].toUpperCase()}
								</BreadcrumbPage>
							</BreadcrumbItem>
						) : (
							<>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink
										className="uppercase"
										href={`/${array.slice(0, index + 1).join("/")}`}
									>
										{path.toLocaleUpperCase()}
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
							</>
						)}
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

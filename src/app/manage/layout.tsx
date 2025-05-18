import { AppSidebar } from "@/components/app-sidebar";
import LinkBasedBreadcrumb from "@/components/custom/client/breadcumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { GetProfileByToken, isLogin } from "@/lib/session";
import type { User, UserRole } from "@/prisma";
import { redirect } from "next/navigation";

export default async function ManageLayout({
	children,
	modal,
}: { children: React.ReactNode; modal: React.ReactNode }) {
	const token = await isLogin();
	const getProfile = await GetProfileByToken(token.toString());
	if (getProfile.error) {
		console.log(getProfile.error);
		return <>Something Wrong</>;
	}
	const profile = getProfile.data as unknown as User & { Role: UserRole };
	const isAuthorize = profile.Role.authority_level > 0 || profile.Role.admin;
	if (!isAuthorize) redirect("/");

	return (
		<>
			{modal}
			<SidebarProvider>
				<AppSidebar profile={profile} />
				<SidebarInset>
					<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
						<div className="flex items-center gap-2 px-4">
							<SidebarTrigger className="-ml-1" />
							<Separator
								orientation="vertical"
								className="mr-2 data-[orientation=vertical]:h-4"
							/>
							<LinkBasedBreadcrumb />
						</div>
					</header>
					<h1 className="text-center text-4xl font-bold mb-10">
						Management Page
					</h1>
					<section className="flex flex-1 flex-col gap-4 p-12 pt-0 relative">
						{children}
					</section>
				</SidebarInset>
			</SidebarProvider>
		</>
	);
}

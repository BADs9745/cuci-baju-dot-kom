import { GetProfileById } from "@/lib/profile";
import { isLogin } from "@/lib/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AuthorizedUserLayout({
	children,
	params,
}: { children: React.ReactNode; params: { id: string } }) {
	const param = await params;
	const profile = await GetProfileById(param.id);
	const token = (await isLogin()) || "";
	const authUser = await prisma.user.findFirst({
		where: {
			Session: {
				some: {
					id: token,
				},
			},
		},
		select: {
			id: true,
		},
	});
	if (profile?.id !== authUser?.id) {
		redirect("./");
	}
	return <>{children}</>;
}

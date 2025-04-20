import { GetProfileById } from "@/lib/profile";
import ProfileSetttingForm from "./form";
import { isLogin } from "@/lib/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArrowLeftCircleIcon } from "lucide-react";
import Link from "next/link";

export default async function ProfileSettingPage({
	params,
}: { params: { id: string } }) {
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
	return (
		<>
			<nav className="p-10">
				<Link href="/">
					<ArrowLeftCircleIcon className="size-10" />
				</Link>
			</nav>
			<h1 className="text-center my-10 text-3xl font-bold">
				Pengaturan Akun Profil
			</h1>
			<ProfileSetttingForm profile={profile} />
		</>
	);
}

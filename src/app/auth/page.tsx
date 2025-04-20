import { playwrite } from "@/font/font";
import LoginForm from "../../components/counterpart/auth/loginForm";
import { isLogin } from "@/lib/session";
import { redirect, RedirectType } from "next/navigation";
export default async function AuthPage({
	searchParams,
}: { searchParams: Promise<{ opt: string }> }) {
	const option = (await searchParams).opt;
	const islogin = await isLogin();
	if (islogin) {
		redirect("/", RedirectType.replace);
	}
	return (
		<div className="p-30 flex flex-col items-center">
			<h1
				className={`${playwrite.className} text-center text-5xl font-bold italic`}
			>
				Cuci Baju Dot Kom
			</h1>
			<div className="mx-50 w-200">
				<LoginForm className="mt-20 w-full" opt={option} />
			</div>
		</div>
	);
}

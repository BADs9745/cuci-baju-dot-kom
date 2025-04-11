import { playwrite } from "@/font/font";
import LoginForm from "../../components/counterpart/auth/loginForm";

export default function AuthPage() {
	return (
		<div className="p-30 flex flex-col items-center">
			<h1
				className={`${playwrite.className} text-center text-5xl font-bold italic`}
			>
				Cuci Baju Dot Kom
			</h1>
			<div className="mx-50 w-200">
				<LoginForm className="mt-20 w-full" />
			</div>
		</div>
	);
}

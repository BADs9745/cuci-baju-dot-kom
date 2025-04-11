import { isLogin } from "@/lib/session";

export default async function TestPage() {
	return (
		<>
			Test Page <br />
			{(await isLogin()) ? await isLogin() : "Not Login"}
		</>
	);
}

import { GetProfile, isLogin } from "@/lib/session";
import type { User } from "@prisma/client";

export default async function TestPage() {
	const login_token = await isLogin();
	const profile = (await GetProfile(login_token as string)) as User;
	return (
		<>
			Test Page <br />
			<div>{profile.fullName}</div>
			<div>{login_token}</div>
		</>
	);
}

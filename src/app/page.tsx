import AaaadminPage from "@/components/counterpart/rootPageSection/adminPage";
import { GetProfileByToken, isLogin } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function HomePage() {
	const login = await isLogin();
	if (!login) {
		redirect("/home");
	}
	const profile = await GetProfileByToken(login);
	if (profile.data?.Role?.admin) {
		return <AaaadminPage profile={profile} />;
	}
	return (
		<>
			{profile.data?.Role.authority_level < 1 && (
				<>
					<h1>Anda User</h1>
					<p>Bababoi</p>
				</>
			)}
		</>
	);
}

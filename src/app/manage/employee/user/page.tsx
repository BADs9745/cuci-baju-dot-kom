import { GetAllProfile, GetAllRoles } from "@/lib/profile";
import { ProfileCard } from "./profile-card";
import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import { GetProfileByToken } from "@/lib/session";

const cacheProfile = unstable_cache(GetAllProfile);
const cacheRole = unstable_cache(GetAllRoles);
export default async function ManageUsersPage() {
	const profiles = await cacheProfile();
	const availableRoles = await cacheRole();
	const login_token = (await cookies()).get("token")?.value;
	const login_profile = await GetProfileByToken(login_token ?? "");
	return (
		<>
			<h1 className="text-3xl font-bold">Employees Management</h1>
			<p className="text-muted-foreground">
				Manage the staff and the employees if the laundry
			</p>
			<section className="space-y-5">
				<div className="">sada</div>
				<div className="flex gap-5 flex-wrap">
					{profiles?.data?.map((el) => {
						return (
							<ProfileCard
								key={el.id}
								{...el}
								availableRoles={availableRoles}
								logInUser={login_profile.data.id}
							/>
						);
					})}
				</div>
			</section>
		</>
	);
}

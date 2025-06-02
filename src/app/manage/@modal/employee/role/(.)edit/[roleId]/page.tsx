import { GetRoleById } from "@/lib/profile";
import EditRoleDialog from "./dialog";

export default async function EditRolePage({
	params,
}: { params: Promise<{ roleId: string }> }) {
	const roleData = await GetRoleById((await params).roleId);
	return <EditRoleDialog initialState={roleData} />;
}

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GetAllProfile, GetAllRoles } from "@/lib/profile";
import { FileUser, User, UserCog } from "lucide-react";
import { unstable_cache } from "next/cache";
import Link from "next/link";

const getUsers = unstable_cache(GetAllProfile);
const getRoles = unstable_cache(GetAllRoles);

export default async function ManageEmployeePage() {
	const users = await getUsers();
	const roles = await getRoles();
	return (
		<>
			<div>
				<h1 className="text-3xl font-bold">Employees Management</h1>
				<p className="text-muted-foreground">
					Manage the staff and the employees in the laundry
				</p>
			</div>
			<div className="grid gap-4 grid-cols-1 md:grid-cols-3">
				<Optioncard>
					<div>
						<h2 className="text-2xl font-bold">Total Users</h2>
						<p className="text-5xl font-semibold flex items-center">
							<User className="inline size-12" />
							<span className="ms-3">{users.data.length}</span>
						</p>
					</div>
					<Separator />
					<div className="font-semibold grid grid-flow-col justify-around items-center-safe">
						<span className="text-destructive text-xl mx-1">
							{users.data.filter((e) => e.Role?.admin).length} Admins
						</span>
						<Separator orientation="vertical" />
						<span className="text-yellow-700 dark:text-yellow-300 text-xl mx-1">
							{users.data.filter((e) => e.Role?.authority_level &&0 > 0).length}{" "}
							Employees
						</span>
						<Separator orientation="vertical" />
						<span className="text-green-700 dark:text-green-300 text-xl mx-1">
							{users.data.filter((e) => e.Role?.authority_level && 0< 1).length}{" "}
							Users
						</span>
					</div>
					<Separator />
					<Button
						variant={"outline"}
						className="text-xl flex items-center mt-5 float-end w-full p-6"
						asChild
					>
						<Link href={"/manage/employee/user"}>
							Manage <UserCog className="size-6 bottom-0" />
						</Link>
					</Button>
				</Optioncard>
				<Optioncard>
					<div>
						<h2 className="text-2xl font-bold">Roles</h2>
						<p className="text-5xl font-semibold flex items-center-safe">
							<FileUser className="size-12" />
							<span className="ms-3">{roles.length} </span>
						</p>
					</div>
					<Separator />
					<div className="font-semibold grid grid-flow-col justify-around items-center-safe">
						<span className="text-destructive text-xl mx-1">
							{roles.length} Available
						</span>
						<Separator orientation="vertical" />
						<span className="text-green-700 dark:text-green-300 text-xl mx-1">
							{roles.filter((e) => e.authority_level > 0 || e.admin).length}{" "}
							Employee&apos;s role
						</span>
					</div>
					<Separator />
					<Button
						variant={"outline"}
						className="text-xl flex items-center mt-5 float-end w-full p-6"
						asChild
					>
						<Link href={"/manage/employee/role"}>
							Manage <FileUser className="size-6 bottom-0" />
						</Link>
					</Button>
				</Optioncard>
			</div>
		</>
	);
}

function Optioncard({
	className,
	...prop
}: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div
			{...prop}
			className={`relative aspect-video bg-secondary rounded-2xl border-border border-2 p-5 space-y-2 ${className}`}
		/>
	);
}

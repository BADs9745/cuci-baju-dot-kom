"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import {
	type GetAllRoles,
	type GetAllProfile,
	EditChangeUserRole,
} from "@/lib/profile";
import type { UserRole } from "@/prisma";
import { SwitchCamera } from "lucide-react";
function ProfileCard({
	availableRoles,
	...prop
}: Awaited<ReturnType<typeof GetAllProfile>>["data"][number] & {
	availableRoles?: UserRole[];
}) {
	return (
		<Card className="w-100 relative">
			<Badge
				className={`absolute right-2 top-2 text-sm font-bold capitalize ${
					prop.Role.name === "admin" ? "bg-red-800" : "bg-green-800"
				}`}
			>
				{prop.Role.name}
			</Badge>
			<CardHeader>
				<CardTitle
					className={"capitalize text-xl font-bold text-center truncate"}
				>
					@{prop.username}
				</CardTitle>
				<CardDescription className="text-center uppercase">
					{prop.id}
				</CardDescription>
				<Separator />
			</CardHeader>
			<CardContent className="grid grid-cols-2">
				<p>Nama Lengkap : </p>
				<p className="text-end">{prop.fullName}</p>
				<p>Email : </p>
				<p className="text-end">{prop.email}</p>
				<p>Tanggal Dibuat : </p>
				<p className="text-end">{new Date(prop.createdAt).toDateString()}</p>
				<p>Alamat : </p>
				<p className="text-end h-15">{prop.alamat || "-"}</p>
			</CardContent>
			<CardFooter>
				<Drawer>
					<DrawerTrigger asChild>
						<Button variant={"outline"} className="w-full">
							Ganti Role <SwitchCamera />
						</Button>
					</DrawerTrigger>
					<DrawerContent className="mb-10">
						<div className="w-full mx-auto max-w-xl">
							<DrawerHeader>
								<DrawerTitle className="text-center font-bold text-3xl">
									Change the @<u>{prop.username}</u>&apos;s Role
								</DrawerTitle>
								<DrawerDescription className="text-center  text-lg">
									Select the role for this user
								</DrawerDescription>
							</DrawerHeader>
						</div>
						<div className="flex gap-5 justify-center mx-auto max-w-7xl flex-wrap">
							{availableRoles?.map((role) => {
								return (
									<Button
										key={role.id}
										variant={"outline"}
										className="w-fit h-fit p-0 rounded-lg"
										onClick={async () => {
											await EditChangeUserRole(prop.id, role.id);
										}}
									>
										<RoleCard {...role} userRoleId={prop.Role.id} />
									</Button>
								);
							})}
						</div>
					</DrawerContent>
				</Drawer>
			</CardFooter>
		</Card>
	);
}
function RoleCard({
	userRoleId,
	...role
}: Awaited<ReturnType<typeof GetAllRoles>>[number] & { userRoleId: string }) {
	return (
		<Card
			className={`w-70 rounded-lg hover:bg-muted duration-300 ${role.id === userRoleId && "border-3 border-primary"}`}
		>
			<CardContent className="space-y-2">
				<CardTitle className="text-2xl capitalize font-bold">
					{role.name}
				</CardTitle>
				<Separator />
				<CardDescription>
					Authority Level : {role.admin ? "Admin" : role.authority_level}
				</CardDescription>
			</CardContent>
		</Card>
	);
}

export { ProfileCard };

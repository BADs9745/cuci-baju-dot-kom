import { GetAllRoles } from "@/lib/profile";
import { DataTable } from "./data-table";
import { roleColumn } from "./column";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { AddForm } from "./form";

export default async function RoleManagementPage() {
	const roles = await GetAllRoles();

	return (
		<>
			<div>
				<h1 className="text-3xl font-bold">Role management</h1>
				<p className="text-muted-foreground">Manage the roles in the laundry</p>
			</div>
			<Dialog>
				<DialogTrigger asChild>
					<Button>
						Add New Role <Plus />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="text-2xl text-center font-bold">
							Add New Role
						</DialogTitle>
						<DialogDescription className="text-center">
							Add a new role for the employees to the laundry
						</DialogDescription>
					</DialogHeader>
					<AddForm />
				</DialogContent>
			</Dialog>
			<div className="container mx-auto py-10">
				<DataTable data={roles} column={roleColumn} />
			</div>
		</>
	);
}

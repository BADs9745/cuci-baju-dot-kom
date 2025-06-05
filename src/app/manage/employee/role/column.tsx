"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { DeleteRoleById, type GetAllRoles } from "@/lib/profile";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type RoleColumn = Awaited<ReturnType<typeof GetAllRoles>>[number];

const roleColumn: ColumnDef<RoleColumn>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "authority_level",
		header: ({ column }) => (
			<Button
				variant={"ghost"}
				onClick={() => {
					column.toggleSorting(column.getIsSorted() === "asc");
				}}
			>
				Authority Level <ArrowUpDown />
			</Button>
		),
	},
	{
		accessorKey: "admin",
		header: "Admin",
	},
	{
		accessorKey: "actions",
		header: () => <h1 className="text-center">Action</h1>,
		cell: ({ row }) => (
			<div className="flex gap-2 justify-center-safe">
				<Button variant={"secondary"}>
					<Link href={`/manage/employee/role/edit/${row.original.id}`}>
						Edit
					</Link>
				</Button>
				<Dialog>
					<DialogTrigger asChild>
						<Button>Delete</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Are you sure ?</DialogTitle>
							<DialogDescription>
								Are you sure you want to delete this role?
							</DialogDescription>
						</DialogHeader>
						<div className="flex justify-end gap-2">
							<DialogClose asChild>
								<Button variant={"secondary"}>Cancel</Button>
							</DialogClose>
							<Button
								variant={"destructive"}
								onClick={async () => {
									const res = await DeleteRoleById(row.original.id);
									if (res.success) {
										toast.success(res.message);
									} else {
										toast.error(res.message);
									}
								}}
							>
								Delete
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		),
	},
];

export { roleColumn, type RoleColumn };

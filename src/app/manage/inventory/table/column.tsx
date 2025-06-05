"use client";

import { Button } from "@/components/ui/button";
import { DeleteItemById, type GetAllInventory } from "@/lib/inventory";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { toast } from "sonner";

type ColumnTypes = Awaited<ReturnType<typeof GetAllInventory>>[number];

export const InventoryColumn: ColumnDef<ColumnTypes>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{ accessorKey: "desc", header: "Description" },
	{
		accessorKey: "qty",
		header: ({ column }) => (
			<Button
				variant={"ghost"}
				onClick={() => {
					column.toggleSorting(column.getIsSorted() === "asc");
				}}
			>
				Quantity <ArrowUpDown />
			</Button>
		),
	},
	{
		accessorKey: "action",
		header: () => <p className="text-center">Action</p>,
		cell: ({ row }) => (
			<div className="flex gap-5 justify-center">
				<Button variant={"secondary"}>Edit</Button>
				<Button
					variant={"destructive"}
					onClick={async () => {
						const res = await DeleteItemById(row.original.id);
						if (res) {
							toast.success(`Berhasil Menghapus Item : ${res}`);
						} else {
							toast.error("Gagal Mengapus");
						}
					}}
				>
					Delete
				</Button>
			</div>
		),
	},
];

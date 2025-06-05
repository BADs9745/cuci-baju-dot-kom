"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { GetOwnOrder } from "@/lib/profile";
import type { ColumnDef } from "@tanstack/react-table";
import { Filter, PackageSearch } from "lucide-react";

type OwnOrderList = Awaited<ReturnType<typeof GetOwnOrder>>["data"][number];

export const ownOrderColumn: ColumnDef<OwnOrderList>[] = [
	{
		accessorKey: "id",
		header: "Id Pesanan",
	},
	{
		accessorKey: "status",
		header: ({ column, table }) => {
			// Get unique values from the status column
			const statusOptions = Array.from(
				new Set(
					table
						.getPreFilteredRowModel()
						.flatRows.map((row) => row.getValue("status")),
				),
			);

			// Only show filter if we have data
			if (!(statusOptions.length > 0)) {
				return <div>Status</div>;
			}

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">
							Status <Filter className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						{statusOptions.map((status) => (
							<DropdownMenuCheckboxItem
								key={status as string}
								checked={column.getFilterValue() === status}
								onCheckedChange={() =>
									column.setFilterValue(
										column.getFilterValue() === status ? null : status,
									)
								}
							>
								{status as string}
							</DropdownMenuCheckboxItem>
						))}
						{column.getFilterValue() ? (
							<>
								<DropdownMenuSeparator />
								<DropdownMenuCheckboxItem
									checked={false}
									onCheckedChange={() => column.setFilterValue(null)}
								>
									Clear filter
								</DropdownMenuCheckboxItem>
							</>
						) : null}
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
	{
		accessorFn: (e) => e.Paket.id,
		accessorKey: "Paket",
		header: ({ column, table }) => {
			const pakets = table
				.getPreFilteredRowModel()
				.rows.map((e) => e.original.Paket);
			const paketOptions = Array.from(
				new Set(
					table.getPreFilteredRowModel().rows.map((e) => e.original.Paket.id),
				),
			);
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant={"outline"}>
							Paket <PackageSearch />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						{paketOptions.map((e) => (
							<DropdownMenuCheckboxItem
								key={e[0]}
								checked={column.getFilterValue() === e}
								onCheckedChange={() => {
									column.setFilterValue(e);
								}}
							>
								{pakets.find((name) => name.id === e)?.name}
							</DropdownMenuCheckboxItem>
						))}
						{column.getFilterValue() ? (
							<>
								<DropdownMenuSeparator />
								<DropdownMenuCheckboxItem
									checked={false}
									onCheckedChange={() => {
										column.setFilterValue(null);
									}}
								>
									Clear Filter
								</DropdownMenuCheckboxItem>
							</>
						) : null}
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
		cell: ({ cell }) => cell.row.original.Paket.name,
	},
	{
		accessorKey: "tahap",
		header: "Tahap Proccess",
	},
	{
		accessorKey: "hargaTetap",
		header: "Harga",
		cell: ({ row }) => (
			<>
				{row.original.hargaTetap?.toLocaleString("id-ID", {
					style: "currency",
					currency: "IDR",
				}) ?? <Badge>Belum Dikonfirmasi</Badge>}
			</>
		),
	},
];

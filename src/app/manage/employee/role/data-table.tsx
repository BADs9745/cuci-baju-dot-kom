"use client";
import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type PaginationState,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

type DataTableProps<TData, TValue> = {
	column: ColumnDef<TData, TValue>[];
	data: TData[];
};

export function DataTable<TData, TValue>({
	column,
	data,
}: DataTableProps<TData, TValue>) {
	const [sort, setSort] = useState<SortingState>([]);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 20,
	});
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const table = useReactTable({
		data,
		columns: column,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSort,
		getSortedRowModel: getSortedRowModel(),
		onPaginationChange: setPagination,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnFiltersChange: setColumnFilters,
		state: {
			sorting: sort,
			pagination,
			columnFilters,
		},
	});
	return (
		<>
			<div className="rounded-lg border border-border p-2">
				<div className="flex items-center gap-3 p-2">
					<Search className="size-7" />
					<Input
						placeholder="Search..."
						value={(table.getColumn("name")?.getFilterValue() as string) || ""}
						onChange={(event) =>
							table.getColumn("name")?.setFilterValue(event.target.value)
						}
					/>
				</div>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											colSpan={header.colSpan}
											className="**:text-xl **:font-bold text-xl font-bold p-2"
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={column.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center-safe justify-center-safe gap-5 my-10">
				{table.getCanPreviousPage() && (
					<Button
						onClick={() => {
							table.previousPage();
						}}
					>
						<ChevronLeft />
						Previous
					</Button>
				)}
				{pagination.pageIndex + 1}
				{table.getCanNextPage() && (
					<Button
						onClick={() => {
							table.nextPage();
						}}
					>
						Next <ChevronRight />
					</Button>
				)}
			</div>
		</>
	);
}

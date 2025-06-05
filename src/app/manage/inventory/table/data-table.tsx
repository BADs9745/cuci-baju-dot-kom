"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
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
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";

type TableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
};

export function InventoryDataTable<TD, TV>({
	data,
	columns,
}: TableProps<TD, TV>) {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 20,
	});
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		state: {
			pagination,
			columnFilters,
			sorting,
		},
	});
	return (
		<div className="mt-10">
			<div className="flex items-center my-5 gap-5">
				<Search />
				<Input
					placeholder="Search..."
					onChange={(e) => {
						table.getColumn("name")?.setFilterValue(e.target.value);
					}}
				/>
			</div>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowCount() ? (
						table.getRowModel().rows.map((rows) => (
							<TableRow key={rows.id}>
								{rows.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="text-center font-bold text-3xl"
							>
								Tidak Ditemukannya Item
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<div className="w-fit grid grid-cols-3 mt-5 mx-auto items-center">
				<div>
					{table.getCanPreviousPage() && (
						<Button
							onClick={() => {
								table.previousPage();
							}}
						>
							Previous <ChevronLeft />
						</Button>
					)}
				</div>
				<p className="text-center">{pagination.pageIndex + 1}</p>
				<div>
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
			</div>
		</div>
	);
}

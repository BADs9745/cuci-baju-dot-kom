"use client";

import { Button } from "@/components/ui/button";
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
	type PaginationState,
	useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type TableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
};

export function OwnOrderTable<TData, TValue>({
	columns,
	data,
}: TableProps<TData, TValue>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 20,
	});
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		onPaginationChange: setPagination,
		state: {
			columnFilters,
			pagination,
		},
	});
	return (
		<>
			<div className="p-10">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((e) => (
							<TableRow key={e.id}>
								{e.headers.map((e) => (
									<TableHead key={e.id}>
										{e.isPlaceholder
											? null
											: flexRender(e.column.columnDef.header, e.getContext())}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.length > 0 ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((col) => (
										<TableCell key={col.id}>
											{flexRender(col.column.columnDef.cell, col.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length}>Tidak Pesanan</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="mx-auto w-fit grid grid-cols-3 justify-items-center justify-center items-center gap-10">
				<div>
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
				</div>
				<span>{pagination.pageIndex + 1}</span>
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
		</>
	);
}

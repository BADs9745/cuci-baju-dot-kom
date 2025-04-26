import SearchInput from "@/components/custom/serverComponent/search-input";
import { Separator } from "@/components/ui/separator";
import {
	Table,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { $Enums } from "@/prisma";
import TableOrderCucianBody from "./table-data";
import { Suspense } from "react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { GetAllCountCucianOrder, GetAllCucianOrder } from "@/lib/cucian";

export default async function ListOrderCucianPage({
	searchParams,
}: {
	searchParams: Promise<{
		find: string;
		status?: $Enums.StatusOrder;
		page: number;
	}>;
}) {
	const find = (await searchParams).find;
	const status = (await searchParams).status;
	const page = Number((await searchParams).page) ?? 1;
	const pagination = Number.isNaN(page) ? 1 : page;
	const searchParamPagination = new URLSearchParams();

	if (status) searchParamPagination.append("status", `${status}`);
	if (find) searchParamPagination.append("find", `${find}`);

	const listCucianOrder = await GetAllCucianOrder(find, status, page);
	const isLastPage = listCucianOrder.length <= 10;
	const countAllOrder = await GetAllCountCucianOrder(find, status);
	const lastPagination = Math.ceil(countAllOrder / 10);
	return (
		<>
			<div className="my-20 mx-50">
				<h1 className="text-4xl font-bold">List Pesanan Cucian</h1>
				<Separator className="mt-10" />
			</div>
			<div className="mx-50 mb-20">
				<div className="my-10 flex gap-5">
					<SearchInput search={find} status={status} />
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Id Pesanan Cucian</TableHead>
							<TableHead>Nama Lengkap Pelanggan</TableHead>
							<TableHead>Status Pesanan</TableHead>
							<TableHead>Paket Cucian</TableHead>
							<TableHead>Layanan Tambahan</TableHead>
							<TableHead>Waktu Pesanan Dibuat</TableHead>
						</TableRow>
					</TableHeader>
					<Suspense
						fallback={
							<TableCaption>Memuat Data Pesanan Cucian ...</TableCaption>
						}
					>
						<TableOrderCucianBody
							listCucianOrder={listCucianOrder}
							isLastPage={isLastPage}
						/>
					</Suspense>
				</Table>
				<Pagination>
					<PaginationContent>
						{pagination > 1 && (
							<>
								<PaginationItem>
									<PaginationPrevious
										href={`/cucian/list?page=${pagination - 1}&${searchParamPagination}`}
									/>
								</PaginationItem>
								{pagination > 2 && (
									<>
										<PaginationItem>
											<PaginationLink
												href={`/cucian/list?page=${1}&${searchParamPagination}`}
											>
												{1}
											</PaginationLink>
										</PaginationItem>
										{pagination === 3 || (
											<PaginationItem>
												<PaginationEllipsis />
											</PaginationItem>
										)}
									</>
								)}
								<PaginationItem>
									<PaginationLink
										href={`/cucian/list?page=${pagination - 1}&${searchParamPagination}`}
									>
										{pagination - 1}
									</PaginationLink>
								</PaginationItem>
							</>
						)}

						<PaginationItem>
							<PaginationLink
								href={`/cucian/list?page=${pagination}&${searchParamPagination}`}
								isActive
							>
								{pagination}
							</PaginationLink>
						</PaginationItem>

						{pagination < lastPagination && (
							<>
								<PaginationItem>
									<PaginationLink
										href={`/cucian/list?page=${pagination + 1}&${searchParamPagination}`}
									>
										{pagination + 1}
									</PaginationLink>
								</PaginationItem>
								{pagination < lastPagination - 1 && (
									<>
										{pagination === lastPagination - 2 || (
											<PaginationItem>
												<PaginationEllipsis />
											</PaginationItem>
										)}
										<PaginationItem>
											<PaginationLink
												href={`/cucian/list?page=${lastPagination}&${searchParamPagination}`}
											>
												{lastPagination}
											</PaginationLink>
										</PaginationItem>
									</>
								)}
								<PaginationItem>
									<PaginationNext
										href={`/cucian/list?page=${pagination + 1}&${searchParamPagination}`}
									/>
								</PaginationItem>
							</>
						)}
					</PaginationContent>
				</Pagination>
			</div>
		</>
	);
}

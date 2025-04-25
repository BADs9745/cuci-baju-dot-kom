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

export default async function ListOrderCucianPage({
	searchParams,
}: { searchParams: Promise<{ find: string; status?: $Enums.StatusOrder }> }) {
	const param = (await searchParams).find;
	const paramStatus = (await searchParams).status;

	return (
		<>
			<div className="my-20 mx-50">
				<h1 className="text-4xl font-bold">List Pesanan Cucian</h1>
				<Separator className="mt-10" />
			</div>
			<div className="mx-50 mb-20">
				<div className="my-10 flex gap-5">
					<SearchInput search={param} status={paramStatus} />
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
					<Suspense fallback={<TableCaption>Loading ...</TableCaption>}>
						<TableOrderCucianBody search={param} status={paramStatus} />
					</Suspense>
				</Table>
			</div>
		</>
	);
}

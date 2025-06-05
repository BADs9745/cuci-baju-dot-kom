import UserWithAccountHoverCard from "@/components/custom/server/userWithAccountHoverDiablog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import {
	TableBody,
	TableCaption,
	TableCell,
	TableRow,
} from "@/components/ui/table";
import type { GetAllCucianOrder } from "@/lib/cucian";
export default async function TableOrderCucianBody({
	listCucianOrder,
	isLastPage = false,
}: {
	listCucianOrder: Awaited<ReturnType<typeof GetAllCucianOrder>>;
	isLastPage?: boolean;
}) {
	const showList = listCucianOrder.slice(0, isLastPage ? undefined : -1);
	return (
		<>
			<TableBody>
				{listCucianOrder.length > 0 &&
					showList.map((data) => (
						<TableRow key={data.id} className={data.User?.id && "bg-secondary"}>
							<TableCell>{data.id}</TableCell>
							<TableCell>
								{data.User ? (
									<UserWithAccountHoverCard profile={data.User} />
								) : (
									data.nama
								)}
							</TableCell>
							<TableCell className="font-black">{data.status}</TableCell>
							<TableCell>
								<HoverCard>
									<HoverCardTrigger>
										<Button variant={"link"}>{data.Paket.name}</Button>
									</HoverCardTrigger>
									<HoverCardContent side="right">
										<h1 className="font-semibold">{data.Paket.name}</h1>
										<div>
											Harga per Kilo{" "}
											<p className="text-chart-3 font-bold">
												Rp {data.Paket.pricePerUnit}
											</p>
										</div>
									</HoverCardContent>
								</HoverCard>
							</TableCell>
							<TableCell className="space-x-1">
								{data.Service.length > 0 ? (
									data.Service.map((e) => <Badge key={e.id}>{e.name}</Badge>)
								) : (
									<Badge variant={"secondary"}>Tidak Ada</Badge>
								)}
							</TableCell>
							<TableCell>
								<div className="grid grid-flow-col w-fit gap-3">
									<span>{data.createAt.toLocaleDateString()}</span>
									<Separator orientation="vertical" />
									<span>
										{data.createAt.getUTCHours()}:
										{data.createAt.getUTCMinutes()}:
										{data.createAt.getUTCSeconds()}
									</span>
								</div>
							</TableCell>
							<TableCell>
								{data.hargaTetap !== null ? (
									data.hargaTetap.toNumber().toLocaleString("id-ID", {
										style: "currency",
										currency: "IDR",
									})
								) : (
									<Badge>Belum Di Konfirmasi</Badge>
								)}
							</TableCell>
						</TableRow>
					))}
			</TableBody>
			<TableCaption>
				{listCucianOrder.length > 0
					? "List Pesanan Cucian"
					: "Tidak Ditemukan Pesanan Cucian"}
			</TableCaption>
		</>
	);
}

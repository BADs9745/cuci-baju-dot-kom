import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GetOrderById } from "@/lib/cucian";
import { iconStatus } from "@/lib/manage-icon-pack";
import { Check, User2, UserCheck2 } from "lucide-react";
import PaymentAction from "./action";

export default async function ProcessedOrderPage({
	params,
}: { params: Promise<{ orderId: string }> }) {
	const orderId = (await params).orderId;
	const order = await GetOrderById(orderId);
	const serviceTotalPerUnit =
		order.Service?.reduce((a, c) => a + c.pricePerUnit, 0) ?? 0;
	const totalPrice = serviceTotalPerUnit + (order.Paket?.pricePerUnit ?? 0);
	return (
		<>
			<h1 className="text-3xl font-bold tracking-tight flex items-center gap-2 uppercase">
				Order : {order.id}
				<Badge variant={"secondary"} className="ml-2 flex items-center gap-1">
					{order.status && iconStatus[order.status]}
					{order.status}
				</Badge>
			</h1>
			<p className="text-zinc-500 dark:text-zinc-400">
				Process dan Update Pesanan Cucian
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Customer Information */}
				<Card>
					<CardHeader>
						<CardTitle className="*:float-end">
							Customer Information
							{order.User ? (
								<Badge>
									<UserCheck2 /> Registered
								</Badge>
							) : (
								<Badge variant={"secondary"}>
									<User2 /> Guest
								</Badge>
							)}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<div className="grid grid-cols-2 gap-1">
								<div className="text-sm font-medium">
									Name Lengkap Pelanggan:
								</div>
								<div>{order.User ? order.User.fullName : order.nama}</div>
							</div>
							{order.User?.email && (
								<div className="grid grid-cols-2 gap-1">
									<div className="text-sm font-medium">Email:</div>
									<div>{order.User?.email}</div>
								</div>
							)}
							<div className="grid grid-cols-2 gap-1">
								<div className="text-sm font-medium">Nomor Hp :</div>
								<div>{order.User ? order.User.phone : order.phone}</div>
							</div>
							<div className="grid grid-cols-2 gap-1">
								<div className="text-sm font-medium">Alamat : </div>
								<div>{order.User ? order.User.alamat : order.alamat}</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Order Details */}
				<Card>
					<CardHeader>
						<CardTitle>Order Details</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<div className="grid grid-cols-2 gap-1">
								<div className="text-sm font-medium">Created:</div>
								<div>{order.createAt?.toDateString()}</div>
							</div>
							<div className="grid grid-cols-2 gap-1">
								<div className="text-sm font-medium">Last Updated:</div>
								<div>
									{order.selesaiAt?.toDateString() ?? (
										<span className="text-destructive">Belum Selesai</span>
									)}
								</div>
							</div>
							<div className="grid grid-cols-2 gap-1">
								<div className="text-sm font-medium">Tahap Cucian:</div>
								<div>{order.tahap}</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Proccess Menu</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex gap-2">
						<Card className="flex-2/3">
							<CardHeader>
								<CardTitle>Paket Cucian</CardTitle>
								<CardDescription>
									Paket yang dipilih oleh customer
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 [&_h3]:font-bold [&_h3]:text-lg gap-3">
									<h3>Id Paket</h3>
									<p>: {order.Paket.id}</p>
									<Separator className="col-span-2" />
									<h3>Nama Paket</h3>
									<p>: {order.Paket.name}</p>
									<Separator className="col-span-2" />
									<h3>Harga Per Kilo</h3>
									<p>
										:{" "}
										{order.Paket.pricePerUnit?.toLocaleString("id-ID", {
											style: "currency",
											currency: "IDR",
										})}{" "}
										/ kg
									</p>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Service Tambahan</CardTitle>
								<CardDescription>
									Paket yang dipilih oleh customer
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 [&_h3]:font-bold [&_h3]:text-lg gap-3">
									<h3>Service Tambahan</h3>
									<div>
										:{" "}
										{order.Service?.length ? (
											order.Service?.map((e) => (
												<Badge key={e.id} className="mr-1">
													{e.name}
												</Badge>
											))
										) : (
											<span className="text-muted-foreground">
												Tidak Ada Service Tambahan
											</span>
										)}
									</div>
									<h3>Harga Service Tambahan</h3>
									<p>
										:{" "}
										{order.Service?.length ? (
											`${order.Service?.reduce(
												(a, b) => a + b.pricePerUnit,
												0,
											).toLocaleString("id-ID", {
												style: "currency",
												currency: "IDR",
											})} / kg`
										) : (
											<span className="text-muted-foreground">Tidak Ada</span>
										)}
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
					<Card>
						<CardHeader>
							<CardTitle>Pembayaran</CardTitle>
							<CardDescription>
								Harga yang harus dibayar oleh customer dari perhitungan berat
								pakaian
							</CardDescription>
						</CardHeader>
						<CardContent>
							{order.status === "PENDING" ? (
								<PaymentAction
									totalPerUnit={totalPrice}
									orderId={order.id ?? ""}
								/>
							) : (
								<>
									<h3 className="text-3xl font-bold flex items-center gap-5">
										<span>Terkonfirmasi </span>
										<Check className="size-10 stroke-3" />
									</h3>
									<div className="flex mt-10 float-end gap-5">
										<span className="text-3xl font-semibold">
											Harga yang harus dibayar :{" "}
										</span>
										<span className="text-3xl font-bold">
											{order.hargaTetap?.toNumber().toLocaleString("id-ID", {
												style: "currency",
												currency: "IDR",
											})}
										</span>
									</div>
								</>
							)}
						</CardContent>
					</Card>
				</CardContent>
			</Card>
		</>
	);
}

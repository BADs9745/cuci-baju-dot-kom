import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetOrderById } from "@/lib/cucian";
import { iconStatus } from "@/lib/manage-icon-pack";
import { User2, UserCheck2 } from "lucide-react";

export default async function ProcessedOrderPage({
	params,
}: { params: Promise<{ orderId: string }> }) {
	const orderId = (await params).orderId;
	const order = await GetOrderById(orderId);
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
		</>
	);
}

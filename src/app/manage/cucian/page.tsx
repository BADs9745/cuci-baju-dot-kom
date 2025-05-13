import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Package,
	ShoppingBag,
	Users,
	ArrowRight,
	Settings2,
} from "lucide-react";
import { GetAllCucianOrder, GetAllService, GetPaketList } from "@/lib/cucian";
import AddServiceDialog from "@/components/counterpart/manage/cucian/servis/add-dialog";

export default async function CucianMangementDashboard() {
	const getService = await GetAllService();
	const getPaketList = await GetPaketList();
	const getOrders = await GetAllCucianOrder();
	return (
		<div className="container mx-auto py-10">
			<div className="flex flex-col gap-6">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Cucian Management
					</h1>
					<p className="text-zinc-500 dark:text-zinc-400">
						Welcome to the Cuci Baju Laundry Cucian Management Dashboard.
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium">Services</CardTitle>
							<Settings2 className="size-4 text-zinc-500 dark:text-zinc-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{getService.length}</div>
							<p className="text-xs text-zinc-500 dark:text-zinc-400">
								Servis yang tersedia
							</p>
							<div className="mt-4">
								<Link href="/manage/cucian/services">
									<Button variant="outline" size="sm" className="w-full">
										Manage Services
										<ArrowRight className="ml-2 size-4" />
									</Button>
								</Link>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium">Orders</CardTitle>
							<ShoppingBag className="size-4 text-zinc-500 dark:text-zinc-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{getOrders.length}</div>
							<p className="text-xs text-zinc-500 dark:text-zinc-400">
								{getOrders.filter((e) => e.status === "PENDING").length}{" "}
								pending,{" "}
								{getOrders.filter((e) => e.status === "IN_PROGRESS").length}{" "}
								processing,{" "}
								{getOrders.filter((e) => e.status === "COMPLETED").length}{" "}
								completed
							</p>
							<div className="mt-4">
								<Link href="/manage/cucian/orders">
									<Button variant="outline" size="sm" className="w-full">
										View Orders
										<ArrowRight className="ml-2 size-4" />
									</Button>
								</Link>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium">
								Paket Cucian
							</CardTitle>
							<Package className="size-4 text-zinc-500 dark:text-zinc-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{getPaketList.length}</div>
							<p className="text-xs text-zinc-500 dark:text-zinc-400">
								Paket yang aktif
							</p>
							<div className="mt-4">
								<Link href="/manage/cucian/paket">
									<Button variant="outline" size="sm" className="w-full">
										Manage Paket Cucian
										<ArrowRight className="ml-2 size-4" />
									</Button>
								</Link>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Quick Actions</CardTitle>
							<CardDescription>
								Common tasks you might want to perform
							</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-2">
							<AddServiceDialog />
							<Link href="/admin/orders">
								<Button variant="outline" className="w-full justify-start">
									<ShoppingBag className="mr-2 size-4" />
									Process Pending Orders
								</Button>
							</Link>
							<Link href="/admin/customers">
								<Button variant="outline" className="w-full justify-start">
									<Users className="mr-2 size-4" />
									View Customer List
								</Button>
							</Link>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

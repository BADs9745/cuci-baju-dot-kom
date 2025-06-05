import { GetOwnOrder } from "@/lib/profile";
import { ownOrderColumn } from "./column";
import { OwnOrderTable } from "./data-table";

export default async function MyOrderPage({
	params,
}: { params: Promise<{ id: string }> }) {
	const order = await GetOwnOrder((await params).id);

	return (
		<section className="p-20">
			<div>
				<h1 className="text-3xl font-semibold">My Order</h1>
				<p className="text-muted-foreground">Manage your own orders</p>
			</div>
			<OwnOrderTable data={order.data} columns={ownOrderColumn} />
		</section>
	);
}

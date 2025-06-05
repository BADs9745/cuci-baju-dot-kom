import { GetAllInventory } from "@/lib/inventory";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { InventoryDataTable } from "./table/data-table";
import { InventoryColumn } from "./table/column";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import AddForm from "./components/form";

export default async function InventoryManagementPage() {
	const inventory = await GetAllInventory();
	return (
		<>
			<div>
				<h1 className="text-3xl font-bold">Inventory Laundry</h1>
				<p className="text-muted-foreground">Manage the Laundry Inventory</p>
			</div>
			<section>
				<h2 className="text-2xl font-bold text-center">Inventories Item</h2>
				<div className="flex justify-end">
					<Dialog>
						<DialogTrigger asChild>
							<Button>
								Tambah Item <Plus />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Add Item to Inventory</DialogTitle>
							</DialogHeader>
							<AddForm />
						</DialogContent>
					</Dialog>
				</div>
				<div>
					<InventoryDataTable data={inventory} columns={InventoryColumn} />
				</div>
			</section>
		</>
	);
}

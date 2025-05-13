import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddPaketForm from "./add-form";
import { GetAllService } from "@/lib/cucian";

export default async function AddPaketDialog() {
	const getService = await GetAllService();
	const serviceList = getService.map((e) => ({
		...e,
		pricePerUnit: e.pricePerUnit.toNumber(),
	}));
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="font-bold">
					<Plus className="size-4 mr-2 stroke-3 scale-125" />
					Add Package
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle className="text-center text-3xl font-bold mb-10">
					Tambah Paket
				</DialogTitle>
				<AddPaketForm service={serviceList} />
			</DialogContent>
		</Dialog>
	);
}

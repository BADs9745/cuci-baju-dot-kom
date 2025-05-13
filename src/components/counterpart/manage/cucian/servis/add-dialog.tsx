import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogHeader,
	DialogDescription,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddServisForm from "./add-form";

export default async function AddServiceDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"secondary"} className="font-bold sticky top-5">
					Tambah Services
					<Plus className="stroke-3" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-center text-3xl font-bold">
						Tambah Servis
					</DialogTitle>
					<DialogDescription className="text-center">
						Tambahkan Servis baru untuk pemesanan cucian
					</DialogDescription>
				</DialogHeader>
				<AddServisForm />
			</DialogContent>
		</Dialog>
	);
}

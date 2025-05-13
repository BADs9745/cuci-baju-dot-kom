"use client";
import EditPaketForm from "@/components/counterpart/manage/cucian/paket/edit-form";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { GetPaketById } from "@/lib/cucian";
import type { ServiceType } from "@/lib/types/cucian";
import { Dialog } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

export default function EditDialog({
	currentData,
	services,
}: {
	currentData: Awaited<ReturnType<typeof GetPaketById>>;
	services: ServiceType[];
}) {
	const router = useRouter();

	return (
		<Dialog
			defaultOpen
			onOpenChange={() => {
				router.back();
			}}
		>
			<DialogContent>
				<DialogTitle>Edit Paket</DialogTitle>
				<EditPaketForm service={services} currentData={currentData} />
			</DialogContent>
		</Dialog>
	);
}

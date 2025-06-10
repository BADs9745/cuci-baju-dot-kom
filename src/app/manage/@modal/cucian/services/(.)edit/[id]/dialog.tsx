"use client";
import EditServisForm from "@/components/counterpart/manage/cucian/servis/edit-form";
import {
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { GetServiceById } from "@/lib/cucian";
import { Dialog } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

export default function EditDialog({
	currentData,
}: {
	currentData: Awaited<ReturnType<typeof GetServiceById>>;
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
				<DialogHeader>
					<DialogTitle className="text-center text-4xl font-bold">
						Edit Service
					</DialogTitle>
				</DialogHeader>
				<EditServisForm currentData={currentData} />
			</DialogContent>
		</Dialog>
	);
}

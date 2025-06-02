"use client";
import { useRouter } from "next/navigation";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { GetRoleById } from "@/lib/profile";
import { EditForm } from "@/app/manage/employee/role/form";
export default function EditRoleDialog({
	initialState,
}: { initialState: Awaited<ReturnType<typeof GetRoleById>> }) {
	const router = useRouter();
	return (
		<Dialog onOpenChange={() => router.back()} defaultOpen>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Role</DialogTitle>
					<DialogDescription>Edit this role data</DialogDescription>
				</DialogHeader>
				<div>
					<EditForm
						initialValue={initialState}
						id={initialState.data?.id || ""}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}

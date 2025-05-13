"use client";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteService } from "@/lib/cucian";
import { toast } from "sonner";
import { tw } from "@/lib/utils";

export default function ServiceCardAction({ id }: { id: string }) {
	return (
		<>
			<Button variant={"secondary"}>
				Edit
				<Edit2 />
			</Button>
			<Button
				variant={"destructive"}
				onClick={async () => {
					const res = await DeleteService(id);
					if (res?.success) {
						toast.success(res.message, {
							className: tw`bg-green-200! dark:bg-green-900!`,
						});
					} else {
						toast.error(res?.message, {
							className: tw`bg-red-200! dark:bg-red-900!`,
						});
					}
				}}
			>
				Hapus
				<Trash2 />
			</Button>
		</>
	);
}

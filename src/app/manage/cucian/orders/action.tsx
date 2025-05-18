"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { EditOrderStatus } from "@/lib/cucian";
import { $Enums } from "@/prisma";

function ChangeOrderStatusBtn({
	id,
	currentStatus,
}: { id: string; currentStatus: $Enums.StatusOrder }) {
	return (
		<Select
			onValueChange={(el) => {
				EditOrderStatus(id, el as $Enums.StatusOrder);
			}}
			defaultValue={currentStatus}
		>
			<SelectTrigger>
				<SelectValue placeholder="Change Status" />
			</SelectTrigger>
			<SelectContent>
				{Object.keys($Enums.StatusOrder).map(
					(e) =>
						e === "CANCELLED" || (
							<SelectItem key={e} value={e}>
								{e}
							</SelectItem>
						),
				)}
			</SelectContent>
		</Select>
	);
}

export { ChangeOrderStatusBtn };

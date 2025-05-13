import { Badge } from "@/components/ui/badge";
import type { manageMenuList } from "@/lib/types/manage";
import { ListCheck, Package, User2 } from "lucide-react";

export const ManageMenuList: manageMenuList = {
	"Manage Cucian": {
		link: "/manage/cucian",
		content: (
			<div className="">
				<p className="">Atur Sistem Cucian Laundry</p>
				<div className="flex my-2 gap-2 *:text-base">
					<Badge>
						Paket Cucian <Package />
					</Badge>
					<Badge>
						Pesanan Cucian <ListCheck />
					</Badge>
				</div>
			</div>
		),
	},
	"Manage User Staff": {
		link: "/manage/staff",
		content: (
			<div className="">
				<p className="">Management Karyawan / Staff Laundry</p>
				<div className="flex my-2 gap-2 *:text-base">
					<Badge>
						Role Staff <User2 />
					</Badge>
				</div>
			</div>
		),
	},
};

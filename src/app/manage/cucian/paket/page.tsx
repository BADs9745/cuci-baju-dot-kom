import { GetPaketList } from "@/lib/cucian";
import { PaketCard } from "@/components/custom/client/paket-card";
import AddPaketDialog from "@/components/counterpart/manage/cucian/paket/add-dialog";

export default async function PaketManagementPage() {
	const paketList = await GetPaketList({ includeService: true });

	return (
		<>
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					Package Management
				</h1>
				<p className="text-zinc-500 dark:text-zinc-400">
					Create and manage service packages for your customers.
				</p>
			</div>
			<AddPaketDialog />
			<div>
				<PaketCard data={paketList} />
			</div>
		</>
	);
}

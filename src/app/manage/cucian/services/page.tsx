import AddServiceDialog from "@/components/counterpart/manage/cucian/servis/add-dialog";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { GetAllService } from "@/lib/cucian";
import ServiceCardAction from "./action.";

export default async function ServicesManagementPage() {
	const servicesList = await GetAllService({ timestamp: false });
	return (
		<>
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Services Management
					</h1>
					<p className="text-zinc-500 dark:text-zinc-400">
						Create and manage services for The Laundry.
					</p>
				</div>
			</div>
			<AddServiceDialog />
			<div className="flex flex-col gap-5">
				{servicesList.map((e) => (
					<div key={e.id}>
						<Card className="flex flex-row">
							<div className="grow flex flex-col gap-3">
								<CardHeader>
									<CardTitle className="text-2xl font-bold">{e.name}</CardTitle>
									<CardDescription>{e.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<div>
										<span>Harga per Kilo : </span>
										<span>
											Rp{" "}
											{e.pricePerUnit
												.toNumber()
												.toLocaleString("id", { currency: "idr" })}
										</span>
									</div>
								</CardContent>
							</div>
							<div className="p-5 px-10 items-center gap-3 flex">
								<ServiceCardAction id={e.id} />
							</div>
						</Card>
					</div>
				))}
			</div>
		</>
	);
}

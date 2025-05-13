"use client";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { EditActivatePaket, type GetPaketList } from "@/lib/cucian";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function PaketCard({
	data,
}: { data: Awaited<ReturnType<typeof GetPaketList>> }) {
	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-5">
			{data.map((e) => {
				return (
					<Card key={e.id} className="aspect-9/12 p-5">
						<CardTitle className="text-center text-2xl line-clamp-2 h-15 px-5">
							{e.name}
						</CardTitle>
						<CardDescription className="flex-2/8">
							<span className="line-clamp-6">{e.description}</span>
						</CardDescription>

						<div className="space-y-2 grow">
							<h2>Included Services :</h2>
							<CardContent className="ring-border ring-1 min-h-10 rounded-md p-2 max-h-20 overflow-y-auto flex gap-1 flex-wrap">
								{e.Service.map((e) => (
									<Badge key={e.id} className="font-semibold">
										{e.name}
									</Badge>
								))}
								{e.Service.length === 0 && (
									<Badge
										variant={"secondary"}
										className="mx-auto font-semibold"
									>
										No Included Service
									</Badge>
								)}
							</CardContent>
						</div>
						<div>
							Harga Kiloan :{" "}
							<span className="font-bold">
								Rp{" "}
								{e.pricePerUnit.toLocaleString("id", {
									currency: "IDR",
								})}
							</span>
						</div>
						<CardAction className="space-x-2 w-full flex items-center">
							<div className="grow flex items-center group">
								<Switch
									defaultChecked={e.active}
									onCheckedChange={(val) => {
										EditActivatePaket(e.id, val);
									}}
									id={`active-switch_${e.id}`}
									className="peer"
								/>
								<Label
									htmlFor={`active-switch_${e.id}`}
									className="ms-2 peer-aria-[checked=true]:[&_#activate]:block peer-aria-[checked=false]:[&_#deactivate]:block *:hidden *:font-bold"
								>
									<span id="activate">Active</span>
									<span id="deactivate" className="text-destructive">
										Deactive
									</span>
								</Label>
							</div>
							<Button variant={"secondary"} asChild>
								<Link href={`/manage/cucian/paket/edit/${e.id}`}>
									<Edit />
								</Link>
							</Button>
							<Button variant={"destructive"}>
								<Trash2 />
							</Button>
						</CardAction>
					</Card>
				);
			})}
		</div>
	);
}

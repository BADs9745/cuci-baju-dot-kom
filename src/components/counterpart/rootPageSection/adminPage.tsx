import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GetAllService } from "@/lib/cucian";
import type { GetProfileByToken } from "@/lib/session";
import { ArrowRight, Settings, Settings2, WashingMachine } from "lucide-react";
import Link from "next/link";

export default async function AaaadminPage({
	profile,
}: { profile: Awaited<ReturnType<typeof GetProfileByToken>> }) {
	const service = await GetAllService({ timestamp: true });
	return (
		<>
			<section className="flex flex-col items-center justify-center w-full min-h-screen gap-5 text-center">
				<Badge className="mb-4">Professional Laundry Service</Badge>
				<h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
					Welcoe Admin{" "}
					<span className="text-primary capitalize">
						{profile.data.fullName}
					</span>
					<br /> Ready to manage your laundry business!
				</h1>
				<p className="max-w-[700px] text-lg text-zinc-500 dark:text-zinc-400 md:text-xl">
					Our motto is &quot;Let us handle your laundry while you focus on what
					matters most. Professional cleaning, fast turnaround, and doorstep
					delivery&quot;. We are here to make your life easier and your clothes
					cleaner.
				</p>
				<p>Menu :</p>
				<div className="flex flex-col gap-4 min-sm:flex-row ring-1 rounded-md p-4 ring-border">
					<Link href="/cucian">
						<Button size="lg" className="gap-1">
							Pesan Sekarang
							<ArrowRight className="size-4" />
						</Button>
					</Link>
					<Link href="/tentang">
						<Button size="lg" variant="outline">
							Tentang Kami
						</Button>
					</Link>
				</div>
				<p>Admin Menu :</p>
				<div className="flex flex-col gap-4 ring-1 rounded-md p-4 ring-border max-w-[50vw] items-center">
					<Button asChild>
						<Link href={"/manage"}>
							Manage Dasboard <Settings2 />
						</Link>
					</Button>
					<Separator />
					<div className="flex gap-4">
						<Button asChild variant={"secondary"}>
							<Link href={"/manage/cucian"}>
								Manage Cucian <WashingMachine />
							</Link>
						</Button>
						<Button asChild variant={"secondary"}>
							<Link href={"/manage/staff"}>
								Manage Staff
								<WashingMachine />
							</Link>
						</Button>
					</div>
				</div>
			</section>
			<section className="bg-secondary py-20 px-15 md:px-50 flex flex-col items-center gap-10">
				<div>
					<h2 className="text-center tracking-tight text-3xl font-bold">
						Our services
					</h2>
					<p className="max-w-[700px] text-zinc-500 dark:text-zinc-400 text-center mt-5">
						We offer a comprehensive range of laundry services to meet all your
						needs, from everyday washing to specialized care for delicate items.
					</p>
				</div>
				<div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
					{service.map((s) => (
						<Card key={s.id} className="h-70">
							<CardHeader>
								<CardTitle className="text-center">{s.name}</CardTitle>
								<CardDescription>{s.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2">
									<div>Create at :</div>
									<div className="flex items-center justify-end space-x-2">
										<span>
											{s.createdAt.toLocaleDateString("id", {
												weekday: "long",
											})}
										</span>
										<Separator orientation="vertical" />
										<span>{s.createdAt.toLocaleDateString()}</span>
									</div>
									<div>Update at :</div>
									<div className="flex items-center justify-end space-x-2">
										<span>
											{s.updatedAt.toLocaleDateString("id", {
												weekday: "long",
											})}
										</span>
										<Separator orientation="vertical" />
										<span>{s.updatedAt.toLocaleDateString()}</span>
									</div>

									<div> Estimated Time : </div>
									<div className="text-end">{s.estimatedTimeHours} Jam</div>
									<div>Price :</div>
									<div className="text-end">
										{s.pricePerUnit.toLocaleString("id-ID", {
											style: "currency",
											currency: "IDR",
										})}
									</div>
								</div>
							</CardContent>
						</Card>
					))}
					<Button variant={"ghost"} asChild className="p-0 w-full">
						<Link className="h-fit w-full" href={"/manage/cucian/service"}>
							<Card className="h-70 items-center justify-center w-full">
								<CardTitle className="text-center">Manage Services</CardTitle>
								<CardDescription>Manage More Services</CardDescription>
								<Settings className="size-20" />
							</Card>
						</Link>
					</Button>
				</div>
			</section>
		</>
	);
}

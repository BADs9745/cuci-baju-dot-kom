import HomeModalList from "@/components/counterpart/home/modal";
import InteractiveWeight from "@/components/counterpart/home/weight";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GetPaketList } from "@/lib/cucian";
import { tw } from "@/lib/utils";
import { Clock, Sparkles, Truck } from "lucide-react";

const sectionStyle = tw`justify-center py-20 px-50 gap-10`;
export default function HomePage() {
	const paketList = GetPaketList();
	return (
		<>
			<section
				className="bg-center bg-[length:100%] py-20 px-50"
				style={{
					backgroundImage: "url('/img/jeremy-sallee-lgrM1t4rxWQ-unsplash.jpg')",
				}}
			>
				<h1 className="h-50 content-center text-center bg-primary/80 rounded-3xl ring-border ring-3 text-6xl text-primary-foreground font-semibold tracking-wide">
					Cuci baju dengan segar dan rapi, Diantar sampai ke depan pintu
					rumahmu!
				</h1>
			</section>
			<section className={`${sectionStyle} flex`}>
				<HomeModalList />
			</section>
			<section className={sectionStyle}>
				<h1 className="text-4xl capitalize font-medium">
					Cuci Kiloan Baju Klean Dengan Harga Terjankau
				</h1>
				<p className="mt-5">
					Mencuci Baju dengan tangan muungkin snagatlah melalahkan dengan rasa
					malas yang sangat mengerumninmu. Tapi jangan risau kami bisa mencuci
					baju mu dengan harga yang terjakau dengan sistem kiloan
				</p>
				<InteractiveWeight paket={paketList} />
			</section>
			<section className="py-16 md:py-24 px-50">
				<div className="grid gap-8 md:grid-cols-3">
					<Card className="border-none shadow-md">
						<CardHeader className="gap-2">
							<Clock className="size-8 text-primary" />
							<CardTitle>Time-Saving</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-zinc-500 dark:text-zinc-400">
								Save up to 5 hours every week by letting us handle your laundry
								needs. More time for what matters to you.
							</p>
						</CardContent>
					</Card>
					<Card className="border-none shadow-md">
						<CardHeader className="gap-2">
							<Sparkles className="size-8 text-primary" />
							<CardTitle>Professional Quality</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-zinc-500 dark:text-zinc-400">
								Expert cleaning techniques and premium detergents ensure your
								clothes look and feel their best.
							</p>
						</CardContent>
					</Card>
					<Card className="border-none shadow-md">
						<CardHeader className="gap-2">
							<Truck className="size-8 text-primary" />
							<CardTitle>Free Delivery</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-zinc-500 dark:text-zinc-400">
								Complimentary pickup and delivery for orders over $30. Your
								clean clothes arrive at your doorstep.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>
		</>
	);
}

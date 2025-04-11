import HomeModalList from "@/components/counterpart/home/modal";
import InteractiveWeight from "@/components/counterpart/home/weight";
import { Button } from "@/components/ui/button";
import { tw } from "@/lib/utils";

const sectionStyle = tw`justify-center py-20 px-50 gap-10`;
export default function HomePage() {
	return (
		<>
			<section
				className="bg-center bg-[length:100%] py-20 px-50 scroll-smooth"
				style={{
					backgroundImage: "url('/img/jeremy-sallee-lgrM1t4rxWQ-unsplash.jpg')",
				}}
			>
				<h1 className="h-50 content-center text-center bg-primary/80 rounded-3xl ring-border ring-3 text-7xl text-primary-foreground font-semibold tracking-wide">
					Fresh Laundry, Delivered to Your Doorstep Effortlessly Clean!
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
				<div className="flex flex-col justify-center bg-accent rounded-sm p-10 mt-10">
					<InteractiveWeight />
					<Button className="mt-10 text-xl p-5 w-fit self-end">
						Cuci Sekarang
					</Button>
				</div>
			</section>
		</>
	);
}

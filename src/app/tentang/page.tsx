import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function TentangPage() {
	return (
		<div>
			<section className="contain-layout mx-50 py-10">
				<h1 className={"text-5xl font-bold text-center"}>
					Apa itu Cuci Baju Dot Kom
				</h1>
				<p className="mt-10 text-justify">
					Cuci Baju Dot Kom adalah perusahaan laundry yang bergerak dalam bidang
					jasa cucian pakaian. Kami berkomitmen untuk memberikan pelayanan yang
					terbaik dan memberikan hasil yang sesuai dengan kebutuhan pelanggan.
					Kami menggunakan peralatan yang modern dan sistem yang efektif dalam
					mencuci pakaian sehingga pakaian yang kami cuci dapat terjamin
					kebersihannya dan terjamin mutunya.
				</p>
			</section>
			<section className="contain-layout mx-50 py-10 grid grid-flow-row grid-cols-2 gap-10">
				<HoverBox>
					<h1 className="text-3xl font-bold text-center">Visi Kami</h1>
					<p className="text-justify p-5">
						Menjadi solusi bagi kebutuhan masyarakat melalui platform online
						maupun offline dengan mengembangkan ekosistem bisnis untuk mitra
						kami
					</p>
				</HoverBox>
				<HoverBox>
					<h1 className="text-3xl font-bold text-center">Misi Kami</h1>
					<ul className="list-disc list-outside p-5">
						<li>Memberikan pelayanan terbaik kepada pelanggan</li>
						<li>Mengembangkan ekosistem bisnis untuk mitra kami</li>
						<li>
							Menjadi solusi bagi kebutuhan masyarakat melalui platform online
							maupun offline
						</li>
					</ul>
				</HoverBox>
				<HoverBox>
					<h1 className="text-3xl font-bold text-center">Ayam Goreng</h1>
					<p className="text-justify p-5">
						Ayam goreng adalah hidangan yang terbuat dari potongan ayam yang
						digoreng dalam minyak panas hingga berwarna keemasan dan renyah.
						Hidangan ini sangat populer di Indonesia dan berbagai negara
						lainnya, dengan berbagai variasi bumbu dan cara penyajian.
					</p>
				</HoverBox>
				<HoverBox>
					<h1 className="text-3xl font-bold  text-center">Bebek Goreng</h1>
					<p className="text-justify p-5">
						Bebek goreng adalah hidangan khas Indonesia yang terbuat dari daging
						bebek yang digoreng hingga renyah. Hidangan ini sangat populer dan
						dapat ditemukan di berbagai daerah di Indonesia, dengan variasi
						bumbu dan cara penyajian yang berbeda-beda.
					</p>
				</HoverBox>
			</section>
			<section className="mx-50 py-10 contain-layout">
				<h2 className="text-3xl font-bold text-center">FAQ</h2>
				<p className="text-muted-foreground text-center">
					Temukan jawaban dari pertanyaan yang sering ditanyakan
				</p>
				<Accordion
					type="single"
					collapsible
					className="w-full mt-10 mx-auto max-w-5xl"
				>
					<AccordionItem value="faq-item-1">
						<AccordionTrigger className="text-2xl font-semibold">
							Bagaimana cara memasak Ayam Goreng ?
						</AccordionTrigger>
						<AccordionContent className="text-lg">
							Untuk memasak ayam goreng, pertama-tama siapkan potongan ayam,
							bumbu marinasi, dan minyak goreng. Marinasi ayam dengan bumbu
							selama beberapa jam, lalu goreng dalam minyak panas hingga
							berwarna keemasan dan renyah. Sajikan dengan nasi atau lalapan
							sesuai selera.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="fag-item-2">
						<AccordionTrigger className="text-2xl font-semibold">
							Bisakah ayam terbang setelah dimasak ?
						</AccordionTrigger>
						<AccordionContent className="text-lg">
							Tidak, ayam tidak terbang. Ayam merupakan makhluk hidup karnivora
							yang hidup di darat dan tidak terbang.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</section>
		</div>
	);
}

const HoverBox = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			className="bg-accent p-5 rounded-md
					shadow-[5px_5px_10px] shadow-primary
					"
		>
			{children}
		</div>
	);
};

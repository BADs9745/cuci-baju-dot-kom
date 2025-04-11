import * as m from "motion/react-client";
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
					<h1 className="text-3xl font-bold ">Visi Kami</h1>
					<p className="text-justify">
						Menjadi solusi bagi kebutuhan masyarakat melalui platform online
						maupun offline dengan mengembangkan ekosistem bisnis untuk mitra
						kami
					</p>
				</HoverBox>
				<HoverBox>
					<h1 className="text-3xl font-bold">Misi Kami</h1>
					<ul className="list-disc list-inside">
						<li>Memberikan pelayanan terbaik kepada pelanggan</li>
						<li>Mengembangkan ekosistem bisnis untuk mitra kami</li>
						<li>
							Menjadi solusi bagi kebutuhan masyarakat melalui platform online
							maupun offline
						</li>
					</ul>
				</HoverBox>
				<HoverBox>
					<h1 className="text-3xl font-bold ">Ayam Goreng</h1>
					<p className="text-justify">
						Ayam goreng adalah hidangan yang terbuat dari potongan ayam yang
						digoreng dalam minyak panas hingga berwarna keemasan dan renyah.
						Hidangan ini sangat populer di Indonesia dan berbagai negara
						lainnya, dengan berbagai variasi bumbu dan cara penyajian.
					</p>
				</HoverBox>
				<HoverBox>
					<h1 className="text-3xl font-bold ">Bebek Goreng</h1>
					<p className="text-justify">
						Bebek goreng adalah hidangan khas Indonesia yang terbuat dari daging
						bebek yang digoreng hingga renyah. Hidangan ini sangat populer dan
						dapat ditemukan di berbagai daerah di Indonesia, dengan variasi
						bumbu dan cara penyajian yang berbeda-beda.
					</p>
				</HoverBox>
			</section>
		</div>
	);
}

const HoverBox = ({ children }: { children: React.ReactNode }) => {
	return (
		<m.div
			className="bg-accent p-5 rounded-md
					shadow-[5px_5px_10px] shadow-primary
					"
			whileHover={{
				scale: 1.05,
				zIndex: 20,
			}}
			transition={{
				type: "spring",
				duration: 0.5,
			}}
		>
			{children}
		</m.div>
	);
};

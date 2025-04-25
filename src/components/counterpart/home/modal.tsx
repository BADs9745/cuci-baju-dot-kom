"use client";
import { AnimatePresence, MotionConfig, LazyMotion } from "motion/react";
import * as m from "motion/react-m";
import { useState } from "react";
import clsx from "clsx";

const domAnimation = () => import("motion/react").then((e) => e.domAnimation);

export default function HomeModalList() {
	const [open, setOpen] = useState("");
	return (
		<MotionConfig transition={{ duration: 0.5, ease: [0.2, 0.3, 0.23, 0.9] }}>
			<LazyMotion features={domAnimation}>
				<AnimatePresence>
					{modalItem.map(({ label, img }) => (
						<m.button
							layoutId={label}
							onClick={() => {
								setOpen(label);
							}}
							className="rounded-2xl contain-content"
							key={label}
						>
							<m.div layoutId={`${label}-img-container`} className="h-50 w-70">
								<m.img
									src={img}
									alt={`${label}`}
									className="object-cover object-center w-full aspect-square"
									layoutId={`${label}-img`}
								/>
							</m.div>
							<div className="contain-content flex flex-col py-3 bg-primary/50">
								<m.h1
									className="text-3xl font-bold text-primary-foreground w-fit mx-auto"
									layoutId={`${label}-title`}
								>
									{label}
								</m.h1>
							</div>
						</m.button>
					))}
					{open !== "" && (
						<m.button
							type="button"
							className={clsx(
								"fixed top-0 right-0 w-screen h-full content-center px-50 z-101",
							)}
							onClick={() => setOpen("")}
							initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
							animate={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
							exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
						>
							{modalItem.map(
								({ label, desc, img }) =>
									label === open && (
										<m.div
											layoutId={label}
											className="h-6/7 w-full mx-auto relative contain-content rounded-2xl"
											key={label}
										>
											<m.div
												layoutId={`${label}-img-container`}
												className="h-3/4 w-full"
											>
												<m.img
													src={img}
													alt={label}
													layoutId={`${label}-img`}
													className="object-cover object-center w-full aspect-square"
												/>
											</m.div>
											<div className="py-5 px-10 text-start text-primary-foreground contain-content flex flex-col bg-primary/50 absolute bottom-0">
												<m.h1
													className="text-3xl font-bold w-fit"
													layoutId={`${label}-title`}
												>
													{label}
												</m.h1>
												<p className="mt-5 text-2xl">{desc}</p>
											</div>
										</m.div>
									),
							)}
						</m.button>
					)}
				</AnimatePresence>
			</LazyMotion>
		</MotionConfig>
	);
}

type modalType = {
	label: string;
	img: string;
	desc: string;
};

const modalItem: modalType[] = [
	{
		label: "Laundry Kiloan",
		img: "/img/annie-spratt-nK4GVqwCNMM-unsplash-compressed.webp",
		desc: "Jasa laundry baju kiloan di ciputat dan sekitarnya, cocok untuk pakaian  sehari-hari. Sudah termasuk cuci, gosok dan lipat. Bisa antar-jemput.",
	},
	{
		label: "Laundry Satuan",
		img: "/img/ryoji-hayasaka-gkbAYJIMVDA-unsplash-compressed.webp",
		desc: "Jasa laundry satuan seperti kemeja, jas dll. Sangat cocok untuk pakaian spesial anda. Pengerjaan yang detail, bersih dengan harga terjangkau.",
	},
	{
		label: "Laundry Express",
		img: "/img/engin-akyurt-yCYVV8-kQNM-unsplash-compressed.webp",
		desc: "Jasa laundry satuan seperti kemeja, jas dll. Sangat cocok untuk pakaian spesial anda. Pengerjaan yang detail, bersih dengan harga terjangkau.",
	},
	{
		label: "Laundry Deliver",
		img: "/img/rowan-freeman-clYlmCaQbzY-unsplash-compressed.webp",
		desc: "Jasa Laundry Deliver akan mengantar pakaian anda ketempat anda tanpa anda harus pergi ke luar. Laundry Deliver juga menyediakan jasa jemput pakaian.",
	},
];

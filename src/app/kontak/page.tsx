import KontakForm from "./form";

export default function KontakPage() {
	return (
		<>
			<div className="flex mx-50 my-10">
				<div>
					<h1 className="text-4xl">Menjadi Lebih Dekat</h1>
					<p>
						Ayo jangan ragu kontak kami berikan saran dan masukan untuk menjadi
						lebih baik
					</p>
				</div>
				<div className="grow">
					<KontakForm />
				</div>
			</div>
		</>
	);
}

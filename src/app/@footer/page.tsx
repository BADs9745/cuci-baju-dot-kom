import ThemeSwitch from "@/components/themeSwitch";
import { playwrite } from "@/font/font";
import { MailIcon, MessageSquareIcon, PhoneIcon } from "lucide-react";

export default function RootFooter() {
	return (
		<div className="pt-20 bg-muted px-30 contain-layout">
			<div className="flex gap-15">
				<h1 className={`${playwrite.className} text-3xl italic text-nowrap`}>
					Cuci Baju Dot Kom
				</h1>
				<p className="text-justify max-w-170">
					Cuci Baju Dot Kom Adalah Layanan Cuci Baju yang terpecaya yang mencuci
					pakaian anda dengan bersih tanpa noda. Cuci Baju Dot Kom juga
					menydiakan layanan antar jemput yaitu Laundry Deliver sehingga anda
					tidak perlu lagi ke luar rumah. Cuci Baju Dot Kom telah tersedia
					dibanyak cabang.{" "}
				</p>
				<div className="*:flex flex flex-col grow items-end gap-5 *:gap-2">
					<div>
						<MailIcon /> Stranger@gg.cum
					</div>
					<div>
						<MessageSquareIcon /> +898-6969-6969
					</div>
					<div>
						<PhoneIcon /> +6969-6969-696
					</div>
				</div>
			</div>
			<div className="flex justify-between mt-20 mb-10 text-base">
				<p>
					Copyright &copy; {new Date().getFullYear()} Cuci Baju Dot Kom .
					Trademark Policy &trade;
				</p>
				<ThemeSwitch />
			</div>
		</div>
	);
}

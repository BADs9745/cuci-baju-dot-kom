import { GetProfile, isLogin } from "@/lib/session";
import CucianForm from "./form";
import type { CucianFormSchema, CucianSearchParam } from "@/lib/types/cucian";
import type { z } from "zod";
import { GetPaketList } from "@/lib/cucian";

export default async function CucianPage({
	searchParams,
}: { searchParams: Promise<CucianSearchParam> }) {
	const cucian = await searchParams;
	const token = await isLogin();
	const profile = await GetProfile(token as string);
	const cucianForm: z.infer<typeof CucianFormSchema> = {
		paket: cucian.paket,
		email: profile.email,
		fullName: profile.fullName,
		phone: profile.phone?.toString() ?? "",
		alamat: profile.alamat ?? "",
	};
	const PaketList = GetPaketList();
	return (
		<>
			<h1 className="text-center text-4xl font-bold my-10">
				Buat Pesanan Cucian
			</h1>
			<CucianForm
				paket={cucian.paket}
				fullName={cucianForm.fullName}
				email={cucianForm.email}
				phone={cucianForm.phone}
				isLogin={!!token}
				alamat={cucianForm.alamat}
				paketList={PaketList}
			/>
		</>
	);
}

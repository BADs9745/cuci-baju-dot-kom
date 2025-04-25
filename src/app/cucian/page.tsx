import { GetProfileByToken, isLogin } from "@/lib/session";
import CucianForm from "./form";
import type { CucianFormSchema, CucianSearchParam } from "@/lib/types/cucian";
import type { z } from "zod";
import { CountUserCucianOrder, GetPaketList } from "@/lib/cucian";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

export default async function CucianPage({
	searchParams,
}: { searchParams: Promise<CucianSearchParam> }) {
	const cucian = await searchParams;
	const token = await isLogin();
	const profile = await GetProfileByToken(token as string);
	const cucianForm: z.infer<typeof CucianFormSchema> = {
		paket: cucian.paket,
		email: profile.email,
		fullName: profile.fullName,
		phone: profile.phone?.toString() ?? "",
		alamat: profile.alamat ?? "",
	};
	const PaketList = GetPaketList();
	const cucianOrderCount = await CountUserCucianOrder(profile.id);
	let limit = false;
	if (cucianOrderCount >= 3) {
		limit = true;
	}
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
				limit={limit}
			/>
			<AlertDialog open={limit}>
				<AlertDialogContent>
					<AlertDialogTitle className="text-2xl text-center">
						Anda Mencapai Batas Pesanan Cucian
					</AlertDialogTitle>
					<AlertDialogDescription className="text-center text-lg">
						Harap batalkan pesanan beberapa pesanan anda atau tunggu beberapa
						pesanan anda selesai untuk membuat pesanan lagi
					</AlertDialogDescription>
					<AlertDialogAction asChild>
						<Link href={`/user/${profile.id}/cucian/`}>
							Lihat Detail Pesanan Anda
						</Link>
					</AlertDialogAction>
					<AlertDialogAction asChild>
						<Link href={"/"}>Kembali Ke Halaman Utama</Link>
					</AlertDialogAction>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}

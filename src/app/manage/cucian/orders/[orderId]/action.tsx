"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ConfirmOrder } from "@/lib/cucian";
import { Save } from "lucide-react";
import { AnimateNumber } from "motion-number";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
export type KonfirmasiHarga = {
	totalWeight: number;
};
export default function PaymentAction({
	totalPerUnit,
	orderId,
}: { totalPerUnit: number; orderId: string }) {
	const form = useForm<KonfirmasiHarga>();
	const formRef = useRef<HTMLFormElement>(null);
	const finalPayment = (form.watch("totalWeight") || 0) * totalPerUnit;

	async function Submithandler() {
		const res = await ConfirmOrder(finalPayment, orderId);
		if (res.success) {
			toast.success(res.message);
		} else {
			toast.error(res.message);
		}
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(Submithandler)} ref={formRef}>
				<div className="flex justify-between">
					<FormField
						control={form.control}
						name="totalWeight"
						render={() => (
							<FormItem>
								<FormLabel>Total Berat Pakaian (Kg)</FormLabel>
								<FormControl>
									<Input
										{...form.register("totalWeight", { valueAsNumber: true })}
										type="number"
										placeholder="ex: 5"
										className="w-full"
									/>
								</FormControl>
								<FormDescription>
									Total Berat Pakaian Pelanggan yang telah dihitung Krayawab
								</FormDescription>
								<div className="flex gap-3">
									<h3>Total Harga Per Kilo Pakaian</h3> :
									<p>
										{totalPerUnit.toLocaleString("id-ID", {
											style: "currency",
											currency: "IDR",
										})}{" "}
										/ Kg
									</p>
								</div>
							</FormItem>
						)}
					/>
					<div>
						<h3 className="font-bold text-3xl text-end">Total Harga</h3>
						<div className="text-5xl font-semibold truncate max-w-200 flex gap-2 items-center">
							<AnimateNumber format={{ currency: "IDR", style: "currency" }}>
								{finalPayment}
							</AnimateNumber>
						</div>
					</div>
				</div>
				<Dialog>
					<DialogTrigger asChild>
						<Button className="my-5 w-full text-2xl p-7">
							Simpan <Save className="size-7" />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Simpan Perubahan</DialogTitle>
							<DialogDescription>
								Pesanan akan memasuki status PROSESS dan harga akan ditetapkan
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant={"secondary"}>Batal</Button>
							</DialogClose>
							<Button
								type="submit"
								onClick={() => {
									formRef.current?.requestSubmit();
								}}
							>
								Simpan
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</form>
		</Form>
	);
}

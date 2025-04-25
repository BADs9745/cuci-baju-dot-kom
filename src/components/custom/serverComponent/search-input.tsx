import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { $Enums } from "@/prisma";
import { Search } from "lucide-react";
export default function SearchInput({
	search,
	status,
}: { search?: string; status?: $Enums.StatusOrder }) {
	const statusList = Object.values($Enums.StatusOrder);
	return (
		<>
			<form
				action="/cucian/list"
				className="flex w-full space-x-3 items-end"
				method="GET"
			>
				<div className="w-full">
					<Label htmlFor="find" className="mb-2 indent-2 text-lg">
						<strong className="text-2xl">Pencarian</strong>{" "}
						<span className="text-muted-foreground">
							Nama Pelanggan / Id Pesanan
						</span>
					</Label>
					<Input
						placeholder="Cari Nama Lengkap Pelanggan atau Id Pesanan Cucian"
						id="find"
						defaultValue={search}
						name="find"
					/>
				</div>
				<Select name="status" defaultValue={status}>
					<SelectTrigger>
						<SelectValue placeholder="Status Pesanan" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Status Pesanan</SelectLabel>
							{statusList.map((stat) => (
								<SelectItem value={stat} key={stat}>
									{stat.replace("_", " ")}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
				<Button className="px-10!" type="submit">
					Cari <Search />
				</Button>
			</form>
		</>
	);
}

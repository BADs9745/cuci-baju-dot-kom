import { GetAllService, GetPaketById } from "@/lib/cucian";
import EditDialog from "./dialog";

export default async function EditModal({
	params,
}: { params: Promise<{ id: string }> }) {
	const paketId = (await params).id;
	const paket = await GetPaketById(paketId);
	const getServices = await GetAllService();
	const services = getServices.map((e) => ({
		...e,
		pricePerUnit: e.pricePerUnit.toNumber(),
	}));
	return <EditDialog currentData={paket} services={services} />;
}

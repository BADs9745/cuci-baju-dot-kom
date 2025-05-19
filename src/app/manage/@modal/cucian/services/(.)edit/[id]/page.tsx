import { GetServiceById } from "@/lib/cucian";
import EditDialog from "./dialog";

export default async function EditModal({
	params,
}: { params: Promise<{ id: string }> }) {
	const serviceId = (await params).id;
	const service = await GetServiceById(serviceId);
	return <EditDialog currentData={service} />;
}

import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import Link from "next/link";

export default async function AaaadminPage() {
	return (
		<>
			<Button asChild>
				<Link href={"/manage"}>
					Manage the Laundry <Settings2 />
				</Link>
			</Button>
		</>
	);
}

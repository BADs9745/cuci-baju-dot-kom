import Link from "next/link";
import * as m from "motion/react-client";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ManageMenuList } from "@/components/custom/client/manageMenuModal";

export default async function ManageRootPage() {
	return (
		<>
			<h1 className="text-center text-4xl font-bold mb-10">Management Page</h1>
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				{Object.entries(ManageMenuList).map(([title, content]) => (
					<m.div
						className="bg-muted/50 aspect-video rounded-xl p-5 flex flex-col"
						key={title}
					>
						<h1 className="text-3xl font-semibold">{title}</h1>
						<div>{content.content}</div>
						<div className="grow flex items-end justify-end">
							<Button asChild variant={"link"}>
								<Link href={content.link}>
									Go Manage <ChevronRight />
								</Link>
							</Button>
						</div>
					</m.div>
				))}
			</div>

			<div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
		</>
	);
}

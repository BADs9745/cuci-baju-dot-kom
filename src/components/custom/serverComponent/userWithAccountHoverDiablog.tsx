import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import type { User } from "@/prisma";

export default function UserWithAccountHoverCard({
	profile,
}: { profile: User }) {
	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Button variant="outline">{profile.fullName}</Button>
			</HoverCardTrigger>
			<HoverCardContent side="left" className="flex flex-col items-center">
				<h1 className="text-center font-bold text-lg">User Profile</h1>
				<Badge variant={"outline"}>Registered User</Badge>
				<div className="[&_p]:-mt-1 [&_p]:mb-2 w-full">
					<div className="mt-2">
						<h2 className="text-sm font-bold text-muted-foreground">
							Full Name:{" "}
						</h2>
						<p>{profile.fullName}</p>
					</div>

					<div>
						<h2 className="text-sm font-bold text-muted-foreground">Email: </h2>
						<p>{profile.email}</p>
					</div>

					<div>
						<h2 className="text-sm font-bold text-muted-foreground">
							Usename:{" "}
						</h2>
						<p className="mb-0!">{profile.username}</p>
					</div>
				</div>
				<div className="mt-2 flex justify-end w-full">
					<Badge>Pelanggan Baru</Badge>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}

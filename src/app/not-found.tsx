import { Button } from "@/components/ui/button";
import { ShirtIcon, HomeIcon, SearchIcon } from "lucide-react";

export default function NotFound() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
			<div className="mx-auto max-w-md space-y-6">
				<div className="flex justify-center">
					<div className="relative">
						<ShirtIcon className="size-24 text-primary" />
						<div className="absolute inset-0 flex items-center justify-center">
							<span className="text-4xl font-bold">404</span>
						</div>
					</div>
				</div>

				<div className="space-y-2">
					<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
						Page Not Found
					</h1>
					<p className="text-zinc-500 dark:text-zinc-400 md:text-xl">
						Oops! It seems this page has been lost in the laundry.
					</p>
				</div>

				<div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
					<Button size="lg" asChild>
						<a href={"/"}>
							<HomeIcon className="mr-2 size-4" />
							Back to Home
						</a>
					</Button>
					<Button variant="outline" size="lg">
						<SearchIcon className="mr-2 size-4" />
						Search Site
					</Button>
				</div>

				<div className="rounded-lg border bg-card p-6 shadow-sm">
					<h2 className="mb-3 text-lg font-medium">Looking for something?</h2>
				</div>
			</div>
		</div>
	);
}

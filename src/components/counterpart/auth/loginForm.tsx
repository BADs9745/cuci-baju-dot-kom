"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginContent } from "./form/login";
import { RegisterContent } from "./form/register";

export default function LoginForm({
	className,
	opt,
}: { className?: string; opt?: string }) {
	return (
		<>
			<div className={`flex flex-col ${className}`}>
				<Tabs defaultValue={opt || "login"}>
					<TabsList className="w-full mb-2 *:text-2xl py-7 *:p-7 *:duration-300">
						<TabsTrigger value="login">Login</TabsTrigger>
						<TabsTrigger value="register">Register</TabsTrigger>
					</TabsList>
					<TabsContent value="login">
						<LoginContent />
					</TabsContent>
					<TabsContent value="register">
						<RegisterContent />
					</TabsContent>
				</Tabs>
			</div>
		</>
	);
}

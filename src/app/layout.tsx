import "./globals.css";
import type { Metadata } from "next";
import { nunito } from "@/font";
import ThemeAdapter from "@/lib/themeAdapter";
import SessionProvider from "@/lib/sessionProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
	title: "Cuci Baju Dot Kom",
	description:
		"Cuci Baju Dot Kom Adalah Layanan Cuci Baju yang terpecaya yang mencuci pakaian anda dengan bersih tanpa noda.",
};

export default async function RootLayout({
	children,
	header,
	footer,
}: Readonly<{
	children: React.ReactNode;
	header: React.ReactNode;
	footer: React.ReactNode;
}>) {
	return (
		<html lang="id">
			<ThemeAdapter />
			<SessionProvider />
			<body className={`antialiased ${nunito.className} relative`}>
				<header className="sticky top-0 z-100">{header}</header>
				<main>{children}</main>
				<footer>{footer}</footer>
				<Toaster />
			</body>
		</html>
	);
}

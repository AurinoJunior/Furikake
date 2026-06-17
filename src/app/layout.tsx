import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const nunito = Nunito({
	variable: "--font-nunito",
	subsets: ["latin"],
	weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
	title: "Furikake",
	description: "Livro de receitas digital pessoal",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR" className={`${inter.variable} ${nunito.variable} h-full antialiased`}>
			<body className="min-h-full bg-background">{children}</body>
		</html>
	);
}

import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { WithApolloProvider } from "@/graphql/provider";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<body suppressHydrationWarning>
				<WithApolloProvider>
					<Provider>{children}</Provider>
				</WithApolloProvider>
			</body>
		</html>
	);
}

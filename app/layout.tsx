import type { Metadata } from "next";
import "./globals.css";
import "./editorial.css";

export const metadata: Metadata = {
  title: "青古堂 | Seikoudou — Korean & Chinese Antiquities",
  description: "Korean ceramics and Chinese antiquities, considered with care. Explore historic objects with Seikoudou in Kyobashi, Tokyo.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

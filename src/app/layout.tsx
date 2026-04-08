import "./globals.css";
import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";

export const metadata: Metadata = {
  title: "Mattia Leoni — IT & Network Consulting",
  description:
    "System & Network Engineer • Proxmox • Azure • Elastic • Security • Automation",
icons: {
    icon: "/favicon.ico",
  },
  };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

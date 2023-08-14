import type { Metadata } from "next";
import { Roboto } from "next/font/google";

//styles
import "../styles/globals.css";
import SideNav from "./components/sidenav";
import PageHeader from "./components/page-header";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Inventory Software!",
  description: "Make warehouse work good.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <PageHeader></PageHeader>
        <SideNav></SideNav>
        {children}
      </body>
    </html>
  );
}

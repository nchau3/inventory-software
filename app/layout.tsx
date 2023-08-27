import type { Metadata } from "next";
import { Quicksand } from "next/font/google";

//styles
import "../styles/globals.css";
import SideNav from "./layouts/components/sidenav";
import BaseLayout from "./layouts/base-layout";
import TopNav from "./layouts/components/top-nav";

const globalFont = Quicksand({ subsets: ["latin"], weight: "400" });

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
      <body className={globalFont.className}>
        <BaseLayout topNavSlot={<TopNav />} sideNavSlot={<SideNav />}>
          {children}
        </BaseLayout>
      </body>
    </html>
  );
}

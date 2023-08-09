import Head from "next/head";
import RootLayout, { metadata } from "../layout";

export default function Items() {
    return (
        <>
            <RootLayout>
                <div className="page-container">
                    <h1 className="text-[60px]">ITEMS</h1>
                </div>
            </RootLayout>
        </>
    )
}
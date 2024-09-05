import type {Metadata} from "next";
import {Montserrat} from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/ReduxProvider";


interface Props {
    children: React.ReactNode
}

const montserrat = Montserrat({subsets: ["cyrillic"]});

export const metadata: Metadata = {
    title: "SkyPro Music",
    description: "Настройся на свою волну",
};

export default function RootLayout({children}: Readonly<Props>) {
    return (
        <html lang="ru">
            <ReduxProvider>
                <body className={montserrat.className}>{children}</body>
            </ReduxProvider>
        </html>
    );
}

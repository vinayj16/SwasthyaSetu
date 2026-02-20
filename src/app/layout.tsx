import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SwasthyaSetu - Centralized Hospital System",
    description: "Unified healthcare platform for India",
    manifest: "/manifest.json",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}

                {/* Global Security Footer */}
                <footer className="fixed bottom-0 w-full z-[100] py-3 bg-slate-900/10 backdrop-blur-md border-t border-slate-200/50 pointer-events-none">
                    <div className="max-w-[1700px] mx-auto px-10 flex flex-col md:flex-row items-center justify-between text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
                        <div className="flex items-center space-x-4 mb-2 md:mb-0">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span>Nation-Grade Security Protocol Active</span>
                        </div>
                        <div className="flex items-center space-x-8">
                            <span>DPDP Act 2023 Compliant</span>
                            <span className="opacity-20">|</span>
                            <span>NDHM Infrastructure Node</span>
                            <span className="opacity-20">|</span>
                            <span className="text-blue-600/60">SHA-256 AES-256 Encrypted</span>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    );
}

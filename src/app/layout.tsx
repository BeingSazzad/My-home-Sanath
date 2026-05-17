import '@ant-design/v5-patch-for-react-19';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ConfigProvider } from "antd";
import './globals.css';
import { mainTheme } from "./theme";
import ReduxProvider from "@/redux/lib/ReduxProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Home",
  description: "My Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased inter`} suppressHydrationWarning>
        <ReduxProvider>
          <ConfigProvider theme={mainTheme} wave={{ disabled: true }}>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <Toaster position="top-right" duration={1500} />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </ConfigProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

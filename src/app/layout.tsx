import '@ant-design/v5-patch-for-react-19';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ConfigProvider } from "antd";
import './globals.css';
import { mainTheme } from "./theme";
import ReduxProvider from "@/redux/lib/ReduxProvider";

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
              <Toaster position="top-right" duration={1500} />
              {children}
          </ConfigProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

import { ConfigProvider } from "antd";
import { Footer } from "antd/es/layout/layout";
import localFont from "next/font/local";
import AppProvider from "./components/AppContext";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "X-vice",
  description: "Learn your courses anywhere",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ConfigProvider
        theme={{
          token: {
            buttonSolidCheckedHoverBg: "#ffffff",
            buttonSolidCheckedBg: "#000000",
            buttonSolidCheckedActiveBg: "#000000",
          },
        }}
      >
        <AppProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
            <Footer className="flex items-center justify-around gap-10 shadow-md shadow-black">
              <h1 className="text-3xl font-bold my-4">X-vice</h1>©
              {new Date().getFullYear()} Created by Regis KIKI
            </Footer>
          </body>
        </AppProvider>
      </ConfigProvider>
    </html>
  );
}

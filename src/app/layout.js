import { ConfigProvider } from "antd";
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
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AppProvider>{children}</AppProvider>
        </body>
      </ConfigProvider>
    </html>
  );
}

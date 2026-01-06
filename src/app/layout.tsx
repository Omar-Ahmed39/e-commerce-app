import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_Component/Navbar/Navbar";
import '@fortawesome/fontawesome-free/css/all.min.css'
import Footer from "./_Component/Footer/Footer";
import { Toaster } from 'react-hot-toast';
import MySessionProvider from "./_Component/MySessionProvider/MySessionProvider";

// import 'flowbite/dist/flowbite.min.js'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trendify",
  description: "Shop everything you need in one place! From electronics & fashion to home essentials. Enjoy best prices, fast shipping, and secure payment methods. Shop online now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >

        <MySessionProvider>
          <Navbar />
          <Toaster position="top-center" />

          {children}

          <Footer />
        </MySessionProvider>
      </body>
    </html>
  );
}

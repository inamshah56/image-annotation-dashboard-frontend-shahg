import { Poppins } from "next/font/google";
import "./globals.css";
import { AppDataProvider } from "@/context/appDataContext";
import Footer from "@/components/Footer";
import { FC, ReactNode } from "react";
import Header from "@/components/Header";
import LoadingSpinner from "./Loading";

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300"] });

export const metadata = {
  title: "Image Annotation Dashboard",
  description: "Image Based Plant Analysis Dashboard",
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AppDataProvider>
      <html lang="en">
        <body
          className={`${poppins.className} p-4 bg-gray-300 w-full max-w-[100rem] flex h-screen flex-col mx-auto space-y-4`}
        >
          <LoadingSpinner />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </body>
      </html>
    </AppDataProvider>
  );
};

export default RootLayout;

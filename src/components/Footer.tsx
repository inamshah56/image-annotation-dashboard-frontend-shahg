"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

const Footer: FC = () => {
  const pathname = usePathname();
  const active = (path: string) => {
    if (pathname === path) {
      return "text-amber-500";
    } else {
      return "hover:text-yellow-500";
    }
  };
  return (
    <></>
    // <footer className="bg-primary text-center w-full font-bold tracking-widest rounded-lg shadow p-4 h-24 flex flex-col justify-center">

    // </footer>
  );
};

export default Footer;

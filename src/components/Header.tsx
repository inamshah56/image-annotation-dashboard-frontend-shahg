"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

const Header: FC = () => {
  const pathname = usePathname();

  const active = (path: string): string =>
    (path === "/" && pathname === "/") || pathname.split("/").includes(path)
      ? "text-amber-500"
      : "hover:text-yellow-500";

  return (
    <div>
      <nav className="bg-green-950 text-white sm:text-lg text-sm text-center sm:text-end w-full font- rounded-t-lg shadow p-4 h-10 flex flex-col justify-center">
        <div className="sm:space-x-10 space-x-4">
          <Link href="/" className={`${active("/")} transition-colors`}>
            Annotate Image
          </Link>
          <Link
            href="/crop-conditions/add"
            className={`${active("crop-conditions")} transition-colors`}
          >
            Conditions
          </Link>
          <Link
            href="/crop-preventions/add"
            className={`${active("crop-preventions")} transition-colors`}
          >
            Preventions
          </Link>
        </div>
      </nav>
      <header className="bg-primary text-center w-full font-bold tracking-widest rounded-b-lg shadow p-4 h-24">
        <h1 className="sm:text-3xl text-2xl">DASHBOARD</h1>
        <p className="sm:text-xl text-sm"> IMAGE BASED PLANT ANALYSIS</p>
      </header>
    </div>
  );
};

export default Header;

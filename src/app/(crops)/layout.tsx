"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const path = pathname.split("/")[1];

  const active = (p: string): string =>
    pathname.split("/").pop() === p ? "bg-green-700 transition shadow" : "";

  return (
    <div className="space-y-4">
      <div className="bg-green-800 text-white rounded-lg flex items-center justify-between p-2">
        {["add", "get"].map((p, i) => (
          <Link
            key={i}
            href={`/${path}/${p}`}
            className={`${active(
              p
            )} rounded-lg flex-grow text-center text-lg p-2 capitalize`}
          >
            {p + " " + path.replace("-", " ")}
          </Link>
        ))}
      </div>
      <main>{children}</main>{" "}
    </div>
  );
};

export default Layout;

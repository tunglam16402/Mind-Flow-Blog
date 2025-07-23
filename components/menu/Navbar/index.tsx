import { navItems } from "@/constants/navItems";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface NavbarProps {
  scrolled: boolean;
}

const Navbar = ({ scrolled }: NavbarProps) => {
  return (
    <nav className="hidden md:flex gap-10 uppercase">
      {navItems.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={clsx(
            "text-2xl font-medium transition-colors duration-300",
            scrolled
              ? "text-primary hover:text-gay-700"
              : "sub-text hover:white-text"
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;

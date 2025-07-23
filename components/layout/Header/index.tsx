"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa6";
import clsx from "clsx";
import { Navbar, NavbarMobile } from "@/components/menu";
import Search from "@/components/menu/Search";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "wrapper fixed top-0 left-0 w-full z-50 transition-all duration-500",
        scrolled ? "bg-white shadow-md !py-2" : "bg-transparent"
      )}
    >
      <div className="flex justify-between items-center">
        <div>
          <Link href="/">
            <span
              className={clsx(
                "text-2xl font-bold uppercase leading-tight block transition-all duration-300",
                scrolled ? "text-primary" : "sub-text"
              )}
            >
              Travel
              <br />
              Next level
            </span>
          </Link>
        </div>
        <Navbar scrolled={scrolled} />
        <Search scrolled={scrolled} />
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          <FaBars
            className={clsx(
              "h-8 w-8 transition-colors duration-300",
              scrolled ? "text-primary" : "sub-text"
            )}
          />
        </button>
      </div>

      {isOpen && (
        <NavbarMobile isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </header>
  );
};

export default Header;

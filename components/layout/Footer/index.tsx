"use client";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { useState } from "react";
import Button from "@/components/ui/Button";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // giả lập submit
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <footer className="bg-primary white-text wrapper mt-12">
      <div className=" grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo & Description */}
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wide mb-5 white-text">
            Travel Next
          </h2>
          <p className="sub-text leading-relaxed">
            Journey beyond horizons. Discover travel tips, stories, and
            inspirations that fuel your wanderlust.
          </p>
          <div className="mt-6 flex space-x-6 text-2xl">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-blue-500 transition-all duration-300 transform hover:scale-110"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-pink-500 transition-all duration-300 transform hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-sky-400 transition-all duration-300 transform hover:scale-110"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="hover:text-red-600 transition-all duration-300 transform hover:scale-110"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <nav>
          <h3 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-4">
            {["Home", "Blog", "About", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="sub-text hover:white-text transition-colors duration-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Resources */}
        <nav>
          <h3 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">
            Resources
          </h3>
          <ul className="space-y-4">
            {["Privacy Policy", "Terms of Service", "FAQ", "Support"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="sub-text hover:white-text transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2 uppercase tracking-wide">
            Newsletter
          </h3>
          <p className="sub-text mb-4">
            Subscribe to get the latest travel stories and tips straight to your
            inbox.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow px-4 py-2 rounded bg-gray-800 border border-gray-700 placeholder-gray-500 white-text focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <Button className=" px-6 py-2 text-xl" variant="darkPrimary">
              Subscribe
            </Button>
          </form>
          {submitted && (
            <p className="mt-3 text-green-400 font-medium animate-fadeIn">
              Thank you for subscribing!
            </p>
          )}
        </div>
      </div>

      <div className="mt-16 border-t border-gray-800 pt-6 text-center text-sm side-text select-none">
        &copy; {new Date().getFullYear()} Travel Next. All rights reserved.
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
    </footer>
  );
};

export default Footer;

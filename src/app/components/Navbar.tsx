"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Close dropdown on scroll
  useEffect(() => {
    const handleScroll = (): void => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent): void => {
      // If the dropdown is open and the click is outside the nav element
      if (isOpen && !(event.target as HTMLElement)?.closest("nav")) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
     <nav className="bg-white w-full fixed top-0 left-0 z-50">

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-1 rounded-md">
              <Image src="/logo.png" alt="Toshel Logo" width={50} height={50} />
            </div>
            <span className="text-xl font-bold text-black hidden md:block">
              Toshel Construction
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>   

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            <li><Link href="/" className="text-black font-bold hover:text-blue-600">Home</Link></li>
            <Link href="#service" className="text-black font-bold hover:text-blue-600">
              Services
            </Link>
            <li><a href="#project" className="text-black font-bold hover:text-blue-600">Projects</a></li>
            <li><a href="#team" className="text-black font-bold hover:text-blue-600">Our Team</a></li>
            <li><a href="#contact" className="text-black font-bold hover:text-blue-600">Contact</a></li>
          </ul>
        </div>

        {/* Mobile Menu */}
       
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-50 rounded-b-lg animate-slide-down">
            <ul className="flex flex-col divide-y divide-gray-200">
              <li>
                <a
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-800 font-semibold hover:bg-gray-100"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#service"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-800 font-semibold hover:bg-gray-100"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#project"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-800 font-semibold hover:bg-gray-100"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-800 font-semibold hover:bg-gray-100"
                >
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-800 font-semibold hover:bg-gray-100"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}

      </div>
    </nav>
  );
}

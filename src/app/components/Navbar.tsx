"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
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
  <div className="md:hidden bg-black text-white px-4 py-2">
    <ul className="flex flex-col space-y-2">
      <li><a href="/" className="block hover:text-yellow-400">Home</a></li>
      <li><a href="#service" className="block hover:text-yellow-400">Services</a></li>
      <li><a href="#project" className="block hover:text-yellow-400">Projects</a></li>
      <li><a href="#team" className="block hover:text-yellow-400">Our Team</a></li>
      <li><a href="#contact" className="block hover:text-yellow-400">Contact</a></li>
    </ul>
  </div>
)}
      </div>
    </nav>
  );
}

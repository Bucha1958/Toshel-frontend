"use client";

import Link from "next/link";
import {
  FaXTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa6";
import { useState } from "react";

export default function Footer() {
  const [trackingEnabled, setTrackingEnabled] = useState(true);

  return (
    <>

      {/* Footer Section */}
      <footer className="bg-[#0a0f2c] text-white py-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6 text-center md:text-left">
          {/* Company Info */}
          <div>
            <h2 className="text-4xl font-bold">Toshel</h2>
            <p className="text-blue-400 font-semibold">CONSTRUCTION</p>
            <p className="text-gray-400 mt-2">
              &copy; {new Date().getFullYear()} Toshel Construction.
            </p>
            <div className="mt-4 space-y-2 text-gray-400 text-sm">
              <Link href="#" className="hover:text-blue-300">
                Terms and Conditions
              </Link>{" "}
              |{" "}
              <Link href="#" className="hover:text-blue-300">
                Privacy Policy
              </Link>{" "}
              |{" "}
              <Link href="#" className="hover:text-blue-300">
                Cookie Policy
              </Link>{" "}
              |{" "}
              <Link href="#" className="hover:text-blue-300">
                Accessibility Statement
              </Link>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4 mt-4 text-blue-400">
              <a href="#" className="hover:text-blue-200">
                <FaXTwitter size={24} />
              </a>
              <a
                href="https://www.instagram.com/toshelconstruction042?igsh=MwhvNGt2NHd3azBtaA=="
                target="_blank"
                className="hover:text-blue-200"
              >
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-blue-200">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="hover:text-blue-200">
                <FaYoutube size={24} />
              </a>
              <a href="#" className="hover:text-blue-200">
                <FaTiktok size={24} />
              </a>
            </div>
          </div>

          {/* Tracking & Policies */}
          <div>
            <p className="text-gray-400 text-sm mt-2">
              Our website uses tracking technologies to learn how our visitors
              interact with our site so we can improve our services and provide
              valuable content.
            </p>
            <div className="mt-4 space-x-4">
              <button
                onClick={() => setTrackingEnabled(!trackingEnabled)}
                className="text-blue-400 hover:underline"
              >
                {trackingEnabled ? "Disable Tracking" : "Enable Tracking"}
              </button>
              <Link href="#" className="text-blue-400 hover:underline">
                Read our privacy policy
              </Link>
              <Link href="#" className="text-blue-400 hover:underline">
                Read our cookies policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-[#080c26] text-center py-4 mt-6 border-t border-gray-700">
          <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-lg">
            OK
          </button>
        </div>
      </footer>
    </>
  );
}

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Message Sent!");
    setMessage("");
  };

  const handleSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-4 sm:p-8 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-[url('/contact-bg.jpg')] bg-cover bg-center opacity-10"
        ></motion.div>

        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6 relative z-10">
          Get in Touch
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 relative z-10">
          {/* Contact Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              required
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Send size={20} /> Send Message
            </button>
          </form>

          {/* Contact Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Mail className="text-blue-600" />
              <p>contact@toshelltd.com</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-blue-600" />
              <p>+1 (234) 567-890</p>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-blue-600" />
              <p>
                Port Harcourt - Enugu Expy, Independence Layout Phase II, Enugu,
                Nigeria 400102
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg text-center shadow-md relative z-10">
          <h3 className="text-xl font-semibold text-gray-800">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-gray-600 mb-4">
            Stay updated with our latest news and offers.
          </p>
          {!subscribed ? (
            <form
              className="flex flex-col sm:flex-row items-center gap-2 justify-center"
              onSubmit={handleSubscription}
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="p-3 w-full sm:w-64 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="p-3 w-full sm:w-auto bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <p className="text-green-600 font-semibold">
              Thank you for subscribing!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

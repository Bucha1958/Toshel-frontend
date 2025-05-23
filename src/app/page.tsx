// src/app/page.tsx

"use client";

import Hero from "./components/Hero";
import Feature from "./components/Feature";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Vision from "./components/Vision";
import Contact from "./components/Contact";
import Team from "./components/Team";
import Testimonial from "./components/Testimonial";


export default function HomePage() {
  return (
    <>
      <Hero />
      <Feature />
      <Services />
      <Projects />
      <Vision />
      <Contact />
      <Team />
      <Testimonial />
    </>
  );
}

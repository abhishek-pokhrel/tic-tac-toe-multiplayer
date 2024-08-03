import React from "react";
import Navbar from "./Navbar/Navbar";
import Hero from "./Hero";
import Analytics from "./Analytics";


const IntroPage = () => {
  return (
    <div className="intro-page">
      <Navbar />
      <Hero />
      <Analytics />
    </div>
  );
};

export default IntroPage;

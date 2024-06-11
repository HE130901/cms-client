"use client";

import HeaderHome from "@/components/header/Header";
import CallHotline from "@/components/home/call-hotline";
import Hero from "@/components/home/hero";
import Information from "@/components/home/information";

// app/page.tsx

const Home = () => {
  return (
    <div>
      <HeaderHome />
      <CallHotline />
      <Hero />
      <Information />
    </div>
  );
};

export default Home;

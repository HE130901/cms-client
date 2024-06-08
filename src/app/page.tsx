"use client";

import HeaderHome from "@/components/header/Header";
import Hero from "@/components/home/hero";
import Information from "@/components/home/information";

// app/page.tsx

const Home = () => {
  return (
    <div>
      <HeaderHome />
      <Hero />
      <Information />
      <Hero />
    </div>
  );
};

export default Home;

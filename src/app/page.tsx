"use client";

import ClientFeedback from "@/components/home/ClientFeedback";
import Hero from "@/components/home/hero";
import Information from "@/components/home/information";

// app/page.tsx

const Home = () => {
  return (
    <div>
      <Hero />
      <Information />
      <ClientFeedback />s
    </div>
  );
};

export default Home;

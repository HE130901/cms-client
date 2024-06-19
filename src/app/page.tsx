"use client";

import Footer from "@/components/footer/footer";
import ClientFeedback from "@/components/home/ClientFeedback";
import Hero from "@/components/home/hero";
import Information from "@/components/home/information";

import React, { useState, useEffect } from "react";
import Loading from "@/components/ui/Loading";
// app/page.tsx

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Hero />
      <Information />
      <ClientFeedback />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;

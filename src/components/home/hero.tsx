"use client";

import { Button, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import videoSrc from "@/assets/videos/video.mp4";

function Hero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute z-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Lớp phủ mờ */}
      <div className="absolute inset-0 h-full w-full bg-black/40"></div>

      {/* Nội dung */}
      <div className="grid min-h-screen px-8">
        <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
          {/* Lớp nền trong suốt */}
          <motion.div
            className="flex flex-col items-center rounded-lg p-8 md:p-12 bg-white/20 backdrop-blur-sm shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <Image
              alt="ABV"
              src={logo}
              height={300}
              width={400}
              className="rounded-lg"
            />
            <motion.p className="mt-4 mb-12 w-full text-white md:max-w-full lg:max-w-2xl text-xl md:text-2xl lg:text-3xl leading-snug tracking-wide text-shadow-md text-center gradient-text pt-2">
              <span className="font-bold">
                "Nơi an nghỉ cuối cùng
                <br /> bình yên và trang trọng"
              </span>
            </motion.p>

            <motion.div className="flex items-center gap-4">
              <Link href="/booking">
                <Button
                  variant="gradient"
                  className="shadow-lg hover:shadow-xl rounded-full px-8 py-4 text-sm md:text-base lg:text-lg animate-bounce bg-red-500 hover:bg-red-600"
                  size="lg"
                  placeholder="Button Placeholder"
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                >
                  Đặt chỗ ngay
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

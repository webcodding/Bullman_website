"use client";
import React, { useEffect, useRef } from "react";

export default function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden font-mada">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/video/hero-video.mp4"
        autoPlay
        muted={true}
        loop
        playsInline
      ></video>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-end stm:items-center justify-center h-full text-white bg-black bg-opacity-30 px-10">
        <div className="text-left mt-40">
          <h1 className="text-[50px] stm:text-[24px] font-bold text-left leading-tight">
            Prix Justes et
          </h1>
          <h1 className="text-[50px] stm:text-[24px]  font-bold  text-left leading-tight">
            Accessible
          </h1>
          <div className="text-[24px] stm:text-[18px] text-left tracking-1 font-medium">
            <p className="mx-1">Découvrez une large</p>
            <p className="mx-1">gamme d'équipements premium,</p>
            <p className="mx-1">développés en France</p>
            <p className="mx-1">par des passionnés</p>
          </div>

          <div className="flex flex-row stm:flex-wrap justify-between stm:justify-center items-center mt-4">
            <button className="px-6 stm:px-2 my-1 py-[10px] stm:py-[5px] bg-navyBlue hover:bg-darkSlate text-white border border-black mr-2 text-[13px] stm:text-[10px] uppercase">
              BEST-SELLERS
            </button>
            <button className="px-6 stm:px-2 my-1 py-[10px] stm:py-[5px] bg-navyBlue hover:bg-darkSlate text-white border border-black mr-2 text-[13px] stm:text-[10px] uppercase">
              Concept 2
            </button>
            <button className="px-6 stm:px-2 my-1 py-[10px] stm:py-[5px] bg-navyBlue hover:bg-darkSlate text-white border border-black mr-2 text-[13px] stm:text-[10px] uppercase">
              NOS RÉALISATIONS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

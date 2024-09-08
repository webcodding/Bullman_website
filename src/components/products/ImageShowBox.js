"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function ImageShowBox({ images }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex + 4 < images.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="flex flex-row mlg:flex-col mlg:items-center bg-[#f9f9f9] px-6 mlg:px-1 py-5">
      <div className="mtl:hidden relative dmd:w-[420px] dmd:h-[300px] smd:w-[420px] smd:h-[300px] sm:w-[420px] sm:h-[300px] xsm:w-[220px] xsm:h-[120px] mb-5 px-10 mlg:px-2">
        <Image
          src={selectedImage}
          alt="Selected"
          layout="fill"
          objectFit="contain"
          className="w-[743px] h-[550px] mlg:w-[420px] mlg:h-[300px]"
        />
      </div>
      <div className="flex flex-col mlg:flex-row items-center justify-center pr-10 mlg:pr-0 mlg:px-5">
        <button onClick={handlePrev} className="mb-2 mlg:mb-0">
          <i className="mlg:hidden fa-solid fa-arrow-up-long text-gray-800 text-[12px] "></i>
          <i className="mtl:hidden fa-solid fa-arrow-left-long text-gray-800 text-[12px] "></i>
        </button>
        {images.slice(startIndex, startIndex + 4).map((item, index) => (
          <Image
            src={item}
            key={index}
            layout="resposive"
            objectFit="contain"
            width={80}
            height={80}
            className="w-[80px] h-[80px] mlg:w-[50px] mlg:h-[50px] mlg:mx-1 object-contain my-1 cursor-pointer hover:opacity-60"
            onClick={() => setSelectedImage(item)}
          />
        ))}
        <button onClick={handleNext} className="mt-2 mlg:mt-0">
          <i className="mlg:hidden fa-solid fa-arrow-down-long text-gray-800 text-[12px] "></i>
          <i className="mtl:hidden fa-solid fa-arrow-right-long text-gray-800 text-[12px] "></i>
        </button>
      </div>
      <div className="mlg:hidden relative w-[753px] nxlg:w-[550px] h-[560px] nxlg:h-[460px] mb-5 px-10">
        <Image
          src={selectedImage}
          alt="Selected"
          layout="fill"
          objectFit="contain"
          className="w-[743px] h-[550px]"
        />
      </div>
    </div>
  );
}

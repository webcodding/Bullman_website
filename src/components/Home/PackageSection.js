"use client";
import React, { useEffect, useState, useRef } from "react";
import Headings from "@/utils/Headings";
import Link from "next/link";

export default function PackageSection({ packs }) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(4);

  const timeoutRef = useRef(null);

  // Duplicate the first 4 items and append them to the end

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 20000);

    return () => {
      resetTimeout();
    };
  }, [current]);

  useEffect(() => {
    // Update itemsToShow based on the screen size
    const handleResize = () => {
      if (window.innerWidth <= 450) {
        setItemsToShow(1);
      } else if (window.innerWidth <= 650) {
        setItemsToShow(2);
      } else if (window.innerWidth <= 767) {
        setItemsToShow(3);
      } else {
        setItemsToShow(4); // Default to 4 for larger screens
      }
    };

    handleResize(); // Call once to set initial value
    window.addEventListener("resize", handleResize); // Add event listener

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);

  const prevSlide = () => {
    setCurrent((prevCurrent) =>
      prevCurrent === 0 ? packs.length - 1 : prevCurrent - 1
    );
  };

  const nextSlide = () => {
    if (current === packs.length) {
      // If we are at the duplicate slide, instantly jump back to the start
      setCurrent(0);
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 20); // This small delay allows the jump to happen seamlessly
    } else {
      setCurrent((prevCurrent) => prevCurrent + 1);
    }
  };

  return (
    <div className="flex flex-col items-start w-full mb-10">
      <Headings title={"NOS PACKS"} />
      <div className="relative w-full overflow-hidden mt-[-3rem]">
        <div
          className={`flex transition-transform duration-500 ${
            isTransitioning ? "transition-none" : ""
          }`}
          style={{
            transform: `translateX(-${current * (100 / itemsToShow)}%)`,
          }} // Adjust to move one card at a time
        >
          {packs.length > 0 &&
            packs.map((pkg, index) => (
              <Link
                href={{
                  pathname: `/package-shop`,
                  query: {
                    pkg: JSON.stringify({ name: pkg.name, id: pkg.id }),
                  },
                }}
                key={index}
                className={`flex-shrink-0 p-4 mx-2`} // Add mx-2 for horizontal margin
                style={{ width: `calc((100% / ${itemsToShow}) - 16px)` }} // Adjust width considering margin
              >
                <div className="flex flex-col">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="transition-transform w-[347px] h-[300px] duration-300 transform hover:scale-105 object-cover "
                  />
                  <div className="text-left mt-[15px] ml-0">
                    <h3 className="text-[14px] font-medium">{pkg.name}</h3>
                    <p className="text-[15px] font-bold text-gray-700">
                      {pkg.price_total} €
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        {/* Arrows */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 rounded-full"
          onClick={prevSlide}
        >
          <i className="fa-solid fa-arrow-left-long text-gray-300 text-[28px]"></i>
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 rounded-full"
          onClick={nextSlide}
        >
          <i className="fa-solid fa-arrow-right-long text-gray-300 text-[28px]"></i>
        </button>
      </div>
    </div>
  );
}

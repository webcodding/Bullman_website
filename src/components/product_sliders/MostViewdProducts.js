"use client";
import { fetchFromBackend } from "@/utils/api";
import Headings from "@/utils/Headings";
import ProductImageCard from "@/utils/ProductImageCard";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function MostViewdProducts() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [products, setProducts] = useState([]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const mostViewedProducts = await fetchFromBackend(
        "/most-viewed-products"
      );
      setProducts(mostViewedProducts);
      // console.log("Shop by Categories:", shopByCategoriesData);
    };

    fetchData();
  }, []);

  const extendedProducts = [...products, ...products.slice(0, itemsToShow)];

  const prevSlide = () => {
    setCurrent((prevCurrent) =>
      prevCurrent === 0 ? products.length - 1 : prevCurrent - 1
    );
  };

  const nextSlide = () => {
    if (current === products.length) {
      setCurrent(0);
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 20);
    } else {
      setCurrent((prevCurrent) => prevCurrent + 1);
    }
  };

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

  return (
    <div className="flex flex-col items-start w-full mb-10">
      <div className="flex flex-row items-center justify-between w-full">
        <Headings
          style={{ borderBottom: "none" }}
          title={"PRODUITS LES PLUS CONSULTÉS"}
          className={"stm:text-[16px] stm:mx-0 stm:mr-3 stm:tracking-tight"}
        />
        {/* Arrow Buttons */}
        <div className="flex flex-row items-center mr-5">
          <button
            className="px-2 py-[6px] mr-2 bg-white shadow-md "
            onClick={prevSlide}
          >
            <i className="fa-solid fa-arrow-left-long text-gray-500 text-[20px] "></i>
          </button>
          <button
            className="px-2 py-[6px] bg-white shadow-md"
            onClick={nextSlide}
          >
            <i className="fa-solid fa-arrow-right-long text-gray-500 text-[20px]"></i>
          </button>
        </div>
      </div>
      <div className="relative w-full overflow-hidden mt-[-3rem]">
        <div
          className={`flex transition-transform duration-500 ${
            isTransitioning ? "transition-none" : ""
          }`}
          style={{
            transform: `translateX(-${current * (100 / itemsToShow)}%)`,
          }} // Adjust to move one card at a time
        >
          {extendedProducts.map((item, index) => (
            <Link
              key={index}
              href={{
                pathname: `/shop`,
                query: { p: JSON.stringify({ name: item.name, id: item.id }) },
              }}
              className={`flex-shrink-0 p-4 mx-2`}
              style={{ width: `calc((100% / ${itemsToShow}) - 16px)` }}
            >
              {" "}
              <ProductImageCard
                primaryImg1={item.image}
                name={item.name}
                category={item.category}
                price={item.price}
                product={item}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";
import { fetchFromBackend } from "@/utils/api";
import SmallProductImageCard from "@/utils/SmallProductImageCard";
import React, { useEffect, useRef, useState } from "react";

export default function CartProductSlider() {
  const [products, setProducts] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      const bestSellerProducts = await fetchFromBackend(
        `/best-seller-products`
      );
      if (bestSellerProducts) {
        setProducts(bestSellerProducts);
      }

      //console.log(bestSellerProducts);
    };

    fetchData();
  }, []);

  if (!products || products.length === 0) {
    return null;
  }

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
  return (
    <div className="flex flex-col items-start w-full mb-10">
      {/* Top content */}
      <div className="flex flex-row items-center justify-between bg-navyBlue text-white py-1 px-[10px] w-full my-16">
        <p className="uppercase font-bold text-[20px]">Best Seller</p>
        <div className="flex flex-row items-center justify-center">
          <img
            src="/icons/arrow-left.svg"
            onClick={prevSlide}
            className="filter-white mr-1"
          />
          <img
            src="/icons/arrow-right.svg"
            onClick={nextSlide}
            className="filter-white ml-1"
          />
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
              className="w-1/4 flex-shrink-0 p-4"
              style={{ width: `calc((100% / ${itemsToShow}) - 16px)` }}
            >
              {" "}
              <SmallProductImageCard
                primaryImg1={item.image1}
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

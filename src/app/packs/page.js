"use client";
import { fetchFromBackend } from "@/utils/api";
import Breadcrumb from "@/utils/Breadcrumb";
import Pagination from "@/utils/Pagination";
import ProductImageCard from "@/utils/ProductImageCard";
import Link from "next/link";
import Slider from "rc-slider";
import React, { useEffect, useState } from "react";

export default function Packs() {
  const [packs, setPacks] = useState([]);
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [weightRange, setWeightRange] = useState([0, 200]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const price = `${priceRange[0]}-${priceRange[1]}`;
  const weight = `${weightRange[0]}-${weightRange[1]}`;

  useEffect(() => {
    const fetchData = async () => {
      const packsData = await fetchFromBackend(
        `/our/packs/price/${price}/weight/${weight}`
      );
      setPacks(packsData);
      console.log(packsData);
      setProducts(packsData.products);
      setPriceRange([0, packsData.filters.max_price]);
      setWeightRange([0, packsData.filters.max_weight]);
      setLoading(false);
      console.log("Packs:", packsData);
      console.log("Products:", products);
    };

    fetchData();
  }, []);

  const handleWeightChange = (range) => {
    setWeightRange(range);
  };

  const handleWeightAfterChange = (range) => {
    setWeightRange(range);
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
  };

  const handlePriceAfterChange = (range) => {
    setPriceRange(range);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading && !products.length > 0) {
    return (
      <div className="mt-10 px-16">
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 px-16">
      <Breadcrumb slug={"Packs"} />
      <div className="flex flex-row items-start mt-5">
        {/* ----- Left side contents -------- */}
        <div className="w-[350px]">
          {/* Price Filter */}
          <div className="mb-10 w-[263px]">
            <div className="flex flex-row items-center justify-between  text-[#000] pb-[3px] border-b-2 border-b-[#313537] mb-[30px]">
              <p className="text-[18px] uppercase font-semibold">Prix</p>
              <i className="fa-solid fa-chevron-down text-[9px] font-[900]"></i>
            </div>
            <p className="py-[13px] text-[14px] text-[#333] font-medium">
              {priceRange[0]} € - {priceRange[1]} €
            </p>
            <Slider
              range
              min={0}
              max={packs?.filters.max_price}
              defaultValue={priceRange}
              onChange={handlePriceChange}
              onChangeComplete={handlePriceAfterChange}
            />
          </div>
          {/* Poids Filter */}
          <div className="mb-5 w-[263px]">
            <div className="flex flex-row items-center justify-between  text-[#000] pb-[3px] border-b-2 border-b-[#313537] mb-[30px]">
              <p className="text-[18px] uppercase font-semibold">Poids</p>
              <i className="fa-solid fa-chevron-down text-[9px] font-[900]"></i>
            </div>
            <p className="py-[13px] text-[14px] text-[#333] font-medium">
              {weightRange[0]}kg - {weightRange[1]}kg
            </p>
            <Slider
              range
              min={0}
              max={packs?.filters.max_weight}
              defaultValue={weightRange}
              onChange={handleWeightChange}
              onChangeComplete={handleWeightAfterChange}
            />
          </div>
        </div>
        {/*------------------------------------ */}
        {/* ----- Right side contents -------- */}
        <div className="ml-16 flex flex-col w-full">
          {/* products */}
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-4 px-3 w-full mt-5">
                {products.map((item, index) => (
                  <Link
                    href={{
                      pathname: `/package-shop`,
                      query: {
                        pkg: JSON.stringify({ name: item.name, id: item.id }),
                      },
                    }}
                    key={index}
                  >
                    <ProductImageCard
                      product={item}
                      primaryImg1={item.image}
                      //primaryImg2={item.image2 && item.image2}
                      name={item.name}
                      price={item.price_total}
                    />
                  </Link>
                ))}
              </div>
              {/* Pagination */}
              <div className="flex flex-row justify-end mb-10 w-full">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div className="w-full z-20">
              <p className="text-center mt-10 text-[18px] text-[#333]">
                No Products with this filter
              </p>
            </div>
          )}
        </div>
        {/* ------------------------------------ */}
      </div>
    </div>
  );
}

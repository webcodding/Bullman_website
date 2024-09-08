"use client";
import { fetchFromBackend } from "@/utils/api";
import Breadcrumb from "@/utils/Breadcrumb";
import Pagination from "@/utils/Pagination";
import ProductImageCard from "@/utils/ProductImageCard";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function SearchFilter({ searchParams }) {
  const query = searchParams?.terms || null;
  const limitOptions = [12, 24, 36, 48];
  const defaultLimit = limitOptions[0];
  const [noProducts, setNoProducts] = useState(false);
  const [searchProducts, setSearchProducts] = useState([]);
  const [showSorts, setShowSorts] = useState(false);
  const [showLimits, setShowLimits] = useState(false);
  const [sorts, setSorts] = useState([
    "Nom, A à Z",
    "Nom, Z à A",
    "Prix, croissant",
    "Prix, décroissant",
  ]);
  const [selectedSort, setSelectedSort] = useState(sorts[0]);
  const [selectedLimit, setSelectedLimit] = useState(defaultLimit);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSearchData = async () => {
      if (query) {
        const searchData = await fetchFromBackend(`/search/product/${query}`);
        setSearchProducts(searchData || []);
        setTotalPages(Math.ceil(searchData.length / selectedLimit));
      }
    };

    const debounceFetch = setTimeout(fetchSearchData, 1500);

    return () => clearTimeout(debounceFetch);
  }, [query, selectedLimit]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchProducts.length === 0) {
        setNoProducts(true);
      }
    }, 10000); // 8 seconds

    return () => clearTimeout(timer);
  }, [searchProducts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortClick = (sort) => {
    setSelectedSort(sort);
    setShowSorts(false);
  };

  const handleLimitClick = (limit) => {
    setSelectedLimit(limit);
    setShowLimits(false);
    setCurrentPage(1); // Reset to the first page whenever the limit is changed
  };

  // Calculate the start and end indices for slicing the products array
  const startIndex = (currentPage - 1) * selectedLimit;
  const endIndex = startIndex + selectedLimit;

  // Sort products based on selectedSort
  const sortedProducts = [...searchProducts].sort((a, b) => {
    switch (selectedSort) {
      case "Nom, A à Z":
        return a.name.localeCompare(b.name);
      case "Nom, Z à A":
        return b.name.localeCompare(a.name);
      case "Prix, croissant":
        return a.price - b.price;
      case "Prix, décroissant":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  // Slice the sorted products array to get the current products for the page
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  return (
    <div className="mt-8 stm:mt-12 px-20">
      <Breadcrumb slug={` Résultats de recherche pour "${query}"`} />
      <p className="mt-5 text-[24px] text-[#414141] font-medium uppercase">
        Résultats de recherche pour "{query}": {query}
      </p>

      {/* top filters */}
      <div className="flex flex-row stm:flex-wrap items-start justify-start">
        {/* Sort Filter */}
        <div className="relative">
          <div
            className="bg-white flex flex-row items-center justify-between border border-[#dfdfd] px-3 py-[5px] text-[16px] text-[#414141] cursor-pointer"
            onClick={() => {
              setShowSorts((prevOpen) => !prevOpen);
              setShowLimits(false);
            }}
          >
            <p>Sort by: {selectedSort}</p>
            <i className="fa-solid fa-chevron-down text-[10px] text-[#414141] ml-3 "></i>
          </div>
          {showSorts && (
            <div className="bg-[#f8f8f8] shadow-md text-[16px] text-[#414141] absolute top-10 w-[250px] left-0 z-30">
              {sorts.map((item, index) => (
                <p
                  key={index}
                  onClick={() => handleSortClick(item)}
                  className="hover:bg-darkSlate hover:text-white py-3 px-4 cursor-pointer"
                >
                  {item}
                </p>
              ))}
            </div>
          )}
        </div>
        {/* Limit filter */}
        <div className="ml-5 relative">
          <div
            className="bg-white flex flex-row items-center justify-between border border-[#dfdfd] px-3 py-[5px] text-[16px] text-[#414141] w-[155px] cursor-pointer"
            onClick={() => {
              setShowLimits((prevOpen) => !prevOpen);
              setShowSorts(false);
            }}
          >
            <p>Per Page: {selectedLimit}</p>
            <i className="fa-solid fa-chevron-down text-[10px] text-[#414141] ml-3 "></i>
          </div>
          {showLimits && (
            <div className="bg-[#f8f8f8] shadow-md text-[16px] text-[#414141] absolute top-10 w-[250px] left-0 z-30">
              {limitOptions.map((item, index) => (
                <p
                  key={index}
                  className="hover:bg-darkSlate hover:text-white py-3 px-4 cursor-pointer"
                  onClick={() => handleLimitClick(item)}
                >
                  {item}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products */}
      {currentProducts.length > 0 ? (
        <div className="grid grid-cols-4 xmd:grid-cols-3 md:grid-cols-2 smd:grid-cols-2 sm:grid-cols-1 xsm:grid-cols-1 gap-3 px-4 py-3 w-full mt-3">
          {currentProducts.map((item, index) => (
            <Link
              key={index}
              href={{
                pathname: `/shop`,
                query: {
                  p: JSON.stringify({ name: item.name, id: item.id }),
                },
              }}
            >
              <ProductImageCard
                product={item}
                primaryImg1={item.image}
                name={item.name}
                price={item.price}
              />
            </Link>
          ))}
        </div>
      ) : noProducts || searchProducts === null ? (
        <div className="flex items-center justify-center  p-10">
          <p className="text-gray-500 text-[20px]">No products found</p>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-10 p-10">
          <i className="fa-solid fa-rotate text-[30px] text-gray-400 animate-spin"></i>
        </div>
      )}
      <div className="flex flex-row justify-end mb-10 w-full">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

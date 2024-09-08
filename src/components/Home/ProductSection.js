"use client";
import { fetchFromBackend } from "@/utils/api";
import Headings from "@/utils/Headings";
import ProductImageCard from "@/utils/ProductImageCard";
import React, { useEffect, useState } from "react";

export default function ProductSection() {
  const [allProducts, setAllProducts] = useState([]);
  const [bestId, setBestId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const bestSellerId = await fetchFromBackend("/best-seller-category-id");
      setBestId(bestSellerId);
      // console.log("Shop by Categories:", shopByCategoriesData);
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const bestSellerProducts = await fetchFromBackend(
        `/categories/${bestId}`
      );
      setAllProducts(bestSellerProducts?.products);
      //console.log(bestSellerProducts);
    };

    fetchData();
  }, [bestId]);

  if (allProducts.length > 0) {
    // console.log(allProducts);
    // const keyName = Math.random();
    return (
      <div className="flex flex-col items-start w-full mb-10">
        <div className="flex flex-row stm:flex-col justify-between items-center w-full pr-10">
          <Headings title={"NOTRE SÉLECTION"} />
          <div className="stm:flex-col flex flex-row items-center stm:items-start">
            <a
              href="#"
              className="bg-[#31559317] border-b-2 border-[#315593] p-[10px] mx-1 nmd:mx-0 stm:mx-0 text-[16px] nmd:text-[10px] hover:border-b-2 stm:border-b hover:border-[#315593] stm:w-full text-left stm:border-b-[#000]"
            >
              BEST-SELLERS
            </a>
            <a
              href="#"
              className="p-[10px] mx-1 nmd:mx-0 stm:mx-0 text-[16px] nmd:text-[10px] hover:border-b-2 stm:border-b hover:border-[#315593] stm:w-full text-left stm:border-b-[#000]"
            >
              DISQUES
            </a>
            <a
              href="#"
              className="p-[10px] mx-1 nmd:mx-0 stm:mx-0 text-[16px] nmd:text-[10px] hover:border-b-2  stm:border-b hover:border-[#315593] stm:w-full text-left stm:border-b-[#000]"
            >
              HALTÈRES & KETTLEBELLS
            </a>
            <a
              href="#"
              className="p-[10px] mx-1 nmd:mx-0 stm:mx-0 text-[16px] nmd:text-[10px] hover:border-b-2 stm:border-b hover:border-[#315593] stm:w-full text-left stm:border-b-[#000]"
            >
              MACHINES & ERGOS
            </a>
            <a
              href="#"
              className="p-[10px] mx-1 nmd:mx-0 stm:mx-0 text-[16px] nmd:text-[10px] hover:border-b-2 stm:border-b hover:border-[#315593] stm:w-full text-left stm:border-b-[#000]"
            >
              BARRES
            </a>
            <a
              href="#"
              className="p-[10px] mx-1 nmd:mx-0 stm:mx-0 text-[16px] nmd:text-[10px] hover:border-b-2 stm:border-b hover:border-[#315593] stm:w-full text-left stm:border-b-[#000]"
            >
              LIVRAISON OFFERTE
            </a>
          </div>
        </div>
        <div className="flex flex-row w-full items-center justify-center">
          <div className="grid grid-cols-4 dmd:grid-cols-2 stm:grid-cols-1 gap-4 items-center px-8">
            {allProducts.map((item, index) => (
              <ProductImageCard
                key={item._id}
                primaryImg1={item.primaryImg1}
                primaryImg2={item.primaryImg2}
                name={item.name}
                category={item.category}
                price={item.price}
                product={item}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <p className="text-center my-3 mx-5">Loading...</p>;
  }
}

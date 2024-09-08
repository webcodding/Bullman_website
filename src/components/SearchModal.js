import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function SearchModal({ searchProducts, onclick, searchQuery }) {
  const [noProducts, setNoProducts] = useState(false);
  const [maxProducts, setMaxProducts] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchProducts.length === 0) {
        setNoProducts(true);
      }
    }, 10000); // 8 seconds

    return () => clearTimeout(timer);
  }, [searchProducts]);

  useEffect(() => {
    const updateMaxProducts = () => {
      const width = window.innerWidth;
      if (width >= 1450) {
        setMaxProducts(10); // large devices
      } else if (width >= 1124) {
        setMaxProducts(8);
      } else if (width >= 768) {
        setMaxProducts(5); // medium devices
      } else {
        setMaxProducts(1); // small devices
      }
    };

    updateMaxProducts(); // initial check
    window.addEventListener("resize", updateMaxProducts); // update on resize

    return () => window.removeEventListener("resize", updateMaxProducts);
  }, []);

  return (
    <div className="absolute bg-[rgb(0,0,0,0.3)] top-[110px] stm:top-[160px] w-full h-full pb-5 2xlg:px-24 bottom-5 text-black z-50">
      <i
        class="fa-solid fa-xmark text-white text-[30px] opacity-85 absolute right-5"
        onClick={onclick}
      ></i>

      {searchProducts.length > 0 ? (
        <div className="bg-white px-5 py-3 overflow-y-auto">
          <p className="border-b border-b-[#efefef] font-[401] font-mada text-[20px] pb-3">
            Produits
            <span className="text-white bg-[#ccc] text-[.8em] py-[3px] px-[10px] rounded-[20px] ml-3">
              {searchProducts.length}
            </span>
          </p>
          <div className="relative flex flex-row flex-wrap items-center justify-center">
            {searchProducts.slice(0, maxProducts).map((item, index) => (
              <Link
                key={index}
                href={{
                  pathname: `/shop`,
                  query: {
                    p: JSON.stringify({
                      name: item.name,
                      id: item.id,
                    }),
                  },
                }}
                onClick={onclick}
                className="mx-2 my-2 w-[200px] h-[200px] p-5 hover:bg-[#ecebeb] flex flex-col items-center justify-center text-center"
              >
                <Image src={item.image} width={100} height={100} />
                <p className="text-[14px] stm:text-[10px] font-medium mt-3">
                  {item.name}
                </p>
                <p className="text-[14px] stm:text-[10px] font-medium">
                  {item.price}
                </p>
              </Link>
            ))}
          </div>
          <Link
            href={{ pathname: "/search-filter", query: { terms: searchQuery } }}
            className="flex flex-row justify-center cursor-pointer"
            onClick={onclick}
          >
            <p className="border text-[#222] text-[10px] px-10 py-1 hover:bg-[#ecebeb]">
              Montrer tous les résultats »
            </p>
          </Link>
        </div>
      ) : noProducts || searchProducts === null ? (
        <div className="flex items-center justify-center bg-white p-10">
          <p className="text-gray-500 text-[20px]">No products found</p>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-10 bg-white p-10">
          <i className="fa-solid fa-rotate text-[30px] text-gray-400 animate-spin"></i>
        </div>
      )}
    </div>
  );
}

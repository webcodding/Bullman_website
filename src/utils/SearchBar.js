import React, { useEffect, useState } from "react";

export default function SearchBar({ value, onChange, searchProducts }) {
  const [noProducts, setNoProducts] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchProducts.length === 0) {
        setNoProducts(true);
      }
    }, 8000); // 8 seconds

    return () => clearTimeout(timer);
  }, [searchProducts]);
  return (
    <div className=" flex flex-row items-center justify-between px-5 h-[45px] border-[0.5px] border-[#636363]  rounded-[25px] mx-3 stm:mx-0 dmd:mx-0">
      <input
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className="text-white bg-black border-0 focus:outline-none placeholder-gray-400"
      />
      {noProducts || searchProducts === null ? null : value !== "" &&
        searchProducts.length === 0 ? (
        <>
          {/* rotate icon */}
          <i class="fa-solid fa-rotate text-[20px] text-gray-400 animate-spin"></i>
        </>
      ) : (
        <>
          {/* search icon */}
          <i className="fa-solid fa-magnifying-glass text-[20px]"></i>
        </>
      )}
    </div>
  );
}

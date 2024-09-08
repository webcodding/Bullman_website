"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function SmallProductImageCard({
  product,
  primaryImg1,
  primaryImg2,
  name,
  price,
}) {
  const [hoverPosition, setHoverPosition] = useState(null);

  const handleMouseMove = (e) => {
    if (primaryImg2) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;

      setHoverPosition(x < width / 2 ? "left" : "right");
    }
  };

  const handleMouseLeave = () => {
    setHoverPosition(null);
  };
  const truncateName = (name) => {
    const words = name.split(" ");
    if (words.length > 1) {
      const firstWord = words[0];
      const secondWord =
        words[1].length > 7 ? words[1].substring(0, 7) + "..." : words[1];
      return `${firstWord} ${secondWord}`;
    }
    return name;
  };

  return (
    <Link
      href={{
        pathname: `/shop`,
        query: { product: JSON.stringify(product) },
      }}
      className="mb-10 w-[101px] h-[186px]"
    >
      {/* image card */}
      <div
        className={`relative group overflow-hidden  ${
          primaryImg2 ? "" : "hover:scale-105 transition-transform duration-300"
        }`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={
            hoverPosition === "right" && primaryImg2 ? primaryImg2 : primaryImg1
          }
          alt="Product"
          className={`w-full h-auto mb-3 transition-transform duration-300 ${
            primaryImg2 ? "" : "group-hover:scale-110"
          }`}
        />
        {primaryImg2 && (
          <div
            className={`absolute bottom-0 left-0 w-full flex ${
              hoverPosition === "left" || hoverPosition === "right"
                ? "w-full h-1 bg-gray-300"
                : ""
            }`}
          >
            <div
              className={`transition-all duration-300 ${
                hoverPosition === "left"
                  ? "w-1/2 h-1 bg-gray-400"
                  : "w-1/2 h-1 "
              }`}
            ></div>
            <div
              className={`transition-all duration-300 ${
                hoverPosition === "right"
                  ? "w-1/2 h-1 bg-gray-400"
                  : "w-1/2 h-1 "
              }`}
            ></div>
          </div>
        )}
      </div>
      {/* ----- */}
      <h3 className="text-[.85em] text-wrap font-medium mt-5">
        {truncateName(name)}
      </h3>
      <p className="text-[15px] font-bold">{price} €</p>
    </Link>
  );
}

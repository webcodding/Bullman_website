import { categoryImage } from "@/config";
import Headings from "@/utils/Headings";
import Link from "next/link";
import React from "react";

export default function CategorySection({ shopByCategories }) {
  return (
    <div className="flex flex-col items-start w-full mb-10">
      <Headings title={"ACHETEZ PAR CATÉGORIES"} />
      <div className="flex flex-row w-full items-center justify-center">
        <div className="grid grid-cols-4 nmd:grid-cols-3 stm:grid-cols-1 gap-0 items-center px-8">
          {shopByCategories.length > 0 &&
            shopByCategories.map((item, index) => (
              <Link
                href={{
                  pathname: `/filter`,
                  query: { category: JSON.stringify(item) },
                }}
                key={index}
              >
                <img src={item.image} className="w-[364px] h-[318px]" />
                <p className="text-[16px] font-mada font-bold uppercase text-center">
                  {item.name}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

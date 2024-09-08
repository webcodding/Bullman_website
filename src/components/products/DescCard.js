import Image from "next/image";
import React from "react";

export default function DescCard({ image, title, desc }) {
  return (
    <div className="flex flex-col h-[580px]">
      <Image
        className="w-[403px] h-[403px]"
        src={image}
        width={403}
        height={403}
      />
      <p className="font-semibold text-[16px] underline uppercase text-inherit leading-[28px] my-3">
        {title}
      </p>
      <p className="font-semibold text-[16px] text-inherit leading-[28px]">
        {desc}
      </p>
    </div>
  );
}

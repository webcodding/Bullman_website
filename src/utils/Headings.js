import React from "react";

export default function Headings({ title, style, className }) {
  return (
    <div
      className={`text-[#000] leading-[1.5em] tracking-[3px] font-bold font-mada uppercase border-b-2 border-black pb-[4px] text-left my-10 mt-16 mx-8 text-[24px] ${
        className && className
      }`}
      style={style && style}
    >
      {title}
    </div>
  );
}

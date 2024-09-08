"use client";
import React from "react";

export default function Button({ onclick, title }) {
  return (
    <button
      className="bg-navyBlue border-2 text-[12px] font-medium tracking-[.1em] py-[8px] px-[2em] border-black hover:bg-darkSlate text-white uppercase"
      onClick={onclick}
    >
      {title}
    </button>
  );
}

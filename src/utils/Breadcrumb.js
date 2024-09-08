import React from "react";

export default function ({ slug }) {
  return (
    <div className=" mt-[20px] flex flex-row items-start justify-start text-[.75em] font-medium">
      <a href="/">Accueil </a>{" "}
      <i className="fa-solid fa-arrow-right-long pt-[2px] px-3"></i> {slug}
    </div>
  );
}

import React from "react";

const Specifications = ({ specs }) => {
  return (
    <div className="mt-5 font-mada">
      <h2 className="text-[18px] font-medium pb-3 border-b border-[#e9e9e9]">
        SPECIFICATIONS
      </h2>
      <div className="flex flex-col">
        {Object.entries(specs).map(([key, value], subIndex) => (
          <div
            //key={`${index}-${subIndex}`}
            className="border-b border-[#e9e9e9] grid grid-cols-2 gap-0 text-left py-1"
          >
            <p className="font-bold text-[14px]">{key.replace(/_/g, " ")}</p>
            <p className="text-left font-medium text-[14px] ">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specifications;

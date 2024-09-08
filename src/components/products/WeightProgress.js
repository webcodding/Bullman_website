import React from "react";

export default function WeightProgress({ currentWeight, maxWeight }) {
  // console.log(currentWeight);
  //  const maxWeight = 200;
  const percentage = (currentWeight / maxWeight) * 100;

  return (
    <div className="my-4">
      <h2 className="text-[16px] font-medium text-[#7a7a7a]">
        Poids manquant pour la réduction
      </h2>
      <div className="text-blue-600 font-bold text-2xl mt-4">
        {currentWeight} Kgs
      </div>
      <div className="relative w-full h-4 bg-gray-300 rounded-[2px] mt-4">
        <div
          className="h-full bg-[#255ca6] rounded-[2px] transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
        {/* Percentages with borders except for -8% */}
        {[2, 4, 6, 8].map((value, index, arr) => (
          <React.Fragment key={value}>
            {value !== 8 && (
              <div
                className="absolute top-0 h-full border-l border-black"
                style={{ left: `${(value / arr[arr.length - 1]) * 100}%` }}
              ></div>
            )}
            <div
              className="absolute top-full mt-1 ml-[-10px] text-[15px] font-bold text-[#255ca6]"
              style={{
                left: `${(value / arr[arr.length - 1]) * 100}%`,
                transform: "translateX(-50%)",
              }}
            >
              -{value}%
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

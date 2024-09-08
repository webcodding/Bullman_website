import { achievement } from "@/config";
import Breadcrumb from "@/utils/Breadcrumb";
import React from "react";

export default function page() {
  return (
    <div className="mt-[55px]  ">
      <div className="ml-[70px]">
        <Breadcrumb slug={"NOS RÉALISATIONS"} />
      </div>

      <div className=" mt-24 grid 2xlg:grid-cols-4 grid-cols-3 nsm:grid-cols-2  2xlg:px-64 px-20 nsm:px-3 ">
        {achievement.map((item, index) => (
          <div key={index} className=" flex items-center justify-center my-5 ">
            {
              <img
                src={item}
                className=" w-44 h-40 nsm:w-[7rem] nsm:h-[6rem] rounded-[15px] shadow-lg"
              />
            }{" "}
          </div>
        ))}
      </div>
    </div>
  );
}

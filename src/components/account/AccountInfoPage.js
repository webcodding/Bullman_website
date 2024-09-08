"use client";
import { information } from "@/config";
import AuthContext from "@/context/AuthContext";
import React, { useContext } from "react";

export default function AccountInfoPage() {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <p className="mt-28 flex flex-row items-center justify-center text-[1.563em] font-medium tracking-wider ">
        VOTRE COMPTE
      </p>
      <div className=" grid grid-cols-3 nmd:grid-cols-2 nsm:grid-cols-1 gap-3 items-center justify-center mt-5  px-16">
        {information.map((item, index) => (
          <>
            <div
              className=" flex flex-col items-center justify-center py-6 "
              key={index}
            >
              <div className="text-[50px]">{item.image}</div>
              <p className="">{item.title}</p>
            </div>
          </>
        ))}
      </div>
      <div className="flex flex-row items-center justify-center py-20  ">
        <button
          className="px-6 py-[5px] bg-navyBlue hover:bg-darkSlate text-white border border-black text-[13px] uppercase"
          onClick={() => logout()}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}

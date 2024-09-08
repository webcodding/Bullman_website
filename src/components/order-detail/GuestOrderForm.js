import Breadcrumb from "@/utils/Breadcrumb";
import Button from "@/utils/Button";
import React, { useState } from "react";

export default function GuestOrderForm({ setShowForm }) {
  return (
    <div className="mt-12 px-20 mlg:mt-20 mlg:px-5">
      <Breadcrumb slug={"Suivi de commande invité"} />

      <p className="mt-4 flex flex-row items-start justify-start text-[1.563em] font-medium tracking-[.1em] uppercase ">
        Suivi des commandes des invités
      </p>
      {/* form */}
      <p className="mt-7 flex flex-row font-[500] items-start justify-start text-[16px] ">
        Pour suivre votre commande, veuillez entrer les informations suivantes :
      </p>
      <div className="flex flex-col mt-6 ">
        <div className="flex flex-row mlg:flex-wrap ">
          <p className=" text-[#414141] text-[1.063rem] pr-40  mt-3 font-[500]  ">
            Référence de commande :
          </p>
          <input
            className="p-[14px] w-[700px] border placeholder:text-right placeholder:italic placeholder:text-[.875rem] "
            placeholder="Par exemple : QIIXJJXNUI ou QIIXJJXNUI#1"
          />
        </div>
        <div className="flex flex-row mlg:flex-wrap mt-5 ">
          <p className=" text-[#414141] text-[1.063rem] pr-[295px]  mt-3 font-[500]  ">
            E-mail:
          </p>
          <input className="p-[14px] w-[700px] border" />
        </div>
      </div>
      <div className="mt-5 flex flex-row justify-center w-full ">
        <Button
          title={"Envoyer"}
          onclick={() => setShowForm((prevOpen) => !prevOpen)}
        />
      </div>
    </div>
  );
}

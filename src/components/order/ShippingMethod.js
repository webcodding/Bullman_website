// ShippingMethod.js
import Button from "@/utils/Button";
import React, { useState } from "react";

export default function ShippingMethod({
  onContinue,
  totalProductWeight,
  totalPackWeight,
  shippingCharge,
  setShippingCharge,
  shippingMethod,
  setShippingMethod,
}) {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const handleTitleChange = (e) => {
    //setTitle(e.target.value);
    setShippingMethod(e.target.value);
  };

  return (
    <div>
      <label className="flex items-center  w-full border-b pb-5 mb-1">
        <input
          type="radio"
          name="title"
          value="gls"
          checked={shippingMethod === "gls"}
          onChange={handleTitleChange}
          className="radio-custom "
        />
        <div className="flex flex-row nlg:flex-wrap items-center w-full nsm:w-1/2 mx-12 nsm:mx-3 nsm:text-[11px] text-[#414141] font-medium text-[15px]">
          <img
            src="/img/GLS.png"
            alt=""
            className="w-[40px] h-[40px] mr-10 object-cover"
          />
          <p className="w-[190px] mr-16 nsm:mr-0">GLS</p>
          <p className="w-[180px] mr-24 nsm:mr-0">45 rue Délizy, Pantin</p>
          {/* <p className=" text-[1.063rem]">gratuit</p> */}
        </div>
      </label>
      <label className="flex items-center  w-full border-b pb-5 mb-1">
        <input
          type="radio"
          name="title"
          value="dachser"
          checked={shippingMethod === "dachser"}
          onChange={handleTitleChange}
          className="radio-custom"
        />
        <div className="flex flex-row nlg:flex-wrap items-center w-full nsm:w-1/2 mx-12 nsm:mx-3 nsm:text-[11px] text-[#414141] font-medium">
          <img
            src="/img/Dachser.png"
            alt=""
            className="w-[40px] h-[40px] mr-10 object-contain"
          />
          <p className="w-[190px] mr-16 nsm:mr-0">DACHSER</p>
          <p className="w-[180px] mr-24 nsm:mr-0">Point Relais 24-72h</p>
          {/* <p className=" text-[1.063rem]">6,88 € TTC</p> */}
        </div>
      </label>
      {totalPackWeight < 20 && totalProductWeight < 80 ? (
        <label className="flex items-center w-full border-b pb-5 mb-1">
          <input
            type="radio"
            name="title"
            value="dpd shop"
            checked={shippingMethod === "dpd shop"}
            onChange={handleTitleChange}
            className="radio-custom"
          />
          <div className="flex flex-row nlg:flex-wrap items-center w-full nsm:w-1/2 mx-12 nsm:mx-3 nsm:text-[11px] text-[#414141] font-medium">
            <img
              src="/img/ship-img-2.webp"
              alt=""
              className="w-[40px] h-[40px] mr-10"
            />
            <p className="w-[190px] mr-16 nsm:mr-0">DPD SHOP COLLECT</p>
            <p className="w-[180px] mr-24 nsm:mr-0">2-3 jours</p>
            {/* <p className=" text-[1.063rem]"> 9,60 € TTC</p> */}
          </div>
        </label>
      ) : null}

      {title === "dpd shop" ? (
        <>
          <p className="text-[#414141] text-[1.063rem] my-2">
            Enter your mobile number, you will be notified by SMS during Home
            delivery (Express)
          </p>
          <input className="p-3.5 border border-gray-300 w-full placeholder-transparent" />
        </>
      ) : null}
      <p className="text-[#414141] text-[1.063rem] my-2">
        If you would like to add a comment to your order, please write it in the
        field below.
      </p>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="p-3.5 border border-gray-300 w-full placeholder-transparent"
      />
      <div className="flex flex-row justify-end my-2">
        <Button title={"Continue"} onclick={onContinue} />
      </div>
    </div>
  );
}

"use client";
import {
  footerAccountLinks,
  footerInfoLinks,
  paymentCardImg,
  topFooterElements,
} from "@/config";
import React, { useState } from "react";

export default function Footer() {
  const [emailBody, setEmailBody] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace spaces and special characters with URL encoded equivalents
    const body = encodeURIComponent(emailBody);
    // Trigger mailto link
    window.location.href = `mailto:humairasultana059@gmail.com?body=${body}`;
  };

  return (
    <div className=" bg-black py-5 flex flex-col text-white font-mada z-20 ">
      {/* Top Footer */}
      <div className="flex flex-row nmd:flex-wrap smd:flex-col sm:flex-col xsm:flex-col items-center justify-between px-24 mlg:px-5 py-2 pb-4 border-b border-[#363636] mb-3">
        {topFooterElements.map((item, index) => (
          <a
            href={item.link}
            key={index}
            className="flex flex-col items-center cursor-pointer mx-3"
          >
            <img src={item.image} alt="" className="w-[56px] h-[58px] mb-3 " />
            <p className="text-[14px] uppercase mb-2">{item.title}</p>
            <p className="text-[12px] text-[#7a7a7a]">{item.desc}</p>
          </a>
        ))}
      </div>
      {/* -------------------- */}
      {/* Middle content */}
      <div className="flex flex-row nmd:flex-wrap smd:flex-col sm:flex-col xsm:flex-col items-start px-24 mlg:px-10">
        {/* Information */}
        <div className="flex flex-col mx-3">
          <p className="text-[17px] font-bold uppercase my-2 tracking-[2px]">
            Information
          </p>
          {footerInfoLinks.map((item, index) => (
            <a
              href={item.link}
              key={index}
              className="text-[14px] my-2 font-medium hover:text-[#7a7a7a]"
            >
              {item.title}
            </a>
          ))}
        </div>
        {/* Account */}
        <div className="flex flex-col mx-32 stm:mx-0">
          <p className="text-[17px] font-bold uppercase my-2 tracking-[2px]">
            MON COMPTE
          </p>
          {footerAccountLinks.map((item, index) => (
            <a
              href={item.link}
              key={index}
              className="text-[14px] my-2 font-medium hover:text-fade "
            >
              {item.title}
            </a>
          ))}
        </div>
        {/* Conatact Info */}
        <div className="flex flex-col mx-8 nsm:mx-0">
          <p className="text-[17px] font-bold uppercase my-2 tracking-[2px]">
            Contact
          </p>
          <div className="flex flex-row items-center my-2">
            <i className="fa-regular fa-envelope text-[18px] text-fade mr-2"></i>
            <a
              href="/contactez-nous"
              className="text-[14px] font-medium cursor-pointer"
            >
              contact@bullman.fr
            </a>
          </div>
          <div className="flex flex-row items-center my-2">
            <i className="fa-brands fa-whatsapp text-[18px] text-fade mr-2"></i>
            <a href="/contactez-nous" className="text-[14px] font-medium">
              bullman_team
            </a>
          </div>
          <div className="flex flex-row items-center my-2">
            <i className="fa-solid fa-phone text-[18px] text-fade mr-2"></i>
            <a href="/contactez-nous" className="text-[14px] font-medium">
              +33 1 87 66 45 30
            </a>
          </div>
        </div>
        {/* Social Media */}
        <div className="flex flex-col  ml-24 nlg:ml-0">
          <p className="text-[17px] font-bold uppercase my-2 tracking-[2px]">
            SUIVEZ-NOUS
          </p>
          {/* email */}
          <form
            onSubmit={handleSubmit}
            className="border border-white rounded-[25px] px-5 w-[420px] nsm:w-[230px] py-2 flex flex-row items-center justify-between"
          >
            <input
              type="text"
              placeholder="E-mail"
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              className="text-white w-[320px] xsm:w-[260px] bg-black border-0 focus:outline-none placeholder-gray-400"
            />
            <button type="submit">
              <i className="fa-solid fa-arrow-right-long text-fade"></i>
            </button>
          </form>
          <div className=" flex flex-row items-center mt-10 ">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/bullman.france" // Instagram profile link
              target="_blank" // Opens the link in a new tab
              rel="noopener noreferrer"
              className="border-[4px] border-white px-[16px] py-3 mx-[2px]  hover:bg-gray-900"
            >
              <i className="fa-brands fa-instagram text-[22px] "></i>
            </a>
            {/* Whats app */}
            <a
              href="https://wa.me/33666284497" // WhatsApp link with the number
              target="_blank" // Opens the link in a new tab
              rel="noopener noreferrer"
              className="border-[4px] border-white px-[16px] py-3 mx-[2px] hover:bg-green-500"
            >
              <i className="fa-brands fa-whatsapp text-[22px] "></i>
            </a>
            {/* LinkedIn */}
            {/* <div className="border-[4px] border-white px-[16px] py-3 mx-[2px] hover:bg-blue-600">
              <i className="fa-brands fa-linkedin-in text-[22px] "></i>
            </div> */}
          </div>
        </div>
      </div>
      {/* -------------------- */}
      {/* Bottom content */}
      <div className="grid grid-cols-3 nxlg:grid-cols-1 nxlg:justify-center nxlg:items-center  gap-5 px-24 mt-16">
        <div className="text-[#a7a7a7] text-[14px] ml-10 nxlg:text-center">
          © 2020-2023 Bullman Equipment. All Rights Reserved.
        </div>
        <div className="text-[#d4d4d4] ml-10 text-[13px] font-medium tracking-[2px] nxlg:text-center">
          PAIEMENT 100% SÉCURISÉ
        </div>
        <div className="flex flex-row items-center nxlg:justify-center">
          {paymentCardImg.map((item, index) => (
            <img
              src={item.image}
              key={index}
              className="w-[30px] h-[24px] mx-2 xsm:w-[22px] xsm:h-[20px] "
            />
          ))}
          <img
            src="/img/payment-card-8.webp"
            className="w-[70px] h-[16px] xsm:w-[50px] xsm:h-[14px] mx-2 "
          />
        </div>
      </div>
      {/* -------------------- */}
    </div>
  );
}

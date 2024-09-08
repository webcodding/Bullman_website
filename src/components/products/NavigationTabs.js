import React, { useState } from "react";
import DescCard from "./DescCard";
import replaceImgWithNextImage from "@/utils/parseHtmlWithNextImage";

export default function NavigationTabs({
  desc,
  garantie,
  expedition,
  payment,
  slug,
  descCard,
}) {
  const [activeTab, setActiveTab] = useState("description");

  const Description = (
    <div className="" dangerouslySetInnerHTML={{ __html: desc }} />
  );
  const Garantie = (
    <div className="" dangerouslySetInnerHTML={{ __html: garantie }} />
  );
  const Expedition = (
    <div className="" dangerouslySetInnerHTML={{ __html: expedition }} />
  );
  const Payment = (
    <div className="" dangerouslySetInnerHTML={{ __html: payment }} />
  );

  return (
    <div className=" w-auto 2xlg:w-[850px] dlg:w-[650px]">
      <div className="flex">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-[15px] font-semibold border-b-[3.5px] hover:border-[#315593] py-2 text-center ${
            activeTab === "description"
              ? "border-b-[3.5px] border-[#315593] text-[#333]"
              : "text-[#333] border-transparent"
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("garantie")}
          className={`px-[15px] font-semibold border-b-[3.5px] hover:border-[#315593] py-2 text-center ${
            activeTab === "garantie"
              ? "border-b-[3.5px] border-[#315593] text-[#333]"
              : "text-[#333] border-transparent"
          }`}
        >
          Garantie BULLMAN
        </button>
        <button
          onClick={() => setActiveTab("expedition")}
          className={`px-[15px] font-semibold border-b-[3.5px] hover:border-[#315593] py-2 text-center ${
            activeTab === "expedition"
              ? "border-b-[3.5px] border-[#315593] text-[#333]"
              : "text-[#333] border-transparent"
          }`}
        >
          Expédition
        </button>
        <button
          onClick={() => setActiveTab("payment")}
          className={`px-[15px] font-semibold border-b-[3.5px] hover:border-[#315593] py-2 text-center ${
            activeTab === "payment"
              ? "border-b-[3.5px] border-[#315593] text-[#333]"
              : "text-[#333] border-transparent"
          }`}
        >
          Paiement sécurisé
        </button>
      </div>
      {/* tab-contents */}
      <div className="py-4">
        {activeTab === "description" && (
          <div>
            <h2 className="text-[16px] font-semibold mb-2 uppercase">{slug}</h2>
            {Description}
          </div>
        )}
        {activeTab === "garantie" && (
          <div>
            <h2 className="text-[16px] font-semibold mb-2 uppercase">
              GARANTIE À VIE
            </h2>
            {Garantie}
          </div>
        )}
        {activeTab === "expedition" && (
          <div>
            <h2 className="text-[16px] font-semibold mb-2 uppercase">
              Expédition
            </h2>
            {Expedition}
          </div>
        )}
        {activeTab === "payment" && (
          <div>
            <h2 className="text-[16px] font-semibold mb-2 uppercase">
              Paiement sécurisé
            </h2>
            {Payment}
          </div>
        )}
      </div>
    </div>
  );
}

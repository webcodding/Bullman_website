"use client";
import React, { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import Addresses from "./Address";
import ShippingMethod from "./ShippingMethod";
import Payment from "./Payment";

export default function CheckoutBox({
  description,
  setDescription,
  handlePaymentSubmit,
  personalInfo,
  setPersonalInfo,
  loginInfo,
  setLoginInfo,
  allAddress,
  setAllAddress,
  totalProductWeight,
  totalPackWeight,
  shippingCharge,
  setShippingCharge,
  shippingMethod,
  setShippingMethod,
  paymentMethod,
  setPaymentMethod,
}) {
  const [activeTab, setActiveTab] = useState(null);
  const [enabledTabs, setEnabledTabs] = useState({
    personalInfo: true,
    addresses: false,
    shippingMethod: false,
    payment: false,
  });

  //const user = JSON.parse(localStorage.getItem("user"));

  const handleContinue = (currentTab) => {
    switch (currentTab) {
      case "personalInfo":
        setEnabledTabs((prev) => ({ ...prev, addresses: true }));
        setActiveTab("addresses");
        break;
      case "addresses":
        setEnabledTabs((prev) => ({ ...prev, shippingMethod: true }));
        setActiveTab("shippingMethod");
        break;
      case "shippingMethod":
        setEnabledTabs((prev) => ({ ...prev, payment: true }));
        setActiveTab("payment");
        break;
      default:
        break;
    }
  };
  //console.log(personalInfo);

  const renderContent = (tab) => {
    switch (tab) {
      case "personalInfo":
        return (
          <PersonalInfo
            onContinue={() => handleContinue("personalInfo")}
            enabledTabs={enabledTabs}
            setEnabledTabs={setEnabledTabs}
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
            loginInfo={loginInfo}
            setLoginInfo={setLoginInfo}
          />
        );
      case "addresses":
        return (
          <Addresses
            onContinue={() => handleContinue("addresses")}
            enabledTabs={enabledTabs}
            setEnabledTabs={setEnabledTabs}
            allAddress={allAddress}
            setAllAddress={setAllAddress}
          />
        );
      case "shippingMethod":
        return (
          <ShippingMethod
            onContinue={() => handleContinue("shippingMethod")}
            enabledTabs={enabledTabs}
            setEnabledTabs={setEnabledTabs}
            totalProductWeight={totalProductWeight}
            totalPackWeight={totalPackWeight}
            shippingCharge={shippingCharge}
            setShippingCharge={setShippingCharge}
            shippingMethod={shippingMethod}
            setShippingMethod={setShippingMethod}
          />
        );
      case "payment":
        return (
          <Payment
            description={description}
            setDescription={setDescription}
            handlePaymentSubmit={handlePaymentSubmit}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className="flex flex-col items-start w-full">
      <button
        onClick={() =>
          setActiveTab(
            activeTab === "personalInfo" && enabledTabs.personalInfo
              ? null
              : "personalInfo"
          )
        }
        className={`py-2 px-4 text-[#313537] cursor-pointer text-left text-[19px] uppercase border-b border-b-[#f0f0f0] font-medium w-full pb-[15px] mb-[25px] ${
          activeTab === "personalInfo" ? "" : ""
        } `}
      >
        1. INFORMATIONS PERSONNELLES
      </button>
      {activeTab === "personalInfo" && (
        <div className=" p-4 bg-white w-full">
          {renderContent("personalInfo")}
        </div>
      )}

      <button
        disabled={!enabledTabs.addresses}
        onClick={() =>
          setActiveTab(
            activeTab === "addresses" && enabledTabs.addresses
              ? null
              : "addresses"
          )
        }
        className={`py-2 px-4 text-[#313537] cursor-pointer text-left text-[19px] uppercase border-b border-b-[#f0f0f0] font-medium w-full pb-[15px] mb-[25px] ${
          activeTab === "addresses" ? "" : ""
        } `}
      >
        2. ADRESSES
      </button>
      {activeTab === "addresses" && (
        <div className="p-4 bg-white w-full">{renderContent("addresses")}</div>
      )}

      <button
        disabled={!enabledTabs.shippingMethod}
        onClick={() =>
          setActiveTab(
            activeTab === "shippingMethod" && enabledTabs.shippingMethod
              ? null
              : "shippingMethod"
          )
        }
        className={`py-2 px-4 text-[#313537] cursor-pointer text-left text-[19px] uppercase border-b border-b-[#f0f0f0] font-medium w-full pb-[15px] mb-[25px]${
          activeTab === "shippingMethod" ? "" : ""
        } `}
      >
        3. MÉTHODE D'EXPÉDITION
      </button>
      {activeTab === "shippingMethod" && (
        <div className="p-4 bg-white w-full">
          {renderContent("shippingMethod")}
        </div>
      )}

      <button
        disabled={!enabledTabs.payment}
        onClick={() =>
          setActiveTab(
            activeTab === "payment" && enabledTabs.payment ? null : "payment"
          )
        }
        className={`py-2 px-4 text-[#313537] cursor-pointer text-left text-[19px] uppercase border-b border-b-[#f0f0f0] font-medium w-full pb-[15px] mb-[25px]${
          activeTab === "payment" ? "" : ""
        } `}
      >
        4. PAIEMENT
      </button>
      {activeTab === "payment" && (
        <div className="p-4 bg-white w-full">{renderContent("payment")}</div>
      )}
    </div>
  );
}

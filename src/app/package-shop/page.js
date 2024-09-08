"use client";
import ImageShowBox from "@/components/packages/ImageShowBox";
import ProductSection from "@/components/packages/ProductSection";
import BestSellerProducts from "@/components/product_sliders/BestSellerProducts";
import MostViewdProducts from "@/components/product_sliders/MostViewdProducts";
import NavigationTabs from "@/components/products/NavigationTabs";
import Specifications from "@/components/products/Specification";
import { fetchFromBackend } from "@/utils/api";
import Breadcrumb from "@/utils/Breadcrumb";
import React, { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function Packages({ searchParams }) {
  const pack = JSON.parse(searchParams?.pkg) || null;
  const packId = pack?.id || "";

  const slug = pack?.name || "";

  const [packDetails, setPackDetails] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [desc, setDesc] = useState(null);
  const [guarantyTxt, setGuarantyTxt] = useState(null);
  const [shippingTxt, setShippingTxt] = useState(null);
  const [paymentTxt, setPaymentTxt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (packId !== "") {
        const detail = await fetchFromBackend(`/pack/${packId}`);
        setPackDetails(detail);
        setAllProducts(detail.pack_details);
        setDesc(detail.description);
        setGuarantyTxt(detail.guarantee_text);
        setShippingTxt(detail.shipping_text);
        setPaymentTxt(detail.payment_text);
        setLoading(false);
        // console.log(detail);
      }
    };

    fetchData();
  }, [packId]);

  if (
    loading &&
    !packDetails &&
    !desc &&
    !guarantyTxt &&
    !shippingTxt &&
    !paymentTxt
  ) {
    return (
      <div className="mt-10 px-16">
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // console.log(packDetails);
  const parseWeight = (poids) => {
    const weightMatch = poids.match(/(\d+(\.\d+)?)/);
    return weightMatch ? parseFloat(weightMatch[0]) : 0;
  };

  return (
    <main className="px-20 bg-white dlg:px-7 mlg:px-5">
      <Breadcrumb slug={slug} />
      {/* --------- Main --------- */}
      <div className="flex flex-row mlg:flex-wrap mlg:justify-center w-full mt-10">
        {/* Left Contents */}
        <div className="flex flex-col mr-10 mlg:mr-0">
          {/* Image show box */}
          <ImageShowBox images={packDetails.image} />
          {/* description */}
          <div className="mt-2 mb-20 stm:hidden">
            <NavigationTabs
              slug={slug}
              desc={desc}
              garantie={guarantyTxt}
              expedition={shippingTxt}
              payment={paymentTxt}
            />
          </div>
        </div>
        {/* ----Right Contents--- */}
        <div className="flex flex-col">
          <h1 className="uppercase text-[33px] font-medium leading-[1.2em]">
            {slug}
          </h1>
          {/* products  */}
          <ProductSection
            products={allProducts}
            pack={packDetails}
            packId={packId}
            packImg={packDetails.image}
          />

          {/* pricing section */}
          {/* <PricingSection product={Product.products} /> */}
          {/* extra content  */}
          <div className="flex flex-row items-center text-[#333] text-[14px] my-2 cursor-pointer">
            <i className="fa-solid fa-list mr-2"></i>
            <p>ajoutez à la liste d'envie</p>
          </div>
          {/* banner img */}
          <img src="/products/info-banner.webp" className="my-3" />
          {/* small icons */}
          <div className="flex flex-row stm:flex-col items-center text-[#333] text-[11px] stm:text-[14px] font-bold uppercase">
            <div className="flex flex-row stm:flex-col items-center mr-5 stm:my-3 ">
              <img
                src="/icons/expedition-icon.webp"
                className="w-[30px] h-[26px] stm:w-[70px] stm:h-[60px] object-contain mr-2"
              />
              <p className="">EXPÉDITION</p>
            </div>
            <div className="flex flex-row stm:flex-col items-center mr-5 stm:my-3 ">
              <img
                src="/icons/satisfait-icon.webp"
                className="w-[30px] h-[26px] stm:w-[70px] stm:h-[60px] object-contain mr-2"
              />
              <p className="">SATISFAIT OU REMBOURSÉ</p>
            </div>
            <div className="flex flex-row stm:flex-col items-center mr-5 stm:my-3 ">
              <img
                src="/icons/payment-icon.webp"
                className="w-[30px] h-[26px] stm:w-[70px] stm:h-[60px] object-contain mr-2"
              />
              <p className="">PAIEMENT SÉCURISÉ</p>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------------- */}
      {/* PRODUITS LES PLUS CONSULTÉS */}
      <MostViewdProducts />
      {/* MEILLEURES VENTES */}
      <BestSellerProducts />
    </main>
  );
}

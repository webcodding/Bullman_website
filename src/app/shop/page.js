"use client";
import BestSellerProducts from "@/components/product_sliders/BestSellerProducts";
import MostViewdProducts from "@/components/product_sliders/MostViewdProducts";
import ImageShowBox from "@/components/products/ImageShowBox";
import NavigationTabs from "@/components/products/NavigationTabs";
import PricingSection from "@/components/products/PricingSection";
import Specifications from "@/components/products/Specification";
import { productsExtraInfo } from "@/config";
import { fetchFromBackend } from "@/utils/api";
import Breadcrumb from "@/utils/Breadcrumb";
import React, { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function ProductDetail({ searchParams }) {
  // console.log(p);
  const Product = JSON.parse(searchParams?.p) || null;
  const slug = Product.name || "";
  const id = Product.id || "";
  // console.log(Product);

  const [productDetail, setProductDetail] = useState(null);
  const [variants, setVariants] = useState(null);
  const [specification, setSpecification] = useState(null);
  const [extraImg, setExtraImg] = useState(null);
  const [desc, setDesc] = useState(null);
  const [guarantyTxt, setGuarantyTxt] = useState(null);
  const [shippingTxt, setShippingTxt] = useState(null);
  const [paymentTxt, setPaymentTxt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id !== "") {
        const detail = await fetchFromBackend(`/product/${id}`);
        setProductDetail(detail);
        setExtraImg(detail.extra_images);
        setVariants(
          detail.variant_id ? detail.variant_id : detail.variant_details
        );
        setSpecification(detail.specifications);
        setDesc(detail.description);
        setGuarantyTxt(detail.guarantee_text);
        setShippingTxt(detail.shipping_text);
        setPaymentTxt(detail.payment_text);
        setLoading(false);
        //console.log(detail);
      }
    };

    fetchData();
  }, []);

  if (loading && !productDetail) {
    return (
      <div className="mt-10 px-16">
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="px-20 mt-10 stm:mt-14 bg-white mlg:px-5">
      <Breadcrumb slug={slug} />
      {/* --------- Main --------- */}
      <div className="flex flex-row mlg:flex-wrap w-full mt-10">
        {/* Left Contents */}
        <div className="flex flex-col mr-10 nxlg:mr-2 mlg:mr-0 ">
          {/* Image show box */}
          <ImageShowBox images={extraImg && extraImg} />
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
          <i className="text-[#0f0f0f] text-[11px] font-medium">
            expédié sous 48h
          </i>
          {/* pricing section */}
          <PricingSection variants={variants} product={productDetail} id={id} />
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
          {/* specification */}
          {specification && (
            <Specifications specs={specification && specification} />
          )}
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

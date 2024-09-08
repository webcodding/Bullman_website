"use client";
import CategorySection from "@/components/Home/CategorySection";
import HeroSection from "@/components/Home/HeroSection";
import PackageSection from "@/components/Home/PackageSection";
import ProductSection from "@/components/Home/ProductSection";
import { fetchFromBackend } from "@/utils/api";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [shopByCategories, setShopByCategories] = useState([]);
  const [packs, setPacks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const shopByCategoriesData = await fetchFromBackend(
        "/sections/shop_by_categories"
      );
      setShopByCategories(shopByCategoriesData);
      // console.log("Shop by Categories:", shopByCategoriesData);

      const packsData = await fetchFromBackend("/our/packs");
      setPacks(packsData.products);
      // console.log("Packs:", packsData);
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-start justify-start font-mada">
      <HeroSection />
      <CategorySection shopByCategories={shopByCategories} />
      {/* <ProductSection /> */}
      <PackageSection packs={packs} />
    </main>
  );
}

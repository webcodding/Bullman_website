import BestSellerProducts from "@/components/product_sliders/BestSellerProducts";
import MostViewdProducts from "@/components/product_sliders/MostViewdProducts";
import { products } from "@/config";
import Breadcrumb from "@/utils/Breadcrumb";

export default function contentLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col font-mada">
      {children}
      <div className="px-[70px] mlg:px-3">
        {/*PRODUITS LES PLUS CONSULTES */}
        <MostViewdProducts />
        {/* EILLEURES VENTES */}
        <BestSellerProducts />
      </div>
    </div>
  );
}

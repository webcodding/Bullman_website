import BestSellerProducts from "@/components/product_sliders/BestSellerProducts";
import MostViewdProducts from "@/components/product_sliders/MostViewdProducts";
import { information } from "@/config";
import Breadcrumb from "@/utils/Breadcrumb";

export default function Frais() {
  return (
    <main className="px-20 mt-10 mlg:mt-16 mlg:px-5">
      <Breadcrumb slug={"Frais de port"} />
      <p className="mt-4 flex flex-row items-start justify-start text-[1.563em] font-medium tracking-[.1em] uppercase ">
        Frais de port
      </p>
      <div className="flex flex-col items-start mt-7 ">
        <p className=" bg-white w-full text-[13px] font-semibold mb-3 ">
          Pour toute commande supérieure à 500,00€ nous vous offrons les frais
          de port;
        </p>
        <p className=" bg-white w-full text-[13px] mb-3  ">
          A l'exception des dalles, des racks, de certaines barres et des
          machines qui sont soumis à un forfait.
        </p>
        <p className=" bg-white w-full text-[13px] mb-3  ">
          Le transport dit "DOMICILE BULLMAN" est au choix de Bullman Equipment.
        </p>
        <p className=" bg-white w-full text-[13px] mb-3 ">
          Lorsque les produits sont en stock, nous expédions généralement sous
          48h.
        </p>
        <p className=" bg-white w-full text-[13px] mb-3 ">
          La participation aux frais de port est calculée en fonction du prix du
          panier, du poids et du transporteur sélectionné.
        </p>

        <p className=" bg-white w-full text-[13px] mt-4 mb-3 ">
          Règles spécifiques :
        </p>
        <p className=" bg-white w-full text-[13px] mb-3 ">
          -Les packs font l'objet d'un forfait de 59,90€TTC.
        </p>
        <p className=" bg-white w-full text-[13px] mb-3 ">
          -L'expédition de dalles fait l'objet d'un forfait peu importe la
          quantité : 59,90€ TTC.
        </p>
        <p className=" bg-white w-full text-[13px] mb-3 ">
          -Les machines font l'objet d'un forfait par machine de 59,90€.
        </p>
        <p className=" bg-white w-full text-[13px] mb-3 ">
          -L'expédition de racks est soumise à une surcharge de 59,90€ par
          commande.
        </p>
        <p className=" bg-white w-full text-[13px] mb-3 ">
          -Nos barres olympiques (sauf les barres d'haltères) font l'objet d'un
          forfait de 30€ TTC par barre pour les commandes en deçà de 500€.
        </p>
      </div>
      {/* PRODUITS LES PLUS CONSULTÉS */}
      <MostViewdProducts />
      {/* MEILLEURES VENTES */}
      <BestSellerProducts />
    </main>
  );
}

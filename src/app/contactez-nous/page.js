import Breadcrumb from "@/utils/Breadcrumb";
import React from "react";

export default function Contactez() {
  return (
    <main className="px-20 mlg:px-5 mt-10 xsm:mt-16 sm:mt-16">
      <Breadcrumb slug={"Contactez-Nous"} />
      <div className="grid grid-cols-3 dmd:grid-cols-2 stm:grid-cols-1 mt-20 mb-16 px-5">
        {/* Contact us */}
        <div>
          <h2 className="text-[#000] text-[28px] font-medium">
            Contactez-nous
          </h2>
          <p className="text-[#000] text-[18px] font-medium">
            contact@bullman.fr
          </p>
        </div>
        {/* Location */}
        <div className="stm:mt-3">
          <h2 className="text-[#000] text-[28px] font-medium">Localisation</h2>
          <p className="font-semibold text-[16px] mt-3">Siège :</p>
          <p className="font-[401] text-[15px]">
            47 Boulevard de Courcelles, 75008, Paris
          </p>
          <p className="font-semibold text-[16px] mt-4">
            Entrepôt (retrait sur place possible) :{" "}
          </p>
          <p className="font-[401] text-[15px]">
            45 rue Délizy, (lot 229), 93500, Pantin
            <br />
            Proche Mairie de Pantin.
          </p>
          <p className="font-semibold text-[16px] mt-4">Téléphone :</p>
          <p className="font-[401] text-[15px]">+33 1 87 66 45 30</p>

          <h2 className="text-[#000] text-[28px] font-medium mt-9">Horaires</h2>
          <p className="font-[401] text-[15px] mt-3">
            Lundi-Vendredi sur RDV 9h30-17h30
            <br />
            Samedi sur RDV 17:00 – 19:00
          </p>
        </div>
        {/* Image */}
        <div className="stm:mt-3 dmd:w-full dmd:mt-3">
          <img src="/img/contact-page-img.webp" className="" />
        </div>
      </div>
      {/* Google map */}

      <div className=" w-full my-14 px-10">
        <iframe
          src="https://maps.google.com/maps?q=45%20rue%20d%C3%A9lizy&amp;t=m&amp;z=13&amp;output=embed&amp;iwloc=near"
          loading="lazy"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          aria-label="45 rue délizy"
          className="w-full h-[300px]"
        ></iframe>
      </div>
    </main>
  );
}

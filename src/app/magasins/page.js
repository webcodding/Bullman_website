import { information } from "@/config";
import Breadcrumb from "@/utils/Breadcrumb";

export default function Magasins() {
  return (
    <main className="px-20 mlg:px-5 mt-10 xsm:mt-16 sm:mt-16">
      <Breadcrumb slug={"Nos magasins"} />
      <p className="mt-5 flex flex-row  items-start justify-start text-[1.563em] font-medium tracking-wider ">
        NOS MAGASINS
      </p>
      <div className="flex flex-row  mlg:flex-col my-28 px-28 mlg:px-0 pb-8 border-b-[1px] ">
        <img src="/img/show-room.webp" className=" h-[115px] w-[170px]" />
        <div className=" flex flex-col px-28 mlg:px-0 mlg:mt-5">
          <p className="text-[20px] font-semibold ">
            SHOWROOM BULLMAN EQUIPMENT
          </p>
          <p className=" italic pt-2 text-[1rem] font-medium ">
            45 rue Délizy <br />
            93500 Pantin
            <br />
            France
            <br />
          </p>
          <p className="text-[1rem] font-semibold ">À propos de et Contact</p>
        </div>
        <div className="flex flex-col leading-loose px-16 mlg:px-0 mlg:mt-5">
          <div className="border-l-[1px] pl-16 mlg:pl-0 ">
            Lun. 10h-17h30 (sur rdv) <br />
            Mar. 10h-17h30 (sur rdv) <br />
            Mer. 10h-17h30 (sur rdv)
            <br />
            Jeu. 10h-17h30 (sur rdv) <br />
            Ven. 10h-17h30 (sur rdv)
            <br />
            Sam. 15h-19h(sur rdv)
            <br />
            Dim. 12h-15h (sur rdv)
            <br />
          </div>
        </div>
      </div>
    </main>
  );
}

import Breadcrumb from "@/utils/Breadcrumb";

export default function Payment() {
  return (
    <main className="px-20 font-mada mlg:px-5 mt-10 xsm:mt-16 sm:mt-16">
      <Breadcrumb slug={"Paiement Sécurisé"} />
      <p className="mt-5 flex flex-row items-start justify-start text-[1.563em] font-medium tracking-wider uppercase ">
        Paiement Sécurisé
      </p>
      <div className="pt-4 text-[16px]  ">
        <p className="mb-6 font-sans text-lg bg-white font-[500]">
          Nous vous proposons un paiement sécurisé et crypté en SSL.
        </p>
        <p className="mb-6 font-sans text-lg bg-white font-normal">
          <strong className="font-semibold">Comptant&nbsp;</strong>:<br />
          - Cartes bancaires,
          <br />
          - Virement instantané,
          <br />- Apple Pay.
        </p>
        <p className="mb-16 font-sans text-lg bg-white font-normal">
          <strong className="font-semibold">En plusieurs fois</strong>&nbsp;:
          <br />
          - KLARNA 3x,
          <br />- KLARNA 10x.
        </p>
      </div>
    </main>
  );
}

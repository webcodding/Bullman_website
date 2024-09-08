import Breadcrumb from "@/utils/Breadcrumb";

export default function Page() {
  return (
    <main className="px-20 font-mada mb-20 mlg:px-5 mt-10 xsm:mt-16 sm:mt-16">
      <Breadcrumb slug={" Livraisons et retours"} />
      <p className="mt-5 flex flex-row items-start justify-start text-[1.563em] font-medium tracking-wider uppercase ">
        Livraisons et retours
      </p>
      <div className="pt-5 space-y-6 text-sm leading-normal font-sans">
        <div>
          <p className="font-semibold">Retour des produits défectueux :</p>
          <p>
            Si un client reçoit des produits présentant des défauts ou des
            non-conformités par rapport à leur commande, il peut les retourner
            dans les 15 jours suivant la notification du défaut. Pour ce faire,
            le client doit présenter la facture originale et conserver tous les
            éléments d'origine du produit. Le vendeur examinera le produit
            retourné et informera le client de ses options pour un remboursement
            ou un échange. Si le client choisit un produit de valeur supérieure
            en échange, il devra payer la différence. Tout échange ou retour
            doit être notifié par le client à Bullman Equipment par email à{" "}
            <a href="mailto:customerservice@bullmanequipment.com">
              customerservice@bullmanequipment.com
            </a>{" "}
            avec pour objet les mentions "retour" ou "échange" ainsi que le
            numéro de la commande.
          </p>
        </div>
        <div>
          <p className="font-semibold">Droit légal de rétractation :</p>
          <p>
            Si un client n'est pas satisfait des produits livrés, il peut les
            retourner dans les 15 jours suivant la réception, en présentant la
            facture originale. Le vendeur remboursera généralement dans les 15
            jours suivant la confirmation par e-mail du remboursement. Si le
            client souhaite annuler une commande après sa confirmation, il doit
            le faire au plus tard le jour ouvrable suivant, mais les frais de
            transport seront à sa charge. Tout échange ou retour doit être
            notifié par le client à Bullman Equipment par email à{" "}
            <a href="mailto:customerservice@bullmanequipment.com">
              customerservice@bullmanequipment.com
            </a>{" "}
            avec pour objet les mentions "retour" ou "échange" ainsi que le
            numéro de la commande.
          </p>
        </div>
        <div>
          <p className="font-semibold">
            Retour de produits offerts par un tiers :
          </p>
          <p>
            Le retour des produits offerts doit être effectué par la personne
            qui les a achetés, en présentant la facture originale. Pour être
            éligible au retour, les produits ne doivent pas avoir été utilisés
            ni lavés (sauf indication contraire), doivent conserver leurs
            caractéristiques d'origine, ne pas être endommagés, être complets,
            ne pas avoir été altérés et conserver l'étiquette d'identification,
            le cas échéant. Tout échange ou retour doit être notifié par le
            client à Bullman Equipment par email à{" "}
            <a href="mailto:customerservice@bullmanequipment.com">
              customerservice@bullmanequipment.com
            </a>{" "}
            avec pour objet les mentions "retour" ou "échange" ainsi que le
            numéro de la commande.
          </p>
        </div>
        <div>
          <p className="font-semibold">Retour de produits personnalisés :</p>
          <p>
            Les produits personnalisés ne peuvent pas être retournés. Ces
            conditions s'appliquent également aux retours pour insatisfaction.
          </p>
        </div>
        <div>
          <p className="font-semibold">Refus de retours :</p>
          <p>
            Le droit de retour ne s'applique que si les produits n'ont pas été
            utilisés ou lavés (sauf si le produit contient des informations
            contraires), s'ils conservent les caractéristiques d'origine, que
            l'emballage n'est pas endommagé (les emballages soigneusement
            ouverts ne seront pas considérés comme endommagés), s'ils sont
            complets (par exemple, les deux éléments d'une paire doivent être
            retournés), n'ont pas été altérés et conservent l'étiquette
            d'identification si le produit est étiqueté. Les produits
            personnalisés ne sont pas soumis à un retour.
          </p>
        </div>
        <div>
          <p className="font-semibold">Délais de remboursement :</p>
          <p>
            Nous remboursons sous 15 jours à compter de la date de réception du
            retour. Ce délai nous donne le temps de correctement inspecter les
            retours. Les remboursements sont effectués uniquement via le moyen
            de paiement sélectionné par le client lors de sa commande.
          </p>
        </div>
      </div>
    </main>
  );
}

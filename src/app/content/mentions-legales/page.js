import Breadcrumb from "@/utils/Breadcrumb";

export default function Page() {
  return (
    <main className="px-20 font-mada mlg:px-5 mt-10 xsm:mt-16 sm:mt-16">
      <Breadcrumb slug={"Mentions Légales "} />
      <p className="mt-5 flex flex-row items-start justify-start text-[1.563em] font-medium tracking-wider uppercase ">
        Mentions Légales
      </p>
      <div className="pt-4 space-y-6">
        <div>
          <p className="font-bold underline">Informations sur l'entreprise :</p>
          <p>
            Bullman Equipment
            <br />
            Adresse : 47 boulevard de Courcelles, 75008, Paris, France
            <br />
            E-mail :{" "}
            <a
              href="mailto:contact@bullmanequipment.com"
              className="text-blue-600 underline"
            >
              contact@bullmanequipment.com
            </a>
          </p>
        </div>
        <div>
          <p className="font-bold underline">Hébergement :</p>
          <p>
            Le site est hébergé par un prestataire tiers, dont les coordonnées
            sont les suivantes :<br />
            Nom : IONOS
            <br />
            Adresse : 7 place de la Gare, 57200 Sarreguemines
          </p>
        </div>
        <div>
          <p className="font-bold underline">Propriété intellectuelle :</p>
          <p>
            Le site et son contenu (textes, images, logos, etc.) sont la
            propriété exclusive de Bullman Equipment et sont protégés par les
            lois sur la propriété intellectuelle. Toute reproduction,
            distribution, modification ou utilisation non autorisée du site et
            de son contenu est strictement interdite.
          </p>
        </div>
        <div>
          <p className="font-bold underline">
            Collecte de données personnelles :
          </p>
          <p>
            Bullman Equipment collecte et utilise les données personnelles de
            ses clients conformément à sa politique de confidentialité
            disponible sur le site.
          </p>
        </div>
        <div>
          <p className="font-bold underline">Cookies :</p>
          <p>
            Le site utilise des cookies pour améliorer l'expérience utilisateur.
            Les utilisateurs peuvent désactiver les cookies dans les paramètres
            de leur navigateur.
          </p>
        </div>
        <div>
          <p className="font-bold underline">Liens hypertextes :</p>
          <p>
            Le site peut contenir des liens hypertextes vers des sites tiers.
            Bullman Equipment n'est pas responsable du contenu de ces sites ni
            des pratiques de confidentialité qui y sont appliquées.
          </p>
        </div>
        <div>
          <p className="font-bold underline">Limitation de responsabilité :</p>
          <p>
            Bullman Equipment ne peut être tenu responsable des dommages directs
            ou indirects résultant de l'utilisation du site ou de
            l'impossibilité de l'utiliser, ou de tout contenu, produit ou
            service disponible sur ou à partir du site.
          </p>
        </div>
        <div>
          <p className="font-bold underline">
            Loi applicable et juridiction compétente :
          </p>
          <p>
            Les présentes mentions légales sont régies par le droit français.
            Tout litige relatif à l'utilisation du site sera soumis à la
            compétence exclusive des tribunaux français.
          </p>
        </div>
      </div>
    </main>
  );
}

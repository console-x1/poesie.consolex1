import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '@/components/SiteChrome';

export const metadata: Metadata = {
  title: 'Droits & conditions de publication',
  description:
    'Droits des auteurs, autorisation de publication et règles de réutilisation des poèmes.',
  alternates: {
    canonical: '/conditions/',
  },
};

export default function ConditionsPage() {
  return (
    <main className="page-shell">
      <SiteHeader backHref="/" backLabel="Accueil" />

      <article className="legal-page">
        <p className="eyebrow">INFORMATIONS DU SITE</p>
        <h1>
          Droits &amp; conditions<span className="title-accent">.</span>
        </h1>
        <p className="legal-intro">
          Les textes publiés ici appartiennent à leurs auteurs. Cette page
          explique les règles de publication et de réutilisation des poésies.
        </p>

        <section className="legal-section">
          <h2>1. Responsable du site</h2>
          <p>
            Le site est un espace collectif de publication de poésies, administré
            par <strong>consolex1</strong>. Il est accessible à l’adresse{' '}
            <a href="https://poesie.consolex1.com">poesie.consolex1.com</a>.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Les auteurs conservent leurs droits</h2>
          <p>
            Chaque auteur reste titulaire des droits sur ses textes. Leur
            publication sur ce site ne transfère ni leur propriété ni leurs
            droits d’auteur au responsable du site.
          </p>
          <p>
            Tout les textes publiés sur le site sont protégés par les droits d’auteur. 
            La mention « Tous droits réservés » rappelle que la mise en ligne
            n’autorise pas, à elle seule, la copie, la republication,
            l’exploitation commerciale ou la modification d’un poème.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. Autorisation donnée pour publier un texte</h2>
          <p>
            En demandant la publication d’un texte, l’auteur accorde au site une
            autorisation non exclusive et gratuite, limitée à son hébergement
            et à son affichage sur poesie.consolex1.com. Le texte peut être
            reproduit sous la forme nécessaire à son affichage et à son
            fonctionnement sur le site.
          </p>
          <p>
            L’auteur autorise également l’utilisation de courts extraits pour
            présenter ou promouvoir le site, à condition que le nom d’auteur,
            le titre et un lien vers le texte soient indiqués. Le texte complet
            n’est pas autorisé à des fins promotionnelles par cette permission.
          </p>
          <p>
            Cette autorisation ne permet pas au site de vendre un poème, de
            céder les droits de l’auteur ou de modifier son contenu. Une
            correction ou une adaptation du texte nécessite l’accord de l’auteur.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Engagement de l’auteur</h2>
          <p>
            L’auteur qui propose un texte confirme en être l’auteur ou avoir
            obtenu les autorisations nécessaires à sa publication. Pour un texte
            écrit à plusieurs, les co-auteurs doivent avoir accepté sa mise en
            ligne et l’utilisation limitée décrite ci-dessus.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Réutilisation par les visiteurs</h2>
          <p>
            Sauf autorisation écrite de l’auteur ou exception prévue par la loi,
            il est demandé de ne pas copier, republier, adapter ou exploiter
            commercialement les textes. Leur utilisation pour entraîner,
            évaluer ou alimenter un système d’intelligence artificielle n’est
            pas autorisée sans l’accord écrit de l’auteur.
          </p>
          <p>
            Un lien vers une page est préférable au partage du texte lui-même.
            Les exceptions prévues par la loi restent applicables.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Retrait ou signalement</h2>
          <p>
            Un auteur peut demander le retrait de son texte ou signaler un
            contenu en précisant l’adresse de la page concernée.
            Pour le moment, les demandes doivent être transmises via un moyen de contact listé sur le{' '}
            <a href="https://me.consolex1.com">portfolio de consolex1</a> (veuillez privilégier un email ou un message privé sur Discord).
          </p>
          <p>
            Le responsable peut retirer un contenu signalé ou manifestement
            publié sans autorisation. Le retrait du site ne peut pas supprimer
            les copies déjà conservées par des tiers ou les caches des moteurs
            de recherche.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Évolution de ces conditions</h2>
          <p>
            Ces règles peuvent être mises à jour. La version publiée sur cette
            page est celle qui s’applique à l’utilisation actuelle du site. Une
            mise à jour ne donne pas au site de droits supplémentaires sur les
            textes déjà publiés.
          </p>
        </section>

        <p className="legal-note">
          Cette page présente les règles de fonctionnement du site ; elle ne
          remplace pas un avis juridique ni les mentions légales applicables.
          Les droits des auteurs restent soumis à la législation en vigueur.
        </p>
      </article>

      <SiteFooter />
    </main>
  );
}

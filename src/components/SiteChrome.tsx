import Link from 'next/link';

type SiteHeaderProps = {
  backHref: string;
  backLabel: string;
};

export function SiteHeader({ backHref, backLabel }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Poésies, accueil">
        Poésies
      </Link>
      <nav className="header-nav" aria-label="Navigation principale">
        <Link href={backHref}>{backLabel}</Link>
        <a href="https://consolex1.com">
          consolex1 [HOST] <span aria-hidden="true">↗</span>
        </a>
        <a href="https://me.consolex1.com">
          consolex1 Portfolio <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="footer-brand" href="/">
        Poésies
      </Link>
      <span>Un espace pour les mots.</span>
      <a href="https://me.consolex1.com">
        consolex1 Portfolio <span aria-hidden="true">↗</span>
      </a>
    </footer>
  );
}
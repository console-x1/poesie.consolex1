# poesie.consolex1.com

Un site statique où plusieurs auteurs peuvent publier leurs poésies, sans
dashboard ni backend.

## Organisation

Chaque auteur a son dossier dans [`content/`](./content). Le nom du dossier
définit son identifiant et l'adresse de sa page : `content/consolex1/` est
accessible sur `/consolex1`.

```text
content/
  consolex1/
    profile.json
    ordre-recueils.json
    poesies/
      Ce que je tais/
        2026-10-19_Tu-ne-sauras-jamais.txt
```

Le fichier `profile.json` contient le nom, la description et le chemin de
l'avatar de l'auteur. Les avatars sont des fichiers statiques sous `public/`.
`ordre-recueils.json`, à la racine du dossier de l'auteur, liste les dossiers
de recueils dans l'ordre d'affichage souhaité.

## Ajouter une poésie

Crée un fichier `YYYY-MM-DD_Nom-du-poeme.txt` dans le dossier du recueil.
Écris le titre à la première ligne, saute une ligne, colle le poème tel quel,
laisse une ligne vide à la fin, puis ajoute l'année d'écriture et le nom d'auteur,
sur deux lignes séparées :

```text
Le titre de ma poésie

La première ligne du poème
La deuxième, juste en dessous.

Un nouveau paragraphe, séparé par une ligne vide.

2026
Louis
```

Le nom de fichier sert à afficher et trier les poésies par date ; il ne
remplace pas le titre saisi à la première ligne.
Plusieurs fichiers d'un même auteur peuvent avoir le même slug, par exemple
`2026-10-20_Sans-nom.txt` et `2026-10-21_Sans-nom.txt`. Pour éviter les
collisions d'URL, le site ajoute alors automatiquement la date au slug (et le
nom du recueil si la date ne suffit pas).

Chaque titre de poésie est aussi un lien vers sa page dédiée à
`/<identifiant-auteur>/<slug-du-fichier>/`. Les métadonnées SEO des pages
d'auteur et de poésie sont générées à partir du profil et des fichiers de
contenu.

Les instructions complètes pour ajouter un auteur et ses recueils se trouvent
dans [`content/README.md`](./content/README.md).
Les règles concernant les droits des auteurs, la republication et les demandes
de retrait sont publiées sur la page [Droits & conditions](https://poesie.consolex1.com/conditions/).

## Commandes

- `npm install`
- `npm run dev`
- `npm run build`

## Déploiement

Le workflow GitHub Actions `.github/workflows/nextjs.yml` construit et publie
le site statique dans le dossier `out`. Le sitemap est généré automatiquement à
la compilation à partir des auteurs et des poésies présents dans `content/` ;
ajouter un contenu le met donc à jour sans modifier de fichier sitemap à la main.

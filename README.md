# poesie.consolex1.com

Un site statique pour publier ses poésies. Pas de dashboard, de backend ni de
balises à ajouter au texte.

## Ajouter une poésie

Crée un fichier `.txt` dans [`src/content/poesies`](./src/content/poesies). Son
nom donne la date d'écriture et le titre :

```text
YYYY-MM-DD_Nom-du-poeme.txt
```

Dans le fichier, colle le poème, laisse une ligne vide, puis ajoute les trois
informations de fin, chacune sur sa propre ligne : le nom du recueil, l'année
d'écriture et le nom d'auteur. Le titre vient du nom de fichier : tu peux
l'omettre du texte. S'il est déjà écrit en première ligne, il ne sera pas répété.

Par exemple, `2025-03-14_Le-temps-des-fleurs.txt` :

```text
Le vent traverse les rues,
emportant les mots que l'on garde.

Les jours reviennent doucement.

Fragments
2025
Louis
```

Le titre est généré à partir du nom de fichier (`Le temps des fleurs`). Les
poésies sont triées de la plus récente à la plus ancienne et regroupées par nom
de recueil. Les poésies d'un même recueil gardent cet ordre chronologique.

## Commandes

- `npm install`
- `npm run dev`
- `npm run build`

## Déploiement

Le workflow GitHub Actions `.github/workflows/nextjs.yml` construit et publie
le site dans le dossier `out`.

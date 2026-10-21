# Contenu et auteurs

Chaque auteur dispose de son dossier dans `content/`. Le nom du dossier sert
d'identifiant et d'URL : `content/consolex1/` est publié sur `/consolex1`.

Chaque dossier d'auteur contient :

- `profile.json` avec son `name`, sa `description` et son `avatar` ;
- `ordre-recueils.json`, une liste JSON des noms de recueils dans l'ordre
  souhaité ;
- `poesies/<Nom du recueil>/` avec un fichier texte par poésie.

Les recueils absents du fichier d'ordre sont ajoutés à la fin par ordre
alphabétique. Les images d'avatar sont servies depuis `public/` : par exemple,
`"avatar": "/auteurs/marie/avatar.png"` correspond à
`public/auteurs/marie/avatar.png`.

## Format d'une poésie

Nomme le fichier `YYYY-MM-DD_Nom-du-poeme.txt`. Le titre est la première ligne
du fichier ; le nom du fichier sert à la date et à l'ordre chronologique.
Après le texte, ajoute une ligne vide puis l'année et le nom de l'auteur,
chacun sur sa propre ligne.

Plusieurs poèmes d'un même auteur peuvent partager `Sans-nom` dans leur nom de
fichier. Leurs URL restent uniques : le site ajoute automatiquement la date au
slug des poèmes concernés. Si la date ne suffit pas, il ajoute aussi le nom du
recueil, puis un numéro en dernier recours.

```text
Le titre de ma poésie

Le texte reste brut.
Les lignes et les paragraphes sont conservés.

2026
Marie
```

## Ajouter un auteur

1. Crée `content/<identifiant>/profile.json`, `ordre-recueils.json` et `poesies/`.
2. Ajoute une image sous `public/` et indique son chemin public dans le profil.
3. Ajoute des dossiers de recueils et des fichiers `.txt` au format ci-dessus.

Avant d'ajouter un texte pour quelqu'un d'autre, partage avec cette personne la
page `/conditions/` et vérifie qu'elle autorise sa publication. Les auteurs
gardent leurs droits ; la mise en ligne autorise uniquement l'affichage du
texte et l'utilisation de courts extraits attribués pour promouvoir le site.

Exemple de `profile.json` :

```json
{
  "name": "Louis",
  "description": "Quelques mots sur ses textes.",
  "avatar": "/louis.png"
}
```

Exemple de `ordre-recueils.json` :

```json
[
  "Au fil des jours",
  "Fragments"
]
```

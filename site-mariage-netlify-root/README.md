# Site de mariage

Le site est prêt en version statique, avec plusieurs pages :

- `index.html` : accueil
- `jour-j.html` : programme
- `acces.html` : accès et carte
- `hebergement.html` : chambres et tarifs
- `rsvp.html` : réponse et message WhatsApp
- `liste.html` : cagnotte / liste de mariage

## Modifier facilement le contenu

Le fichier principal à modifier est `content.js`.

Vous pouvez y changer rapidement :

- les prénoms
- la date
- le numéro WhatsApp
- les photos
- l'histoire du couple
- la FAQ
- les tarifs des chambres
- le programme du jour J

## Modifications courantes

Pour ajouter le dress code :

- ouvrez `index.html`
- cherchez la section `Dress code`
- remplacez le texte par vos consignes

Pour ajouter votre lien de cagnotte :

- ouvrez `liste.html`
- remplacez `href="#"` par votre vrai lien
- changez le texte du bouton si besoin

Pour changer les photos :

- ouvrez `content.js`
- remplacez les URLs dans `gallery` et `lodging.rooms`

## Ouvrir le site en local

Vous pouvez ouvrir `index.html` directement dans un navigateur pour voir le site.

## Hébergement Netlify

Le fichier `netlify.toml` est déjà prêt.

Étapes :

1. Créez un compte ou connectez-vous à Netlify.
2. Cliquez sur `Add new site` puis `Import an existing project`.
3. Sélectionnez votre dépôt GitHub si le projet est sur GitHub.
4. Laissez le champ build vide.
5. Vérifiez que le dossier publié est `.`.
6. Lancez le déploiement.

Alternative rapide :

1. Glissez directement tout le dossier du site sur Netlify Drop.
2. Netlify vous donnera un lien public immédiatement.

## Hébergement GitHub Pages

Les fichiers `.nojekyll` et `.github/workflows/deploy-pages.yml` sont prêts.

Étapes :

1. Créez un dépôt GitHub.
2. Envoyez tous les fichiers du dossier dans ce dépôt.
3. Poussez sur la branche principale.
4. Dans GitHub, allez dans `Settings` puis `Pages`.
5. Vérifiez que la source est `GitHub Actions`.
6. Le site sera publié automatiquement après le workflow.

## Fichiers ajoutés pour l'hébergement

- `netlify.toml` : configuration Netlify
- `.nojekyll` : évite les soucis de publication GitHub Pages
- `.github/workflows/deploy-pages.yml` : déploiement automatique sur GitHub Pages

## Conseil pratique

Si vous voulez un lien propre et simple à partager à la famille, Netlify est souvent le plus rapide.

Si vous voulez garder une sauvegarde versionnée du site et pouvoir le modifier facilement dans le temps, GitHub Pages est très pratique.

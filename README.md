# Cent phrases, Hundred sentences, Hundert Sätze, Cien frases, Cento frasi, Сто фраз, 一百个句子, 百のフレーズ, Một trăm câu

Un répertoire de 100 phrases utiles en français, anglais, allemand, espagnol, italien, russe, mandarin, japonais et vietnamien. La page fonctionne sans serveur et sans compte.

## Fonctions

- Recherche simultanée dans toutes les langues et filtres par thème.
- Comparaison d'une langue choisie avec le français et vue des neuf langues.
- Lecture vocale avec les voix fournies par le navigateur ou le système, vitesse réglable et arrêt par un second clic.
- Favoris conservés localement dans le navigateur.

Les textes et les codes de langue sont dans `phrases.js` et `app.js`. Les voix sont détectées au moment de la lecture : aucune voix artificielle et aucun fichier audio ne sont inclus. Une langue sans voix compatible affiche un message et ne lance pas de lecture incorrecte.

## Mise en ligne avec GitHub Pages

1. Utiliser le dépôt GitHub `seb16120/100-phrases`.
2. Déposer `index.html`, `style.css`, `app.js` et `phrases.js` à la racine du dépôt, sur la branche `main`.
3. Dans **Settings → Pages → Build and deployment**, choisir **Deploy from a branch**, puis `main` et `/ (root)`.
4. Ouvrir l'adresse indiquée par GitHub Pages, normalement `https://seb16120.github.io/100-phrases/`.

Pour essayer avant publication, ouvrir `index.html` dans un navigateur récent. Les chemins des fichiers sont relatifs et conviennent à un site GitHub Pages de projet.

## Limites

La présence et la qualité des voix dépendent du navigateur, du système et des voix installées. Le code `vi-VN` ne garantit pas un accent du Nord : celui-ci dépend de la voix présente sur l'appareil. Les favoris sont propres à chaque navigateur. Les traductions sont des formulations pratiques et peuvent varier selon le contexte, le registre et le genre de la personne qui parle.

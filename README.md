# Hundred Sentences

Cent phrases, Hundred sentences, Hundert Sätze, Cien frases, Cento frasi, Сто фраз, 一百个句子, 百のフレーズ, Một trăm câu.

Un répertoire de 100 phrases utiles en français, anglais, allemand, espagnol, italien, russe, mandarin, japonais et vietnamien. La page fonctionne sans serveur et sans compte.

## Fonctions

- Recherche simultanée dans les neuf langues et filtres par thème.
- Interface disponible en neuf langues : le bandeau de titres change l'interface et la langue de départ.
- Sélection multiple des langues de traduction, classées par ordre alphabétique de leurs noms français. La langue de départ ne peut pas figurer parmi les traductions.
- Une ligne et un bouton audio par traduction, avec les voix fournies par le navigateur ou le système, vitesse réglable et arrêt par un second clic. La phrase de départ n'a pas de lecteur.
- Trois lignes par traduction : texte original, transcription latine pour le russe, le chinois (pinyin) et le japonais (rōmaji), puis prononciation en alphabet phonétique international (API) **indicative**. Le vietnamien s'écrit déjà avec des lettres latines et conserve ses tons graphiques.
- Langues sélectionnées et favoris conservés localement dans le navigateur.

Les phrases sont dans `phrases.js`, les transcriptions latines dans `readings.js`, les textes de l'interface dans `i18n.js` et les interactions dans `app.js`. Les voix sont détectées au moment de la lecture : aucun fichier audio n'est inclus. Une langue sans voix compatible affiche un message et ne lance pas de lecture incorrecte.

L'API est calculée dans le navigateur par [Spellophone](https://github.com/Spelling-Creator/spellophone) (eSpeak NG, GPL-3.0-or-later). Les dictionnaires sont chargés à la demande via jsDelivr. La lecture en kana japonais utilise [WanaKana](https://github.com/WaniKani/WanaKana) (MIT). Les transcriptions peuvent différer de la prononciation réelle selon le contexte, l'accent, les liaisons et les tons. Le calcul part de l'écriture d'origine en russe et en mandarin, d'une lecture en kana au Japon ; une comparaison avec la forme romanisée est enregistrée pour diagnostic. Sans accès aux données phonétiques, l'API indique « indisponible ».

## Mise en ligne avec GitHub Pages

1. Renommer le dépôt GitHub en `seb16120/hundred-sentences` dans **Settings → General → Repository name**.
2. Déposer `index.html`, `style.css`, `app.js`, `i18n.js`, `phrases.js` et `readings.js` à la racine du dépôt, sur la branche `main`.
3. Dans **Settings → Pages → Build and deployment**, choisir **Deploy from a branch**, puis `main` et `/ (root)`.
4. Ouvrir l'adresse indiquée par GitHub Pages, normalement `https://seb16120.github.io/hundred-sentences/`.

Pour essayer avant publication, ouvrir `index.html` dans un navigateur récent. Les chemins des fichiers sont relatifs et conviennent à un site GitHub Pages de projet.

## Limites

La présence et la qualité des voix dépendent du navigateur, du système et des voix installées. Le code `vi-VN` ne garantit pas un accent du Nord : celui-ci dépend de la voix présente sur l'appareil. Les favoris sont propres à chaque navigateur. Les traductions sont des formulations pratiques et peuvent varier selon le contexte, le registre et le genre de la personne qui parle.

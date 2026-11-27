# Hundred Sentences

Cent phrases, Hundred sentences, Hundert Sätze, Cien frases, Cento frasi, Сто фраз, 一百个句子, 百のフレーズ, Một trăm câu, Isang daang pangungusap.

Un répertoire de 100 phrases utiles dans onze langues de traduction, dont le filipino (fondé sur le tagalog) et une ébauche de FlayPo. La page fonctionne sans serveur et sans compte.

## Fonctions

- Recherche simultanée dans les onze langues et filtres par thème.
- Interface et langue de départ disponibles dans dix langues. FlayPo est une langue de traduction seulement.
- La flèche dans la recherche ouvre un lexique des formes présentes dans les 100 phrases de la langue de départ. Chaque forme est accompagnée de sa fréquence, d'un exemple et de la traduction de la phrase entière ; ce n'est pas une définition mot à mot. Cliquer sur un mot recherche les phrases correspondantes.
- Sélection multiple des langues de traduction, classées par ordre alphabétique de leurs noms français. La langue de départ ne peut pas figurer parmi les traductions.
- Une ligne et un bouton audio par traduction, avec les voix fournies par le navigateur ou le système, vitesse réglable et arrêt par un second clic. La phrase de départ n'a pas de lecteur.
- Texte original, transcription latine lorsque nécessaire pour le russe, le chinois (pinyin) et le japonais (rōmaji), puis prononciation en alphabet phonétique international (API) **indicative**. Le vietnamien et le filipino s'écrivent déjà avec des lettres latines.
- Les formulations FlayPo sont des ébauches issues du livret de la langue : `<???>` signale un groupe de sens non traduisible et la ligne « À inventer » le nomme en français. La lecture vocale des phrases incomplètes est désactivée. Pour les phrases complètes, une voix française fournit une approximation, de même que l'API.
- Langues sélectionnées et favoris conservés localement dans le navigateur.

Les phrases sont dans `phrases.js`, les 100 traductions filipino dans `filipino.js`, les ébauches FlayPo dans `flaypo.js`, les transcriptions latines dans `readings.js`, les textes de l'interface dans `i18n.js` et les interactions dans `app.js`. Les voix sont détectées au moment de la lecture : aucun fichier audio n'est inclus. Une langue sans voix compatible affiche un message et ne lance pas de lecture incorrecte.

L'API est calculée dans le navigateur par [Spellophone](https://github.com/Spelling-Creator/spellophone) (eSpeak NG, GPL-3.0-or-later). Les dictionnaires sont chargés à la demande via jsDelivr. La lecture en kana japonais utilise [WanaKana](https://github.com/WaniKani/WanaKana) (MIT). Les transcriptions peuvent différer de la prononciation réelle selon le contexte, l'accent, les liaisons et les tons. Le calcul part de l'écriture d'origine en russe et en vietnamien, du pinyin accentué en mandarin (comparé aux sinogrammes), d'une lecture en kana au Japon (comparée au rōmaji). Le chinois et le vietnamien affichent des signes de ton en API à la place des chiffres produits par eSpeak ; le chinois applique aussi une règle indicative de sandhi du troisième ton. Pour le filipino, une règle orthographique produit une API très approximative, sans accent tonique fiable ni arrêts glottaux déductibles. Le FlayPo passe par les règles françaises du moteur après adaptation de sa graphie : cela ne constitue pas une prononciation validée. Les divergences sont enregistrées pour diagnostic. Sans accès aux données phonétiques, l'API indique « indisponible ».

## Mise en ligne avec GitHub Pages

Le dépôt est [seb16120/hundred-sentences](https://github.com/seb16120/hundred-sentences). GitHub Pages publie la branche `main`, dossier `/ (root)`, à l'adresse [seb16120.github.io/hundred-sentences](https://seb16120.github.io/hundred-sentences/).

Pour essayer avant publication, ouvrir `index.html` dans un navigateur récent. Les chemins des fichiers sont relatifs et conviennent à un site GitHub Pages de projet.

## Limites

La présence et la qualité des voix dépendent du navigateur, du système et des voix installées. Le code `vi-VN` ne garantit pas un accent du Nord : celui-ci dépend de la voix présente sur l'appareil. Les favoris sont propres à chaque navigateur. Les traductions sont des formulations pratiques et peuvent varier selon le contexte, le registre et le genre de la personne qui parle.

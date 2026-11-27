# Hundred Sentences

Cent phrases, Hundred sentences, Hundert S�tze, Cien frases, Cento frasi, ??? ????, ?????, ??????, M?t tram c�u, Isang daang pangungusap.

Un r�pertoire de 100 phrases utiles dans onze langues de traduction, dont le filipino (fond� sur le tagalog) et une �bauche de FlayPo. La page fonctionne sans serveur et sans compte.

## Fonctions

- Recherche simultan�e dans les onze langues et filtres par th�me.
- Interface et langue de d�part disponibles dans dix langues. FlayPo est une langue de traduction seulement.
- La fl�che dans la recherche ouvre un lexique des formes pr�sentes dans les 100 phrases de la langue de d�part. Chaque forme est accompagn�e de sa fr�quence, d'un exemple et de la traduction de la phrase enti�re ; ce n'est pas une d�finition mot � mot. Cliquer sur un mot recherche les phrases correspondantes.
- S�lection multiple des langues de traduction, class�es par ordre alphab�tique de leurs noms fran�ais. La langue de d�part ne peut pas figurer parmi les traductions.
- Une ligne et un bouton audio par traduction, avec les voix fournies par le navigateur ou le syst�me, vitesse r�glable et arr�t par un second clic. La phrase de d�part n'a pas de lecteur.
- Texte original, transcription latine lorsque n�cessaire pour le russe, le chinois (pinyin) et le japonais (romaji), puis prononciation en alphabet phon�tique international (API) **indicative**. Le vietnamien et le filipino s'�crivent d�j� avec des lettres latines.
- Les formulations FlayPo sont des �bauches issues du livret de la langue : `<???>` signale un groupe de sens non traduisible et la ligne � � inventer � le nomme en fran�ais. Les termes en gras ont �t� suppos�s ou compos�s pour le site et ne sont pas confirm�s dans le dictionnaire de l'auteur ; la liste de ces formes est dans `flaypo.js`. Les phrases compl�tes restent elles aussi des �bauches. La lecture vocale des phrases incompl�tes est d�sactiv�e. Pour les phrases compl�tes, une voix fran�aise fournit une approximation, de m�me que l'API.
- Langues s�lectionn�es et favoris conserv�s localement dans le navigateur.

Les phrases sont dans `phrases.js`, les 100 traductions filipino dans `filipino.js`, les �bauches FlayPo dans `flaypo.js`, les transcriptions latines dans `readings.js`, les textes de l'interface dans `i18n.js` et les interactions dans `app.js`. Les voix sont d�tect�es au moment de la lecture : aucun fichier audio n'est inclus. Une langue sans voix compatible affiche un message et ne lance pas de lecture incorrecte.

L'API des neuf langues initiales est calcul�e dans le navigateur par [Spellophone](https://github.com/Spelling-Creator/spellophone) (eSpeak NG, GPL-3.0-or-later). Les dictionnaires sont charg�s � la demande via jsDelivr. La lecture en kana japonais utilise [WanaKana](https://github.com/WaniKani/WanaKana) (MIT). Les transcriptions peuvent diff�rer de la prononciation r�elle selon le contexte, l'accent, les liaisons et les tons. Le calcul part de l'�criture d'origine en russe et en vietnamien, du pinyin accentu� en mandarin (compar� aux sinogrammes), d'une lecture en kana au Japon (compar�e au romaji). Le chinois et le vietnamien affichent des signes de ton en API � la place des chiffres produits par eSpeak ; le chinois applique aussi une r�gle indicative de sandhi du troisi�me ton. Pour le filipino, une r�gle orthographique produit une API tr�s approximative, sans accent tonique fiable ni arr�ts glottaux d�ductibles. L'API FlayPo applique les valeurs phon�tiques du fran�ais indiqu�es dans les notes de l'auteur ; un point d'interrogation repr�sente une lettre dont la valeur n'est pas fix�e. Sa voix fran�aise reste une approximation distincte. Les divergences sont enregistr�es pour diagnostic. Sans acc�s aux donn�es phon�tiques, l'API des langues trait�es par eSpeak indique � indisponible �.

## Mise en ligne avec GitHub Pages

Le d�p�t est [seb16120/hundred-sentences](https://github.com/seb16120/hundred-sentences). GitHub Pages publie la branche `main`, dossier `/ (root)`, � l'adresse [seb16120.github.io/hundred-sentences](https://seb16120.github.io/hundred-sentences/).

Pour essayer avant publication, ouvrir `index.html` dans un navigateur r�cent. Les chemins des fichiers sont relatifs et conviennent � un site GitHub Pages de projet.

## Limites

La pr�sence et la qualit� des voix d�pendent du navigateur, du syst�me et des voix install�es. Le code `vi-VN` ne garantit pas un accent du Nord : celui-ci d�pend de la voix pr�sente sur l'appareil. Les favoris sont propres � chaque navigateur. Les traductions sont des formulations pratiques et peuvent varier selon le contexte, le registre et le genre de la personne qui parle.


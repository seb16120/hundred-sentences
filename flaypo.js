// Partial FlayPo renderings. Each <???> marks one as-yet-untranslatable
// meaning group; the matching French groups are listed in the same order.
// Working drafts, not completed FlayPo translations. The forms below are
// attested in neither the v5 glossary nor the 21 October 2026 decisions;
// they were inferred for this site and must be visibly marked as such.
window.FLAYPO_ASSUMED_TERMS = new Set([
  'BiuInLûmi', // v5 has Biu-in-lumi; the accented spelling is inferred.
  'BiuPrévInNokta', 'BonoInLûmi', 'far', 'inLûmi', 'no-ési', 'po-yors'
]);
// Author-confirmed, 27 November 2026: ici = here, icir = be here;
// la = there, lar = be there.
window.FLAYPO_DRAFTS = [
  ["BiuInLûmi !", ""],
  ["BiuPrévInNokta !", ""],
  ["<???> !", "au revoir"],
  ["<???> !", "à bientôt"],
  ["<???>.", "merci beaucoup"],
  ["<???>.", "de rien"],
  ["<???>.", "s'il vous plaît"],
  ["<???>.", "excusez-moi"],
  ["Mui ési <???>.", "désolé"],
  ["BonoInLûmi !", ""],
  ["Kést <???> ?", "vous appelez-vous"],
  ["Mui <???>…", "m'appelle"],
  ["<???>.", "enchanté de faire votre connaissance"],
  ["<???> inZalir <???> ?", "d'où|vous"],
  ["Mui inZalir <???>.", "de France"],
  ["Mui <???> inext ici.", "habite"],
  ["Mui icir <???>.", "pour quelques jours"],
  ["<???>-sèlf.", "première visite"],
  ["Mui <???>.", "voyage seul"],
  ["<???>.", "ravi de vous revoir"],
  ["<???> utSpikir <???> ?", "vous|français"],
  ["Mui utSpikir <???> po-yors.", "un peu"],
  ["Mui no-<???>.", "comprends"],
  ["<???> ?", "pouvez-vous répéter"],
  ["<???> utSpikir <???> ?", "pouvez-vous|plus lentement"],
  ["Kést utSpikir <???> po-yors ?", "dit-on cela dans"],
  ["Ke <???> ?", "cela veut dire"],
  ["<???> simbir <???> ?", "pouvez-vous|l'"],
  ["Mui bif <???> ?", "bien compris"],
  ["<???> ?", "pouvez-vous me montrer"],
  ["Kést <???> ?", "allez-vous"],
  ["Mui ési bono, <???>.", "merci"],
  ["<???> ?", "et vous"],
  ["Ke <???> ?", "en pensez-vous"],
  ["Mui <???>.", "suis d'accord"],
  ["Mui no-ési <???>.", "sûr"],
  ["<???> !", "c'est intéressant"],
  ["<???> ?", "pourquoi"],
  ["<???> utSpikir <???> ?", "pouvez-vous|m'en dire plus"],
  ["Mui ve <???>.", "en savoir plus"],
  ["<???> <???> ?", "où se trouve|la gare"],
  ["Kést zalir <???> ?", "au centre-ville"],
  ["<???> far <???> ?", "est-ce|d'ici"],
  ["<???> zalir <???> ?", "est-ce accessible|à pied"],
  ["Ke <???> <???> ?", "bus|dois-je prendre"],
  ["<???> <???> ?", "où acheter|un billet"],
  ["<???> timig utZalir <???> ?", "à quelle heure|le train"],
  ["<???> bono <???> ?", "est-ce|le quai"],
  ["Mui ési <???>.", "perdu"],
  ["<???> miniStrase ?", "pouvez-vous m'indiquer le"],
  ["<???> téb <???> ?", "avez-vous|pour une personne"],
  ["<???> inBioyor <???> ?", "puis-je|le menu"],
  ["Ke <???> ?", "recommandez-vous"],
  ["Mui ve <???>.", "commander ceci"],
  ["<???> fodo <???> ?", "ce plat contient|des fruits de mer"],
  ["Mui gétir <???> fodo.", "une allergie"],
  ["Wiv-ut <???>, <???>.", "alcool|s'il vous plaît"],
  ["<???> gétir o ?", "pourrais-je"],
  ["<???> !", "c'était délicieux"],
  ["<???>, <???>.", "l'addition|s'il vous plaît"],
  ["<???> ?", "combien ça coûte"],
  ["<???> <???> ?", "avez-vous|une autre taille"],
  ["<???> ?", "puis-je l'essayer"],
  ["Mui inBioyor <???>, <???>.", "seulement|merci"],
  ["Mui wil <???>.", "prendre celui-ci"],
  ["<???> <???> ?", "puis-je payer|par carte"],
  ["<???> <???> ?", "acceptez-vous|les espèces"],
  ["<???> <???> ?", "puis-je avoir|un reçu"],
  ["<???> <???> ?", "avez-vous quelque chose|de moins cher"],
  ["<???> ?", "puis-je le retourner"],
  ["<???> timig ?", "quelle heure est-il"],
  ["<???> inLûmi <???> ?", "quel jour|sommes-nous"],
  ["<???> waRék <???> ?", "c'est|aujourd'hui"],
  ["<???> timig géfRékir ?", "à quelle heure ça"],
  ["Mui wil lar <???>.", "dans dix minutes"],
  ["Mui inZalir <???>.", "tout de suite"],
  ["<???> tomoro ?", "pouvons-nous nous retrouver"],
  ["Mui <???> timig.", "ai besoin de plus de"],
  ["<???> timig <???>.", "il est trop tard|pour moi"],
  ["<???> ?", "quand cela commence-t-il"],
  ["Mui <???>.", "ai besoin d'aide"],
  ["<???> ?", "pouvez-vous m'aider"],
  ["<???>, <???> !", "appelez les secours|s'il vous plaît"],
  ["<???> <???> ?", "où se trouve|l'hôpital le plus proche"],
  ["Mui no-<???> bono.", "me sens"],
  ["Mui bif <???> <???>-sèlf.", "perdu|téléphone"],
  ["<???>-sèlf bif <???>.", "sac|a été volé"],
  ["<???> <???> ?", "où sont|les toilettes"],
  ["Ol ési bono ?", ""],
  ["<???> <???>.", "merci|pour votre aide"],
  ["Ke <???> amorir makar <???> ?", "vous|pendant votre temps libre"],
  ["Mui amoir <???> <???> <???>.", "la musique|et|les livres"],
  ["Ke <???> amorir ici ?", "vous"],
  ["<???> <???> biu <???> ?", "connaissez-vous|un endroit|à visiter"],
  ["<???> ve <???> ?", "voulez-vous|prendre un café"],
  ["Mui bif <???> bono timig.", "passé un"],
  ["<???> ?", "pouvons-nous rester en contact"],
  ["<???> <???>-sèlf.", "voici|numéro"],
  ["<???> !", "à la prochaine"],
  ["<???>.", "prenez soin de vous"]
];

if(window.FLAYPO_DRAFTS.length !== window.PHRASES?.length) {
  throw new Error("FlayPo drafts must match the phrase catalogue.");
}
window.PHRASES.forEach((phrase,index) => {
  const [text,groups] = window.FLAYPO_DRAFTS[index];
  const missing = groups ? groups.split('|') : [];
  if((text.match(/<\?\?\?>/g)||[]).length !== missing.length) {
    throw new Error(`FlayPo placeholders do not match missing groups at #${index+1}`);
  }
  phrase.flp=text;
  phrase.flpMissing=missing;
});


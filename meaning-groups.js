// Each line lists boundaries between groups of meaning in one phrase.
// Columns: fr | en | de | es | it | ru | zh | ja | vi | fil | flp (optional).
// "2/1Dank" starts with group 2, then switches to group 1 at "Dank".
// Group 0 is neutral. An undivided expression may carry a single group.
(() => {
  'use strict';
  const columns = ['fr','en','de','es','it','ru','zh','ja','vi','fil','flp'];
  const boundaries = `
1 1|1|1|1|1|1|1|1|1|1|1
2 1|1|1|1|1|1|1|1|1|1|1
3 1|1|1|1|1|1|1|1|1|1|0
4 1|1|1|1|1|1|1|1|1|1|0
5 1/2beaucoup|1/2very much|2/1Dank|2/1gracias|1/2mille|2/1спасибо|2/1感谢|2/1ありがとうございます|1/2rất nhiều|2/1salamat|0
6 1|1|1|1|1|1|1|1|1|1|0
7 1|1|1|1|1|1|1|1|1|1|0
8 1|1|1|1|1|1|1|1|1|1|0
9 1|1|1|1|1|1|1|1|1|1|0
10 1|1|1|1|1|1|1|1|1|1|1
11 1/2vous appelez|1/2your name|1/2heißen|1/2se llama|1/2si chiama|1/2Вас зовут|2/1什么/2名字|2/1何ですか|2/1là gì|1/2ang pangalan|1/0<???>
12 1|1|1|1|1|1|1|1|1|1|0
13 1/2de faire|1/2to meet|1/2Sie kennen|1/2de conocer|1/2di conoscerla|1/2познакомиться|1/2认识你|1|1/2được gặp|1/2kayong makilala|0
14 1/2venez|1/2are you/1from|1/2kommen|1/2es usted|1/2è|1/2Вы|2/1哪里|1/2のご出身|2/1từ đâu|1/2po kayo|0/2inZalir/0<???>
15 1/2de France|1/2from France|1/2aus Frankreich|1/2de Francia|1/2dalla Francia|1/2из Франции|1/2自法国|2/1来ました|1/2từ Pháp|2/1ako|1/0<???>
16 1/2près d'ici|1/2near here|1/2in der Nähe|1/2cerca de aquí|1/2qui vicino|1/2недалеко|2/1住|2/1住んで|1/2gần đây|1/2malapit dito|0/2inext
17 1/2pour quelques jours|1/2for a few days|1/2für ein paar Tage/1hier|1/2unos días|1/2per qualche giorno|1/2на несколько|1/2几天|2/1ここ|1/2vài ngày|1/2nang ilang|1/0<???>
18 1|1|1|1|1|1|1|1|1|1|0
19 1/2seul|1/2alone|1/2allein|1/2por mi cuenta|1/2da solo|1/2один|1/2一个人/1旅行|2/1旅行|1/2một mình|2/1akong|0
20 1/2de vous revoir|1/2to see you again|1/2Sie wieder|1/2de volver|1/2rivederla|1/2снова|1/2再次|2/1うれしい|1/2được gặp lại|1/2makita kayong|0
21 1/2français|1/2French|1/2Französisch|1/2francés|1/2francese|1/2по-французски|1/2法语/0吗|2/1を話せ|1/2tiếng Pháp/0không|1/2ng Pranses|0/1utSpikir/0<???>
22 1/2un peu/3votre langue|1/2a little/3of your language|1/2ein wenig/3Ihre Sprache|1/2un poco/3su idioma|1/2un po'/3la sua lingua|1/2немного/1говорю/3на Вашем|1/2一点/3你的语言|3/2少し/1話せ|1/2một chút/3tiếng của bạn|2/1ang alam ko/3sa wika|1/0<???>/3po-yors
23 1|1|1|1|1|1|1|1|1|1|0
24 1/2répéter|1/2repeat|1/2das wiederholen|1/2repetirlo|1/2ripetere|1/2повторить|1/2再说一遍/0吗|2/1いただけ|1/2nhắc lại/1được không|1/2ulitin|0
25 1/2parler/3plus lentement|1/2speak/3more slowly|1/3langsamer/2sprechen|1/2hablar/3más despacio|1/2parlare/3più lentamente|1/2говорить/3медленнее|1/2说/3慢一点/0吗|3/2話して/1いただけ|1/2nói/3chậm hơn/1được không|1/2magsalita/3nang mas|0/2utSpikir/0<???>
26 1/2dans votre langue|1/2in your language|1/2in Ihrer Sprache|1/2en su idioma|1/2nella sua lingua|1/2на Вашем языке|1/2用你的语言/1怎么说|1/2あなたの言葉で/1何と|2/1nói cái đó|1/2sa wika|0
27 1|1|1|1|1|1|1|1|1|1|0
28 1/2l'écrire|1/2write it down|1/2das aufschreiben|1/2escribirlo|1/2scriverlo|1/2это написать|1/2把它写下来/0吗|2/1いただけ|1/2viết ra/1được không|1/2isulat|0/2simbir/0<???>
29 1/2bien/1compris|1/2correctly|1/2richtig/1verstanden|1/2bien|1/2bene|1/2правильно/1понял|1/2得对/0吗|2/1理解|1/2đúng/0chứ|2/1ang pagkakaintindi|0
30 1/2me montrer|1/2show me|1/2es mir zeigen|1/2enseñármelo|1/2mostrarmelo|1/2мне показать|1/2给我看一下/0吗|2/1いただけ|1/2cho tôi xem/1được không|1/2ipakita|0
31 1|1|1|1|1|1|1|1|1|1|0
32 1/2merci|1/2thanks|1/2danke|1/2gracias|1/2grazie|1/2спасибо|1/2谢谢|1/2ありがとうございます|1/2cảm ơn|1/2salamat|1/0<???>
33 1/2vous|1/2you|1/2Ihnen|1/2usted|1/2lei|1/2у Вас|2/1呢|2/1は|1/2bạn|1/2kayo|0
34 1|1|1|1|1|1|1|1|1|1|0
35 1|1|1|1|1|1|1|1|1|1|0
36 1|1|1|1|1|1|1|1|1|1|0
37 1|1|1|1|1|1|1|1|1|1|0
38 1|1|1|1|1|1|1|1|1|1|0
39 1/2plus|1/2more|1/2mehr/1darüber erzählen|1/2más|1/2di più|1/2подробнее|1/2多/1说/2一点/0吗|2/1教えて|1/2thêm/1cho tôi|1/2pa/1ang tungkol|0
40 1/2plus|1/2more|1/2mehr/1darüber erfahren|1/2más|1/2di più|1/2больше|1/2多/1了解/2一些|2/1知りたい|1/2thêm|1/2pang/1malaman|0
41 1/2la gare|1/2the train station|1/2der Bahnhof|1/2la estación|1/2la stazione|1/2вокзал|2/1在哪里|2/1どこ|2/1ở đâu|1/2ang istasyon|0
42 1/2au centre|1/2downtown|1/2ins Stadtzentrum|1/2al centro|1/2in centro|1/2до центра|2/1怎么走|2/1どう行|1/2đến trung tâm|1/2sa sentro|0
43 1/2d'ici|1/2from here|1/2von hier|1/2de aquí|1/2da qui|1/2отсюда|2/1远|2/1遠い|1/2đây/1không|1/2mula rito|0/1far/0<???>
44 1/2à pied|1/2walk/1there|1/2zu Fuß/1dorthin|1/2andando|1/2a piedi|1/2пешком|1/2步行/1去那里|2/1行け|1/2đi bộ/1đến đó|1/2maglakad/1papunta|0
45 1/2dois-je|1/2should I|1/2muss ich|1/2tengo que|1/2devo|1/2мне сесть|2/1哪路|1/2に乗れ|2/1xe buýt|1/2ang dapat|0
46 1/2un billet|1/2a ticket|1/2eine Fahrkarte/1kaufen|1/2un billete|1/2un biglietto|1/2билет|1/2票|2/1どこ|1/2vé/1ở đâu|1/2ng tiket|0
47 1/2part le train|1/2does the train|1/2fährt|1/2sale el tren|1/2parte|1/2отправляется|2/1几点/2出发|2/1何時/2に出ます|2/1lúc mấy|1/2aalis|0
48 1/2le bon quai|1/2the right platform|1/2der richtige|1/2el andén|1/2il binario|1/2нужная|1/2对的站台/1吗|2/1で合っています|1/2sân ga đúng/1không|1/2ang tamang|0
49 1|1|1|1|1|1|1|1|1|1|0
50 1/2le chemin|1/2the way|1/2den Weg/1zeigen|1/2el camino|1/2la strada|1/2дорогу|1/2路/1吗|2/1を教えて|1/2đường/1cho tôi|1/2ang daan|0
51 1/2une table/3pour une personne|1/2a table/3for one|1/2einen Tisch/3für eine Person|1/2mesa/3para una|1/2un tavolo/3per una|1/2столик/3на одного|1/3单人/2桌/1吗|3/2の席/1はあります|1/2bàn/3cho một người/1không|1/2mesa/1po ba kayo/3para sa isa|0
52 1/2le menu|1/2the menu|1/2die Speisekarte/1sehen|1/2la carta|1/2il menù|1/2меню|1/2菜单/1吗|2/1を見せて|1/2thực đơn/1được không|1/2ang menu|0
53 1|1|1|1|1|1|1|1|1|1|0
54 1/2ceci|1/2this|1/2das hier/1bestellen|1/2esto|1/2questo|1/2это|1/2这个|2/1を注文|1/2món này|1/2nito|0
55 1/2des fruits de mer|1/2seafood|1/2Meeresfrüchte|1/2marisco|1/2frutti di mare|1/2морепродукты|1/2海鲜/1吗|1/2魚介類/1が入って|1/2hải sản/1không|1/2lamang-dagat/1po ba|0
56 1/2une allergie alimentaire|1/2a food allergy|1/2eine Lebensmittelallergie|1/2una alergia|1/2un'allergia|1/2пищевая аллергия|1/2食物过敏|2/1があります|1/2dị ứng thực phẩm|1/2allergy/1ako/2sa pagkain|0
57 1/2s'il vous plaît|1/2please|1/2bitte|1/2por favor|1/2per favore|1/2пожалуйста|2/1不要加酒|1/2お願いします|1/2làm ơn|1/2pakiusap|1/0<???>
58 1/2de l'eau|1/2some water|1/2etwas Wasser/1bekommen|1/2agua|1/2dell'acqua|1/2воды|1/2一些水/1吗|2/1をいただけ|1/2ít nước/1được không|1/2ng tubig|0
59 1|1|1|1|1|1|1|1|1|1|0
60 1/2s'il vous plaît|1/2please|1/2bitte|1/2por favor|1/2per favore|1/2пожалуйста|2/1结账|1/2お願いします|2/1hóa đơn/2làm ơn|2/1ng bill|0
61 1|1|1|1|1|1|1|1|1|1|0
62 1/2une autre taille|1/2another size|1/2eine andere Größe|1/2otra talla|1/2un'altra taglia|1/2другой размер|1/2别的尺码/1吗|2/1はあります|1/2cỡ khác/1không|1/2iba/1po ba kayong/2sukat|0
63 1/2l'essayer|1/2try it on|1/2das anprobieren|1/2probármelo|1/2provarlo|1/2это примерить|1/2试穿/1吗|2/1してもいい|1/2mặc thử/1không|1/2itong isukat|0
64 1/2merci|1/2thanks|1/2danke|1/2gracias|1/2grazie|1/2спасибо|1/2谢谢|1/2ありがとうございます|1/2cảm ơn|1/2salamat|0
65 1/2celui-ci|1/2this one|1/2das hier|1/2este|1/2questo|1/2вот это|1/2这个|2/1にします|1/2cái này|1/2ito|0
66 1/2par carte|1/2by card|1/2mit Karte/1bezahlen|1/2con tarjeta|1/2con la carta|1/2картой|1/2刷卡/1吗|2/1払え|1/2bằng thẻ/1không|1/2gamit ang kard|0
67 1/2les espèces|1/2cash|1/2Bargeld/1an|1/2efectivo|1/2contanti|1/2наличные|1/2现金/1吗|2/1は使え|1/2tiền mặt/1không|1/2ng cash|0
68 1/2un reçu|1/2a receipt|1/2eine Quittung/1bekommen|1/2un recibo|1/2una ricevuta|1/2чек|1/2一张收据/1吗|2/1をいただけ|1/2biên lai/1được không|1/2ng resibo|0
69 1/2de moins cher|1/2less expensive|1/2Günstigeres|1/2más barato|1/2di meno caro|1/2подешевле|1/2便宜一点/1的吗|2/1ものはあります|1/2rẻ hơn/1không|1/2mas mura/1po ba|0
70 1/2le retourner|1/2return it|1/2das zurückgeben|1/2devolverlo|1/2restituirlo|1/2это вернуть|1/2退货/1吗|2/1できます|1/2trả lại món này/1không|1/2itong isauli|0
71 1|1|1|1|1|1|1|1|1|1|0
72 1|1|1|1|1|1|1|1|1|1|0
73 1/2aujourd'hui|1/2today|1/2heute/1geöffnet|1/2hoy|1/2oggi|2/1открыто|2/1营业|2/1営業|2/1có mở cửa|1/2ngayon|0/1waRék/0<???>
74 1/2ça ferme|1/2does it close|1/2schließt|1/2cierra|1/2chiude|1/2закрывается|1/2关门|1/2閉まります|1/2đóng cửa|1/2ito nagsasara|0/1timig/2géfRékir
75 1/2dans dix minutes|1/2in ten minutes|1/2in zehn Minuten/1da|1/2dentro de diez minutos|1/2tra dieci minuti|1/2через десять минут|1/2十分钟后/1到|2/1着きます|2/1tôi sẽ đến|1/2sa loob ng|1/0<???>
76 1/2tout de suite|1/2right/1there|1/2sofort|1/2enseguida|1/2subito|1/2сейчас/1приду|1/2马上/1到|2/1行きます|1/2ngay|1|1/0<???>
77 1/2demain|1/2tomorrow|1/2morgen/1treffen|1/2mañana|1/2domani|1/2завтра|1/2明天/1能见面|2/1会えます|2/1chúng ta|1/2bukas|0/2tomoro
78 1/2plus de temps|1/2more time|1/2mehr Zeit|1/2más tiempo|1/2di più tempo|1/2больше времени|1/2多一点时间|2/1が必要|1/2thêm thời gian|1/2pa ng oras|0/2timig
79 1/2pour moi|1/2for me|2/1ist es zu spät|1/2para mí|2/1è troppo tardi|2/1это слишком|2/1太晚了|2/1遅すぎ|2/1thì muộn|1/2para sa akin|0
80 1/2cela commence|1/2does it start|1/2fängt|1/2empieza|1/2comincia|1/2это начинается|1/2开始|1/2始まります|1/2bắt đầu|1/2po ito magsisimula|0
81 1/2d'aide|1/2help|1/2Hilfe|1/2ayuda|1/2di aiuto|1/2помощь|1/2帮助|2/1が必要|1/2giúp đỡ|1/2ng tulong|0
82 1/2m'aider|1/2help me|1/2mir helfen|1/2ayudarme|1/2aiutarmi|1/2мне помочь|1/2帮我/1吗|2/1いただけます|1/2giúp tôi/1không|1/2akong tulungan|0
83 1/2s'il vous plaît|2/1call emergency|1/2bitte/1den Rettungsdienst|1/2por favor|1/2per favore|2/1вызовите|2/1叫急救|1/2ください|2/1gọi cấp cứu|1/2po/1kayo|0
84 1/2l'hôpital/3le plus proche|1/3the nearest/2hospital|1/3das nächste/2Krankenhaus|1/2el hospital/3más cercano|1/2l'ospedale/3più vicino|1/3ближайшая/2больница|3/2医院/1在哪里|3/2病院/1はどこ|2/3gần nhất/1ở đâu|1/3ang pinakamalapit/2na ospital|0
85 1|1|1|1|1|1|1|1|1|1|0
86 1/2mon téléphone|1/2my phone|1/2mein Handy/1verloren|1/2el móvil|1/2il telefono|1/2телефон|2/1丢了|2/1をなくしました|1/2điện thoại|1/2ang telepono ko|0
87 1/2a été volé|1/2was stolen|1/2wurde gestohlen|2/1el bolso|2/1la borsa|2/1сумку|1/2被偷了|1/2を盗まれ|1/2bị đánh cắp|2/1ang bag ko|0
88 1/2les toilettes|1/2the restroom|1/2die Toilette|1/2el baño|1/2il bagno|1/2туалет|2/1在哪里|2/1はどこ|2/1ở đâu|1/2ang palikuran|0
89 1|1|1|1|1|1|1|1|1|1|1
90 1/2pour votre aide|1/2for your help|1/2für Ihre Hilfe|1/2por su ayuda|1/2per il suo aiuto|1/2за помощь|1/2你的帮助|2/1ありがとうございます|1/2bạn đã giúp đỡ|1/2sa tulong|0
91 1/2pendant votre temps libre|1/2in your free time|1/2in Ihrer Freizeit|1/2en su tiempo libre|1/2nel tempo libero|1/2в свободное время|1/2空闲时/1喜欢做什么|2/1何をする|1/2lúc rảnh|1/2sa libreng oras|0
92 1/2la musique/3et/4les livres|1/2music/3and/4books|1/2Musik/3und/4Bücher|1/2la música/3y/4los libros|1/2la musica/3e i/4i libri|1/2музыка/3и книги/4книги|1/2音乐/3和/4书|2/3と/4本/1が好き|1/2âm nhạc/3và/4sách|1/2sa musika/3at/4mga libro|1/0<???>
93 1/2ici|1/2about this place|1/2hier|1/2de este lugar|1/2di questo posto|1/2здесь/1нравится|1/2这里的/1什么|2/1どんなところ|1/2ở nơi này|1/2rito|0/2ici
94 1/2un endroit agréable/3à visiter|1/2a nice place/3to visit|1/2einen schönen Ort/3den man besuchen|1/2algún sitio bonito/3para visitar|1/2un bel posto/3da visitare|1/2интересное место/3которое стоит посетить|1/3值得去的/2好地方|2/1はあります|1/2nơi nào hay/3để tham quan|1/2magandang lugar/3na puwedeng puntahan|0/2biu/0<???>
95 1/2prendre un café|1/2to get coffee|1/2einen Kaffee|1/2tomar un café|1/2prendere un caffè|1/2выпить кофе|1/2喝杯咖啡/1吗|2/1ませんか|1/2đi uống cà phê/1không|1/2magkape|0
96 1|1|1|1|1|1|1|1|1|1|0
97 1/2rester en contact|1/2keep in touch|1/2in Kontakt bleiben|1/2seguir en contacto|1/2restare in contatto|1/2оставаться на связи|1/2保持联系/1吗|2/1合えます|1/2giữ liên lạc/1không|1/2manatiling magkakontak|0
98 1/2mon numéro|1/2my number|1/2meine Nummer|1/2mi número|1/2il mio numero|1/2мой номер|1/2我的电话号码|1/2私の電話番号/1です|1/2số điện thoại|1/2ang numero ko|0
99 1|1|1|1|1|1|1|1|1|1|0
100 1|1|1|1|1|1|1|1|1|1|0
`;

  const groups = new Map(boundaries.trim().split('\n').map(line => {
    const separator = line.indexOf(' ');
    const number = Number(line.slice(0, separator));
    const rules = line.slice(separator + 1).split('|');
    return [number, Object.fromEntries(rules.map((rule, index) => [columns[index], rule]))];
  }));
  const romanizedThanks = {
    ru:'2/1spasibo', zh:'2/1gǎnxiè', ja:'2/1arigatō'
  };

  window.getMeaningGroups = (number, language, text, romanized = false) => {
    const rule = romanized
      ? (number === 5 ? romanizedThanks[language] : null)
      : groups.get(number)?.[language];
    if (!rule) return [{ group:'0', text }];

    const [firstGroup, ...changes] = rule.split('/');
    const segments = [];
    let group = firstGroup;
    let start = 0;
    for (const [nextGroup, ...anchorLetters] of changes) {
      const anchor = anchorLetters.join('');
      const boundary = text.indexOf(anchor, start + 1);
      if (boundary === -1) return [{ group:'0', text }];
      segments.push({ group, text:text.slice(start, boundary) });
      start = boundary;
      group = nextGroup;
    }
    segments.push({ group, text:text.slice(start) });
    return segments;
  };
})();


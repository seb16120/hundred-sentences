/* Static, client-side phrasebook. All visible text uses i18n.js. */
(() => {
  'use strict';
  const languages = [
    { key:'fr', label:'Français', french:'Français', speech:'fr-FR' },
    { key:'en', label:'English', french:'Anglais', speech:'en-US' },
    { key:'de', label:'Deutsch', french:'Allemand', speech:'de-DE' },
    { key:'es', label:'Español', french:'Espagnol', speech:'es-ES' },
    { key:'it', label:'Italiano', french:'Italien', speech:'it-IT' },
    { key:'ru', label:'Русский', french:'Russe', speech:'ru-RU' },
    { key:'zh', label:'中文', french:'Chinois', speech:'zh-CN' },
    { key:'ja', label:'日本語', french:'Japonais', speech:'ja-JP' },
    { key:'vi', label:'Tiếng Việt', french:'Vietnamien', speech:'vi-VN' },
    { key:'fil', label:'Filipino', french:'Filipino', speech:'fil-PH' },
    { key:'flp', label:'FlayPo', french:'FlayPo', speech:'fr-FR', targetOnly:true }
  ];
  const sortedLanguages = [...languages].sort((a,b) => a.french.localeCompare(b.french,'fr'));
  const languageByKey = (key) => languages.find(l => l.key === key);
  const phrases = Array.isArray(window.PHRASES) ? window.PHRASES : [];
  const readings = window.READINGS || {};
  const pronunciationLabels = {
    fr:{latin:'Transcription',ipa:'API indicative',unavailable:'API indisponible'},
    en:{latin:'Romanization',ipa:'Approximate IPA',unavailable:'IPA unavailable'},
    de:{latin:'Umschrift',ipa:'Ungefährer IPA-Wert',unavailable:'IPA nicht verfügbar'},
    es:{latin:'Transcripción latina',ipa:'AFI aproximado',unavailable:'AFI no disponible'},
    it:{latin:'Traslitterazione',ipa:'IPA indicativa',unavailable:'IPA non disponibile'},
    ru:{latin:'Транслитерация',ipa:'Приблизительная МФА',unavailable:'МФА недоступна'},
    zh:{latin:'拉丁转写',ipa:'国际音标（仅供参考）',unavailable:'音标不可用'},
    ja:{latin:'ローマ字',ipa:'IPA（参考）',unavailable:'IPAを利用できません'},
    vi:{latin:'Phiên tự',ipa:'IPA tham khảo',unavailable:'Không có IPA'},
    fil:{latin:'Romanisasyon',ipa:'Tinatayang IPA',unavailable:'Wala pang maaasahang IPA'}
  };
  const pronunciationHelp = {
    fr:"Sous chaque traduction : écriture originale, puis pinyin, rōmaji ou transcription latine si nécessaire, puis API calculée à titre indicatif. La lecture audio utilise l'écriture originale.",
    en:"Each translation shows its original writing, romanization where needed, and automatically calculated approximate IPA. Audio reads the original text.",
    de:"Jede Übersetzung zeigt die Originalschrift, bei Bedarf eine Umschrift und eine automatisch berechnete ungefähre IPA-Lautschrift. Audio liest den Originaltext.",
    es:"Cada traducción muestra la escritura original, la transcripción latina cuando hace falta y un AFI aproximado calculado automáticamente. El audio lee el texto original.",
    it:"Ogni traduzione mostra la scrittura originale, la traslitterazione se necessaria e una trascrizione IPA indicativa calcolata automaticamente. L'audio legge il testo originale.",
    ru:"Каждый перевод показывает оригинальное написание, при необходимости латинскую транслитерацию и приблизительную МФА, рассчитанную автоматически. Озвучивается оригинал.",
    zh:"每条译文显示原文、必要时的拉丁转写以及自动生成的参考音标。语音朗读原文。",
    ja:"各翻訳には原文、必要に応じたローマ字、そして自動生成された参考用IPAを表示します。音声は原文を読み上げます。",
    vi:"Mỗi bản dịch hiển thị chữ viết gốc, chữ Latinh khi cần và phiên âm IPA được tính tự động để tham khảo. Âm thanh đọc văn bản gốc.",
    fil:"Ipinapakita ang orihinal na sulat at tinatayang IPA kung maaari. Ang orihinal na pangungusap ang binabasa ng audio."
  };
  const assumedFlayPoHelp = {
    fr:"En FlayPo, les termes en gras sont des formes supposées ou composées pour ce site : elles ne sont pas confirmées dans le dictionnaire de l’auteur. Chaque « <???> » désigne un groupe de sens encore à inventer. Les phrases restent des ébauches, même quand tous leurs mots sont attestés.",
    en:"In FlayPo, bold terms are forms I inferred or composed; they are not confirmed in the author's dictionary. Each « <???> » is a meaning group still to invent. All sentences remain drafts, even when their words are attested.",
    de:"In FlayPo kennzeichnen fett gedruckte Ausdrücke von mir erschlossene oder gebildete Formen, die im Wörterbuch nicht bestätigt sind. « <???> » bezeichnet jeweils eine noch zu erfindende Sinneinheit. Auch Sätze mit belegten Wörtern sind Entwürfe.",
    es:"En FlayPo, los términos en negrita son formas que he supuesto o compuesto y que no están confirmadas en el diccionario. Cada « <???> » señala un grupo de sentido pendiente de inventar. Las frases siguen siendo borradores, incluso si sus palabras están documentadas.",
    it:"In FlayPo, i termini in grassetto sono forme da me ipotizzate o composte, non confermate dal dizionario. Ogni « <???> » indica un gruppo di significato ancora da inventare. Le frasi restano bozze anche quando le parole sono attestate.",
    ru:"Во FlayPo жирным выделены формы, которые я предположил или составил сам: их нет среди подтверждённых слов словаря. « <???> » обозначает смысловую группу, для которой ещё нужно придумать слово. Все фразы остаются черновиками.",
    zh:"FlayPo 中的粗体词是我推测或组合的形式，尚未在作者词典中确认。每个「<???>」表示一个有待创造的意义单位。即使词语有记录，整句仍是草稿。",
    ja:"FlayPo の太字は、私が推測・組み合わせた形で、作者の辞書では確認されていません。「<???>」は今後作る必要がある意味のまとまりを示します。語が確認済みでも、文全体は草案です。",
    vi:"Trong FlayPo, chữ in đậm là dạng tôi suy đoán hoặc ghép lại, chưa được xác nhận trong từ điển. Mỗi « <???> » là một nhóm nghĩa cần tạo từ. Mọi câu vẫn là bản nháp dù các từ đã được ghi nhận.",
    fil:"Sa FlayPo, ang nakadiing mga termino ay mga anyong hinulaan o binuo ko at hindi pa kumpirmado sa diksyunaryo. Ang bawat « <???> » ay isang pangkat ng kahulugang kailangan pang likhain. Burador pa rin ang mga pangungusap kahit nakatala ang mga salita."
  };
  const phoneticCache = new Map();
  window.PHONETIC_DISCREPANCIES = [];
  let phoneticEngine, kanaConverter, pronunciationObserver;
  const copy = window.UI_TEXT;
  const guide = {
    fr:{audio:"Chaque traduction a son lecteur, avec une vitesse réglable.",tips:["Le bandeau des dix titres change la langue du site et celle de la phrase de départ. Le menu « Départ » fait la même chose.","Cochez plusieurs traductions, ou utilisez « Tout cocher ». Elles s’affichent selon l’ordre alphabétique de leurs noms français. La langue de départ est retirée de la sélection.","La recherche parcourt les onze langues, même celles qui ne sont pas cochées. Les filtres et les favoris aident à retrouver une phrase.","Vos langues choisies et vos favoris restent dans ce navigateur. Ils ne sont pas synchronisés entre appareils."]},
    en:{audio:"Each translation has its own player, with adjustable speed.",tips:["Click one of the ten names in the ribbon to change both the site language and the starting language. The “From” menu does the same.","Check several translations, or choose “Select all.” They appear alphabetically by their French language names. The starting language is removed from the selection.","Search covers all eleven languages, even those you haven't checked. Use the topic filters and favorites to find a phrase.","Your language choices and favorites stay in this browser. They do not sync across devices."]},
    de:{audio:"Jede Übersetzung hat eine eigene Vorlesefunktion mit einstellbarem Tempo.",tips:["Ein Klick auf einen der zehn Titel im Band ändert die Seitensprache und die Ausgangssprache. Das Menü „Ausgangssprache“ tut dasselbe.","Wählen Sie mehrere Zielsprachen oder „Alle auswählen“. Die Reihenfolge richtet sich nach den französischen Sprachnamen. Die Ausgangssprache wird aus der Auswahl entfernt.","Die Suche berücksichtigt alle elf Sprachen, auch nicht ausgewählte. Themenfilter und Favoriten helfen beim Wiederfinden.","Sprachauswahl und Favoriten bleiben in diesem Browser. Sie werden nicht mit anderen Geräten synchronisiert."]},
    es:{audio:"Cada traducción tiene su propio reproductor y puedes ajustar la velocidad.",tips:["Al pulsar uno de los diez títulos de la franja cambian el idioma del sitio y el idioma inicial. El menú «Idioma inicial» hace lo mismo.","Marca varias traducciones o pulsa «Seleccionar todo». Aparecen por orden alfabético de sus nombres en francés. El idioma inicial se quita de la selección.","La búsqueda abarca los once idiomas, incluso los que no están marcados. Los filtros y favoritos ayudan a encontrar una frase.","Los idiomas elegidos y los favoritos se guardan en este navegador. No se sincronizan entre dispositivos."]},
    it:{audio:"Ogni traduzione ha il proprio lettore e puoi regolare la velocità.",tips:["Un clic su uno dei dieci titoli della fascia cambia la lingua del sito e quella di partenza. Il menu «Lingua di partenza» fa lo stesso.","Seleziona più traduzioni oppure «Seleziona tutte». Appaiono in ordine alfabetico secondo i nomi francesi delle lingue. La lingua di partenza viene rimossa dalla selezione.","La ricerca comprende tutte le undici lingue, anche quelle non selezionate. Filtri e preferiti aiutano a ritrovare una frase.","Le lingue scelte e i preferiti restano in questo browser. Non si sincronizzano tra dispositivi."]},
    ru:{audio:"У каждого перевода есть своя кнопка прослушивания; скорость можно менять.",tips:["Нажатие на один из десяти заголовков меняет язык сайта и исходный язык. Меню «Исходный язык» работает так же.","Выберите несколько переводов или нажмите «Выбрать все». Их порядок определяется французскими названиями языков. Исходный язык исключается из списка переводов.","Поиск работает по всем одиннадцати языкам, даже не выбранным. Темы и избранное помогают найти нужную фразу.","Выбранные языки и избранное хранятся в этом браузере и не синхронизируются между устройствами."]},
    zh:{audio:"每条译文都有独立的播放按钮，语速可以调整。",tips:["点击横幅中的任一语言标题，会同时更改网站界面和原文语言。“原文语言”菜单也有同样的作用。","可以勾选多种译文语言，或点击“全选”。译文按语言的法语名称排序，原文语言会从译文列表中移除。","搜索覆盖全部十一种语言，包括未勾选的语言。还可以使用主题筛选和收藏。","所选语言和收藏只保存在当前浏览器中，不会在不同设备间同步。"]},
    ja:{audio:"翻訳ごとに再生ボタンがあり、速度も調整できます。",tips:["上部の10の名前から一つを押すと、サイトの表示言語と元の言語が一緒に変わります。「元の言語」メニューでも変更できます。","翻訳先は複数選べます。「すべて選択」も使えます。表示順はフランス語の言語名のアルファベット順で、元の言語は翻訳先から外れます。","検索対象は、選択していないものも含む11言語すべてです。テーマとお気に入りでも絞り込めます。","選択した言語とお気に入りはこのブラウザーにのみ保存され、端末間では同期されません。"]},
    vi:{audio:"Mỗi bản dịch có nút nghe riêng và bạn có thể chỉnh tốc độ.",tips:["Nhấn một trong mười tên trên dải đầu trang để đổi cả ngôn ngữ giao diện lẫn ngôn ngữ gốc. Menu “Ngôn ngữ gốc” cũng làm như vậy.","Bạn có thể chọn nhiều ngôn ngữ dịch hoặc “Chọn tất cả”. Các bản dịch xếp theo thứ tự chữ cái của tên tiếng Pháp; ngôn ngữ gốc được bỏ khỏi danh sách dịch.","Tìm kiếm bao gồm cả mười một ngôn ngữ, kể cả những ngôn ngữ chưa chọn. Bộ lọc chủ đề và mục yêu thích giúp tìm lại câu.","Ngôn ngữ đã chọn và câu yêu thích chỉ được lưu trong trình duyệt này, không đồng bộ giữa các thiết bị."]}
  };
  guide.fil = {
    audio:"May sariling pindutan sa pakikinig ang bawat salin. Puwede mong baguhin ang bilis.",
    tips:[
      "Piliin ang pamagat sa laso upang baguhin ang wika ng site at panimulang pangungusap.",
      "Pumili ng maraming wikang pagsasalin. Iniaayos ang mga ito ayon sa alpabetikong pangalan sa Pranses.",
      "Kasama sa paghahanap ang lahat ng wika. Naiiwan sa browser na ito ang mga paborito at piniling wika.",
      "Nakasalalay ang mga boses sa mga wikang naka-install sa iyong aparato."
    ]
  };
  const lexiconGuide = {
    fr:"La flèche dans la recherche ouvre le lexique : tous les mots employés dans les 100 phrases de la langue de départ, leur fréquence et une phrase en contexte. Cliquez sur un mot pour retrouver ses phrases.",
    en:"The arrow inside the search box opens a list of every word used in the 100 starting-language sentences, with a count and an example. Click a word to find its sentences.",
    de:"Der Pfeil im Suchfeld öffnet die Wortliste der 100 Sätze in der Ausgangssprache, mit Häufigkeit und Beispielsatz. Ein Klick auf ein Wort sucht danach.",
    es:"La flecha del buscador abre la lista de palabras usadas en las 100 frases del idioma inicial, con frecuencia y ejemplo. Pulsa una palabra para buscarla.",
    it:"La freccia nella ricerca apre l’elenco delle parole usate nelle 100 frasi della lingua di partenza, con frequenza ed esempio. Tocca una parola per cercarla.",
    ru:"Стрелка в поле поиска открывает список слов из 100 фраз исходного языка с частотой и примером. Нажмите на слово, чтобы найти его фразы.",
    zh:"搜索框中的箭头可展开原文语言100个句子所用词语的列表、频次和例句；点击词语可查找对应句子。",
    ja:"検索欄の矢印で、元の言語の100文に使われる言葉、出現回数、例文を表示できます。言葉を押すとその文を探せます。",
    vi:"Mũi tên trong ô tìm kiếm mở danh sách từ dùng trong 100 câu của ngôn ngữ gốc, kèm số lần và ví dụ. Nhấn vào một từ để tìm câu.",
    fil:"Binubuksan ng palaso sa kahon ng paghahanap ang listahan ng mga salitang ginamit sa 100 pangungusap ng panimulang wika, kasama ang dami at halimbawa. Pindutin ang salita upang hanapin ang pangungusap."
  };
  Object.entries(lexiconGuide).forEach(([key,tip])=>guide[key].tips.push(tip));
  const $ = selector => document.querySelector(selector);
  const synth = 'speechSynthesis' in window ? window.speechSynthesis : null;
  const state = { source:'fr', targets:new Set(['en']), theme:'Tout', query:'', favoritesOnly:false, favorites:new Set(), playing:null };
  const format = (s, params={}) => String(s).replace(/\{(\w+)\}/g, (_,key) => params[key] ?? '');
  const ui = () => copy[state.source] || copy.fr;
  const pronunciationCopy = () => pronunciationLabels[state.source] || pronunciationLabels.fr;
  const textNode = (tag, cls, value) => { const el=document.createElement(tag); if(cls) el.className=cls; el.textContent=value; return el; };
  const assumedFlayPoTerms = window.FLAYPO_ASSUMED_TERMS;
  const assumedFlayPoPattern = new RegExp(`(${[...assumedFlayPoTerms].sort((a,b)=>b.length-a.length).map(term=>term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')})`,'giu');
  const isAssumedFlayPo = term => [...assumedFlayPoTerms].some(known=>known.toLocaleLowerCase('fr')===term.toLocaleLowerCase('fr'));
  const button = (label, cls, title) => { const el=textNode('button',cls,label); el.type='button'; el.title=title; el.setAttribute('aria-label',title); return el; };
  const normalize = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase();
  const lexiconLabels = {
    fr:{button:'Lexique',heading:'Les mots des 100 phrases',intro:'Toutes les formes employées dans la langue de départ, avec leur fréquence et une phrase en contexte. Les traductions ci-dessous portent sur la phrase entière.',search:'Filtrer les mots',forms:'formes',used:'occurrences',close:'Fermer le lexique'},
    en:{button:'Lexicon',heading:'Words in the 100 sentences',intro:'Every word form used in the starting language, with its frequency and an example. The translation below is for the whole sentence.',search:'Filter words',forms:'word forms',used:'occurrences',close:'Close lexicon'},
    de:{button:'Wortliste',heading:'Wörter der 100 Sätze',intro:'Alle verwendeten Wortformen der Ausgangssprache, mit Häufigkeit und Beispielsatz. Die Übersetzung bezieht sich auf den ganzen Satz.',search:'Wörter filtern',forms:'Wortformen',used:'Vorkommen',close:'Wortliste schließen'},
    es:{button:'Léxico',heading:'Palabras de las 100 frases',intro:'Todas las formas usadas en la lengua inicial, con frecuencia y una frase de ejemplo. La traducción corresponde a la frase completa.',search:'Filtrar palabras',forms:'formas',used:'apariciones',close:'Cerrar léxico'},
    it:{button:'Lessico',heading:'Parole delle 100 frasi',intro:'Tutte le forme usate nella lingua di partenza, con frequenza e frase d’esempio. La traduzione riguarda l’intera frase.',search:'Filtra le parole',forms:'forme',used:'occorrenze',close:'Chiudi il lessico'},
    ru:{button:'Словарь',heading:'Слова из 100 фраз',intro:'Все словоформы исходного языка, частота и пример. Перевод относится ко всей фразе.',search:'Поиск слов',forms:'словоформ',used:'употреблений',close:'Закрыть словарь'},
    zh:{button:'词汇表',heading:'100个句子中的词语',intro:'列出原始语言中的词语、出现次数和例句。下方译文对应整句。',search:'筛选词语',forms:'个词语',used:'次出现',close:'关闭词汇表'},
    ja:{button:'語彙',heading:'100の文に出てくる言葉',intro:'元の言語に使われる語形、出現回数、例文を掲載。訳は文全体の意味です。',search:'言葉を絞り込む',forms:'語形',used:'回',close:'語彙を閉じる'},
    vi:{button:'Từ vựng',heading:'Từ trong 100 câu',intro:'Các dạng từ xuất hiện trong ngôn ngữ gốc, số lần và câu ví dụ. Bản dịch là của toàn bộ câu.',search:'Lọc từ',forms:'dạng từ',used:'lượt',close:'Đóng từ vựng'},
    fil:{button:'Talasalitaan',heading:'Mga salita sa 100 pangungusap',intro:'Lahat ng anyo ng salitang ginamit sa panimulang wika, kasama ang dami at halimbawang pangungusap. Ang salin ay para sa buong pangungusap.',search:'Salain ang mga salita',forms:'anyo ng salita',used:'paglitaw',close:'Isara ang talasalitaan'}
  };
  const lexiconCopy = () => lexiconLabels[state.source] || lexiconLabels.fr;
  const storage = (key,value) => { try { localStorage.setItem(key,JSON.stringify(value)); } catch (_) { /* Private mode. */ } };

  try { const favorites=JSON.parse(localStorage.getItem('parlons100.favorites')||'[]'); if(Array.isArray(favorites)) state.favorites=new Set(favorites.filter(n=>Number.isInteger(n)&&n>=0&&n<phrases.length)); } catch (_) { /* Defaults. */ }
  try {
    const prefs=JSON.parse(localStorage.getItem('hundred.sentences.languages.v1')||'null');
    if(prefs && languageByKey(prefs.source) && !languageByKey(prefs.source).targetOnly) state.source=prefs.source;
    if(prefs && Array.isArray(prefs.targets)) state.targets=new Set(prefs.targets.filter(key=>languageByKey(key)&&key!==state.source));
  } catch (_) { /* Defaults. */ }
  const saveLanguages = () => storage('hundred.sentences.languages.v1',{source:state.source,targets:[...state.targets]});

  function voiceFor(code) {
    if(!synth) return null;
    const voices=synth.getVoices();
    return voices.find(v=>v.lang.toLowerCase()===code.toLowerCase()) ||
      voices.find(v=>v.lang.split(/[-_]/)[0].toLowerCase()===code.split('-')[0].toLowerCase()) || null;
  }

  function stopAudio() {
    if(synth) synth.cancel();
    state.playing=null;
    document.querySelectorAll('.playing').forEach(el=>{el.classList.remove('playing');el.textContent='▶';});
  }

  function play(text,key,el) {
    if(!synth) { $('#status').textContent=ui().unsupported; return; }
    if(state.playing===el) {stopAudio();return;}
    stopAudio();
    const language=languageByKey(key), voice=voiceFor(language.speech);
    if(!voice) {$('#status').textContent=format(ui().voiceMissing,{language:language.label});return;}
    const utterance=new SpeechSynthesisUtterance(text);
    utterance.lang=language.speech; utterance.voice=voice; utterance.rate=Number($('#speech-rate').value);
    utterance.onend=()=>{if(state.playing===el)stopAudio();};
    utterance.onerror=e=>{if(state.playing===el)stopAudio();if(!['interrupted','canceled'].includes(e.error))$('#status').textContent=format(ui().error,{error:e.error});};
    state.playing=el; el.classList.add('playing'); el.textContent='■';
    $('#status').textContent=format(ui().playing,{language:language.label,voice:voice.name});
    synth.speak(utterance);
  }

  function playButton(phrase,key) {
    const title=format(ui().listen,{language:languageByKey(key).label,phrase:phrase[key]});
    const el=button('▶','icon-button',title);
    if(key==='flp' && phrase.flpMissing.length) {
      el.disabled=true;
      el.title='FlayPo : phrase incomplète, lecture non disponible.';
      el.setAttribute('aria-label',el.title);
      return el;
    }
    el.addEventListener('click',()=>play(key==='flp'?flaypoForFrenchVoice(phrase[key]):phrase[key],key,el));
    return el;
  }

  const ipaCodes = {fr:'fr',en:'en-us',de:'de',es:'es',it:'it',ru:'ru',zh:'cmn',ja:'ja',vi:'vi'};
  function flaypoForFrenchVoice(text) {
    return text.replace(/<\?\?\?>/g,' ').replace(/(?<=\p{Ll})(?=\p{Lu})/gu,' ').replace(/[+\-]/g,' ')
      .replace(/[ñõĩûux]/gi,letter=>({ñ:'an',õ:'on',ĩ:'in',û:'u',u:'ou',x:'ch'})[letter.toLowerCase()]||letter);
  }
  function indicativeTagalogIPA(text) {
    // A broad letter-to-sound reading: stress and many glottal stops cannot
    // be inferred from ordinary Filipino spelling.
    return text.toLocaleLowerCase('fil').replace(/mga/g,'maŋa')
      .replace(/\bng\b/g,'naŋ').replace(/ng/g,'ŋ')
      .replace(/ts/g,'t͡s').replace(/dy|j/g,'d͡ʒ')
      .replace(/sy/g,'ʃ').replace(/ny|ñ/g,'ɲ')
      .replace(/r/g,'ɾ').replace(/y/g,'j')
      .replace(/c(?=[ie])/g,'s').replace(/c/g,'k')
      .replace(/e/g,'ɛ').replace(/[!?.,…:;“”]/g,' ')
      .replace(/\s+/g,' ').trim();
  }
  function indicativeFlayPoIPA(text) {
    // Letter values follow the author's French-based spelling notes.
    // Unknown groups are omitted; stress and unresolved letters are not guessed.
    const phonemes={a:'a',b:'b',c:'?',d:'d',e:'ə',é:'e',è:'ɛ',
      f:'f',g:'g',h:'?',i:'i',ĩ:'ɛ̃',j:'ʒ',k:'k',l:'l',m:'m',
      n:'n',ñ:'ɑ̃',o:'o',õ:'ɔ̃',p:'p',q:'?',r:'ʁ',s:'s',
      t:'t',u:'u',û:'y',v:'v',w:'w',x:'ʃ',y:'j',z:'z'};
    const known=text.replace(/<\?\?\?>/g,' ').replace(/(?<=\p{Ll})(?=\p{Lu})/gu,' ').toLocaleLowerCase('fr')
      .split(/[\s+\-.,!?;:…]+/).filter(Boolean);
    return known.map(word=>[...word].map(letter=>phonemes[letter]||'?').join('')).join(' ')||'…';
  }
  const mandarinTones = phonemes => phonemes.replace(/3(?=[^0-9]*3)/g,'2').replace(/[1-5]/g,tone=>({
    1:'˥',2:'˧˥',3:'˨˩',4:'˥˩',5:'˧'
  })[tone]);
  const vietnameseTones = phonemes => phonemes.replace(/[1-7]/g,tone=>({
    1:'˧',2:'˨˩',3:'˧˥',4:'˧˩˧',5:'˧ˀ˥',6:'˨˩ˀ',7:'˧'
  })[tone]);
  async function ipaFor(phrase,key,index) {
    if(key==='fil')return indicativeTagalogIPA(phrase.fil);
    if(key==='flp')return indicativeFlayPoIPA(phrase.flp);
    const cacheKey=`${key}:${index}`;
    if(phoneticCache.has(cacheKey))return phoneticCache.get(cacheKey);
    phoneticEngine ||= import('https://cdn.jsdelivr.net/npm/@spelling-creator/spellophone@0.2.1/dist/browser.js')
      .then(({createEspeak})=>createEspeak({cdn:'jsdelivr',wasmUrl:'https://cdn.jsdelivr.net/npm/@spelling-creator/spellophone@0.2.1/wasm/espeak-ng.wasm'}));
    const engine=await phoneticEngine;
    await engine.loadVoice(ipaCodes[key]);
    let input=key==='flp'?flaypoForFrenchVoice(phrase.flp):phrase[key];
    if(key==='ja') {
      kanaConverter ||= import('https://cdn.jsdelivr.net/npm/wanakana@5.3.1/+esm');
      const converter=await kanaConverter;
      input=converter.toHiragana(readings.ja[index].replace(/ō/g,'ou').replace(/ū/g,'uu').replace(/-/g,' '));
    }
    engine.setVoice(ipaCodes[key]);
    let ipa=engine.phonemes(input).trim();
    if(key==='zh') {
      // The Hanzi voice is more dependable than eSpeak's handling of accented
      // pinyin, which can unexpectedly switch to English mid-phrase.
      ipa=index===0?'ni˧˥ xɑʊ̯˨˩':mandarinTones(ipa);
    }
    if(key==='vi')ipa=vietnameseTones(ipa);
    if(!ipa)throw new Error('No phonetic transcription');
    if(['ru','zh','ja'].includes(key)) {
      const roman=key==='ru'?window.romanizeRussian(phrase.ru):readings[key][index];
      // Kanji have no reliable direct reading in eSpeak NG: compare kana and romaji instead.
      const other=engine.phonemes(roman).trim();
      const comparison=key==='zh'?mandarinTones(other):other;
      if(comparison && comparison!==ipa)window.PHONETIC_DISCREPANCIES.push({index:index+1,language:key,native:ipa,latin:comparison});
      // Prefer Cyrillic, Hanzi or kana; Latin input can trigger wrong voice rules.
    }
    phoneticCache.set(cacheKey,ipa);
    return ipa;
  }

  function observePronunciations() {
    pronunciationObserver?.disconnect();
    const fill=async el=>{
      const index=Number(el.dataset.index), key=el.dataset.language;
      try {el.textContent=`${pronunciationCopy().ipa} : /${await ipaFor(phrases[index],key,index)}/`;}
      catch (_) {el.textContent=pronunciationCopy().unavailable;}
    };
    const nodes=document.querySelectorAll('.ipa-reading');
    if(!('IntersectionObserver' in window)) {nodes.forEach(fill);return;}
    pronunciationObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){pronunciationObserver.unobserve(entry.target);fill(entry.target);}
    }),{rootMargin:'240px'});
    nodes.forEach(el=>pronunciationObserver.observe(el));
  }

  function card(phrase,index) {
    const el=textNode('article','card','');
    const header=textNode('div','card-top','');
    const meta=textNode('div','card-meta','');
    meta.append(textNode('span','card-index',`Nº ${String(index+1).padStart(3,'0')}`),textNode('span','card-theme',ui().themes[phrase.theme]));
    const favorite=button(state.favorites.has(index)?'♥':'♡','icon-button favorite',state.favorites.has(index)?ui().removeFavorite:ui().addFavorite);
    favorite.setAttribute('aria-pressed',String(state.favorites.has(index)));
    favorite.addEventListener('click',()=>{state.favorites.has(index)?state.favorites.delete(index):state.favorites.add(index);storage('parlons100.favorites',[...state.favorites]);render();});
    header.append(meta,favorite);
    const source=textNode('div','source-phrase','');
    const label=textNode('span','source-language-label',languageByKey(state.source).label);label.lang=languageByKey(state.source).speech;
    const phraseLine=textNode('div','source-phrase-line','');
    const title=textNode('h3','card-title',phrase[state.source]);title.lang=languageByKey(state.source).speech;
    phraseLine.append(title);source.append(label,phraseLine);
    const translations=textNode('div','translations','');
    sortedLanguages.filter(l=>state.targets.has(l.key)).forEach(language=>{
      const row=textNode('div','translation-row','');
      const name=textNode('span','lang-name',language.label);name.lang=language.speech;
      const value=textNode('span','lang-text','');
      const original=textNode('span','translation-original','');original.lang=language.speech;
      if(language.key==='flp') {
        const fragments=phrase.flp.split(assumedFlayPoPattern);
        fragments.forEach(fragment=>{
          if(isAssumedFlayPo(fragment)) {
            const assumed=textNode('strong','flaypo-assumed',fragment);
            assumed.title='Terme FlayPo supposé, non confirmé dans le dictionnaire';
            original.append(assumed);
          } else original.append(document.createTextNode(fragment));
        });
      } else original.textContent=phrase[language.key];
      value.append(original);
      const romanization=language.key==='ru'?window.romanizeRussian(phrase.ru):readings[language.key]?.[index];
      if(romanization) {
        const readingKind=language.key==='zh'?'Pinyin':language.key==='ja'?'Rōmaji':pronunciationCopy().latin;
        const latin=textNode('span','latin-reading',`${readingKind} : ${romanization}`);
        latin.lang=language.key==='zh'?'zh-Latn-pinyin':language.key==='ja'?'ja-Latn':'ru-Latn';
        value.append(latin);
      }
      const ipa=textNode('span','ipa-reading',`${pronunciationCopy().ipa} : …`);
      ipa.dataset.index=index;ipa.dataset.language=language.key;
      value.append(ipa);
      if(language.key==='flp') {
        value.append(textNode('span','flaypo-note',phrase.flpMissing.length
          ? 'Ébauche · prononciation française approximative ; mots manquants non lus.'
          : 'Lecture et API indicatives d’après le français.'));
        if(phrase.flpMissing.length) {
          value.append(textNode('span','missing-groups',`À inventer : ${phrase.flpMissing.join(' · ')}`));
        }
      }
      row.append(name,value,playButton(phrase,language.key));translations.append(row);
    });
    el.append(header,source,translations);
    return el;
  }

  function renderFilters() {
    const host=$('#filters');host.replaceChildren();
    ['Tout',...new Set(phrases.map(p=>p.theme))].forEach(theme=>{
      const label=theme==='Tout'?ui().all:ui().themes[theme];
      const el=button(label,`filter${theme===state.theme?' active':''}`,format(ui().filter,{theme:label}));
      el.setAttribute('aria-pressed',String(theme===state.theme));
      el.addEventListener('click',()=>{state.theme=theme;renderFilters();render();});host.append(el);
    });
  }

  function render() {
    stopAudio();
    const q=normalize(state.query.trim());
    const visible=phrases.map((p,i)=>({p,i})).filter(({p,i})=>
      (state.theme==='Tout'||p.theme===state.theme)&&
      (!state.favoritesOnly||state.favorites.has(i))&&
      (!q||[p.theme,...languages.map(l=>p[l.key])].some(value=>normalize(value).includes(q)))
    );
    const fragment=document.createDocumentFragment();visible.forEach(({p,i})=>fragment.append(card(p,i)));
    $('#cards').replaceChildren(fragment);
    $('#cards').classList.toggle('many',state.targets.size>2);
    $('#empty').hidden=visible.length>0;
    $('#status').textContent=format(ui().count,{n:visible.length,total:phrases.length});
    observePronunciations();
  }

  function lexiconEntries() {
    const key=state.source, language=languageByKey(key), entries=new Map();
    const segmenter=typeof Intl.Segmenter==='function'
      ? new Intl.Segmenter(language.speech,{granularity:'word'}):null;
    phrases.forEach((phrase,index)=>{
      const segments=segmenter
        ? [...segmenter.segment(phrase[key])].filter(part=>part.isWordLike).map(part=>part.segment)
        : phrase[key].match(/[\p{L}\p{M}]+(?:['’][\p{L}\p{M}]+)*/gu)||[];
      segments.forEach(word=>{
        if(!/[\p{L}\p{M}]/u.test(word))return;
        const id=normalize(word);
        const current=entries.get(id)||{word,count:0,example:index};
        current.count++;
        entries.set(id,current);
      });
    });
    return [...entries.values()].sort((a,b)=>a.word.localeCompare(b.word,language.speech,{sensitivity:'base'}));
  }

  function renderLexicon() {
    if($('#lexicon-panel').hidden)return;
    const t=lexiconCopy(),q=normalize($('#lexicon-search').value.trim());
    const all=lexiconEntries(),visible=all.filter(entry=>normalize(entry.word).includes(q));
    $('#lexicon-summary').textContent=`${visible.length} / ${all.length} ${t.forms} · ${all.reduce((n,item)=>n+item.count,0)} ${t.used}`;
    const fragment=document.createDocumentFragment();
    visible.forEach(entry=>{
      const row=textNode('div','lexicon-entry','');
      const word=button(entry.word,'lexicon-word',entry.word);
      word.lang=languageByKey(state.source).speech;
      word.addEventListener('click',()=>{
        $('#search').value=entry.word;state.query=entry.word;
        setLexiconOpen(false);render();$('#cards').scrollIntoView({block:'start',behavior:'smooth'});
      });
      const count=textNode('span','lexicon-frequency',`× ${entry.count}`);
      const example=phrases[entry.example];
      const context=textNode('span','lexicon-context',example[state.source]);
      context.lang=languageByKey(state.source).speech;
      const translation=textNode('span','lexicon-translation',state.source==='fr'?example.en:example.fr);
      translation.lang=state.source==='fr'?'en-US':'fr-FR';
      row.append(word,count,context,translation);
      fragment.append(row);
    });
    $('#lexicon-list').replaceChildren(fragment);
  }

  function setLexiconOpen(open) {
    $('#lexicon-panel').hidden=!open;
    $('#lexicon-trigger').setAttribute('aria-expanded',String(open));
    $('#lexicon-trigger').textContent=open?'▴':'▾';
    if(open)renderLexicon();
  }

  function renderTargets() {
    const host=$('#language-options');host.replaceChildren();
    const toolbar=textNode('div','picker-toolbar','');
    const all=button(ui().selectAll,'picker-action',ui().selectAll);
    const none=button(ui().clear,'picker-action',ui().clear);
    all.addEventListener('click',()=>{state.targets=new Set(languages.filter(l=>l.key!==state.source).map(l=>l.key));saveLanguages();renderTargets();render();});
    none.addEventListener('click',()=>{state.targets.clear();saveLanguages();renderTargets();render();});
    toolbar.append(all,none);host.append(toolbar);
    sortedLanguages.filter(l=>l.key!==state.source).forEach(language=>{
      const label=textNode('label','language-choice','');
      const check=document.createElement('input');check.type='checkbox';check.value=language.key;check.checked=state.targets.has(language.key);
      const name=textNode('span','',language.label);
      label.append(check,name);
      check.addEventListener('change',()=>{check.checked?state.targets.add(language.key):state.targets.delete(language.key);saveLanguages();updateTargetSummary();render();});
      host.append(label);
    });
    updateTargetSummary();
  }

  function updateTargetSummary() {
    const labels=sortedLanguages.filter(l=>state.targets.has(l.key)).map(l=>l.label);
    $('#language-summary').textContent=labels.length?labels.join(', '):ui().none;
    $('#language-trigger').title=labels.length?labels.join(', '):ui().none;
  }

  function setPickerOpen(open) {
    $('#language-options').hidden=!open;
    $('#language-trigger').setAttribute('aria-expanded',String(open));
  }

  function localize() {
    const t=ui();document.documentElement.lang=languageByKey(state.source).speech;
    const l=lexiconCopy();
    $('#lexicon-trigger').textContent=$('#lexicon-panel').hidden?'▾':'▴';
    $('#lexicon-trigger').setAttribute('aria-label',l.heading);
    $('#lexicon-trigger').title=l.heading;
    $('#lexicon-kicker').textContent=l.button.toLocaleUpperCase(state.source);
    $('#lexicon-heading').textContent=l.heading;
    $('#lexicon-intro').textContent=l.intro;
    $('#lexicon-search-label').textContent=l.search;
    $('#lexicon-close').setAttribute('aria-label',l.close);
    document.title=`${t.siteName} — Hundred Sentences`;
    const ids={
      '#nav-explore':'navExplore','#nav-how':'navHow','#topbar-tag-text':'tag','#eyebrow-text':'eyebrow','#hero-first':'heroFirst','#hero-second':'heroSecond','#hero-intro':'intro','#hero-cta':'cta','#disc-small':'discSmall','#disc-caption':'discCaption','#stat-phrases':'statPhrases','#stat-languages':'statLanguages','#stat-ways':'statWays','#stat-motto':'motto','#explorer-kicker':'catalogKicker','#explorer-heading':'catalogHeading','#explorer-intro':'catalogIntro','#source-label':'source','#target-label':'target','#speed-label':'speed','#search-label':'searchLabel','#favorites-label':'favorites','#empty-title':'emptyTitle','#empty-description':'emptyDescription','#how-kicker':'howKicker','#how-first':'howFirst','#how-second':'howSecond','#how-step-1':'step1','#how-detail-1':'detail1','#how-step-2':'step2','#how-detail-2':'detail2','#how-step-3':'step3','#how-detail-3':'detail3','#voice-note':'note','#footer-caption':'footer','#footer-back':'back'
    };
    Object.entries(ids).forEach(([selector,key])=>$(selector).textContent=t[key]);
    $('#how-kicker').textContent=`01 / ${t.howKicker.replace(/^\d+\s*\/\s*/,'')}`;
    $('#explorer-kicker').textContent=`02 / ${t.catalogKicker.replace(/^\d+\s*\/\s*/,'')}`;
    $('#how-detail-2').textContent=guide[state.source].audio;
    const tips=document.createDocumentFragment();[...guide[state.source].tips,assumedFlayPoHelp[state.source],pronunciationHelp[state.source]].forEach(tip=>tips.append(textNode('li','',tip)));
    $('#guide-tips').replaceChildren(tips);
    $('#search').placeholder=t.placeholder;
    $('#source-language').setAttribute('aria-label',t.sourceLabel);
    document.querySelector('.topbar nav').setAttribute('aria-label',`${t.navExplore} / ${t.navHow}`);
    document.querySelector('.stats').setAttribute('aria-label',t.siteName);
    $('#language-options').setAttribute('aria-label',t.targetsLabel);
    $('#language-trigger').setAttribute('aria-label',t.targetsLabel);
    $('#language-ribbon').setAttribute('aria-label',t.chooseSite);
    $('#speech-rate').setAttribute('aria-label',t.speedLabel);
    $('#speed-slow').textContent=`${t.slow} · 0,75×`;
    $('#speed-normal').textContent=`${t.normal} · 1×`;
    $('#speed-fast').textContent=`${t.fast} · 1,2×`;
    $('#favorites-toggle').setAttribute('aria-label',t.favorites);
    $('#filters').setAttribute('aria-label',t.filter.replace(': {theme}',''));
    const brand=$('.topbar .brand');brand.setAttribute('aria-label',`${t.siteName}, ${t.navExplore}`);
    document.querySelectorAll('.brand strong').forEach(el=>el.textContent=t.siteName.toLocaleUpperCase(state.source));
    document.querySelectorAll('.brand-mark').forEach(el=>el.firstChild.textContent=t.siteName[0].toLocaleUpperCase(state.source));
    document.querySelectorAll('#language-ribbon button').forEach(el=>{
      if(el.dataset.lang===state.source)el.setAttribute('aria-current','true');else el.removeAttribute('aria-current');
    });
    renderTargets();renderFilters();render();renderLexicon();
  }

  function chooseSource(key) {
    if(!languageByKey(key) || languageByKey(key).targetOnly)return;
    state.source=key;state.targets.delete(key);
    $('#source-language').value=key;
    saveLanguages();setPickerOpen(false);localize();
  }

  sortedLanguages.filter(language=>!language.targetOnly).forEach(language=>$('#source-language').add(new Option(language.label,language.key)));
  $('#source-language').value=state.source;
  $('#source-language').addEventListener('change',e=>chooseSource(e.target.value));
  $('#lexicon-trigger').addEventListener('click',()=>{
    const opening=$('#lexicon-panel').hidden;
    setLexiconOpen(opening);
    if(opening)$('#lexicon-search').focus();
  });
  $('#lexicon-close').addEventListener('click',()=>{setLexiconOpen(false);$('#lexicon-trigger').focus();});
  $('#lexicon-search').addEventListener('input',renderLexicon);
  document.querySelectorAll('#language-ribbon button').forEach(el=>el.addEventListener('click',()=>chooseSource(el.dataset.lang)));
  $('#language-trigger').addEventListener('click',()=>setPickerOpen($('#language-options').hidden));
  document.addEventListener('click',e=>{if(!e.target.closest('.multi-picker'))setPickerOpen(false);});
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&!$('#language-options').hidden){setPickerOpen(false);$('#language-trigger').focus();}
    if(e.key==='Escape'&&!$('#lexicon-panel').hidden){setLexiconOpen(false);$('#lexicon-trigger').focus();}
  });
  $('#search').addEventListener('input',e=>{state.query=e.target.value;render();});
  $('#favorites-toggle').addEventListener('click',e=>{state.favoritesOnly=!state.favoritesOnly;e.currentTarget.setAttribute('aria-pressed',String(state.favoritesOnly));render();});
  window.addEventListener('pagehide',stopAudio);
  localize();
})();

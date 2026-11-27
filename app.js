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
    { key:'vi', label:'Tiếng Việt', french:'Vietnamien', speech:'vi-VN' }
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
    vi:{latin:'Phiên tự',ipa:'IPA tham khảo',unavailable:'Không có IPA'}
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
    vi:"Mỗi bản dịch hiển thị chữ viết gốc, chữ Latinh khi cần và phiên âm IPA được tính tự động để tham khảo. Âm thanh đọc văn bản gốc."
  };
  const phoneticCache = new Map();
  window.PHONETIC_DISCREPANCIES = [];
  let phoneticEngine, kanaConverter, pronunciationObserver;
  const copy = window.UI_TEXT;
  const guide = {
    fr:{audio:"Chaque traduction a son lecteur, avec une vitesse réglable.",tips:["Le bandeau des neuf titres change la langue du site et celle de la phrase de départ. Le menu « Départ » fait la même chose.","Cochez plusieurs traductions, ou utilisez « Tout cocher ». Elles s’affichent selon l’ordre alphabétique de leurs noms français. La langue de départ est retirée de la sélection.","La recherche parcourt les neuf langues, même celles qui ne sont pas cochées. Les filtres et les favoris aident à retrouver une phrase.","Vos langues choisies et vos favoris restent dans ce navigateur. Ils ne sont pas synchronisés entre appareils."]},
    en:{audio:"Each translation has its own player, with adjustable speed.",tips:["Click one of the nine names in the ribbon to change both the site language and the starting language. The “From” menu does the same.","Check several translations, or choose “Select all.” They appear alphabetically by their French language names. The starting language is removed from the selection.","Search covers all nine languages, even those you haven't checked. Use the topic filters and favorites to find a phrase.","Your language choices and favorites stay in this browser. They do not sync across devices."]},
    de:{audio:"Jede Übersetzung hat eine eigene Vorlesefunktion mit einstellbarem Tempo.",tips:["Ein Klick auf einen der neun Titel im Band ändert die Seitensprache und die Ausgangssprache. Das Menü „Ausgangssprache“ tut dasselbe.","Wählen Sie mehrere Zielsprachen oder „Alle auswählen“. Die Reihenfolge richtet sich nach den französischen Sprachnamen. Die Ausgangssprache wird aus der Auswahl entfernt.","Die Suche berücksichtigt alle neun Sprachen, auch nicht ausgewählte. Themenfilter und Favoriten helfen beim Wiederfinden.","Sprachauswahl und Favoriten bleiben in diesem Browser. Sie werden nicht mit anderen Geräten synchronisiert."]},
    es:{audio:"Cada traducción tiene su propio reproductor y puedes ajustar la velocidad.",tips:["Al pulsar uno de los nueve títulos de la franja cambian el idioma del sitio y el idioma inicial. El menú «Idioma inicial» hace lo mismo.","Marca varias traducciones o pulsa «Seleccionar todo». Aparecen por orden alfabético de sus nombres en francés. El idioma inicial se quita de la selección.","La búsqueda abarca los nueve idiomas, incluso los que no están marcados. Los filtros y favoritos ayudan a encontrar una frase.","Los idiomas elegidos y los favoritos se guardan en este navegador. No se sincronizan entre dispositivos."]},
    it:{audio:"Ogni traduzione ha il proprio lettore e puoi regolare la velocità.",tips:["Un clic su uno dei nove titoli della fascia cambia la lingua del sito e quella di partenza. Il menu «Lingua di partenza» fa lo stesso.","Seleziona più traduzioni oppure «Seleziona tutte». Appaiono in ordine alfabetico secondo i nomi francesi delle lingue. La lingua di partenza viene rimossa dalla selezione.","La ricerca comprende tutte le nove lingue, anche quelle non selezionate. Filtri e preferiti aiutano a ritrovare una frase.","Le lingue scelte e i preferiti restano in questo browser. Non si sincronizzano tra dispositivi."]},
    ru:{audio:"У каждого перевода есть своя кнопка прослушивания; скорость можно менять.",tips:["Нажатие на один из девяти заголовков меняет язык сайта и исходный язык. Меню «Исходный язык» работает так же.","Выберите несколько переводов или нажмите «Выбрать все». Их порядок определяется французскими названиями языков. Исходный язык исключается из списка переводов.","Поиск работает по всем девяти языкам, даже не выбранным. Темы и избранное помогают найти нужную фразу.","Выбранные языки и избранное хранятся в этом браузере и не синхронизируются между устройствами."]},
    zh:{audio:"每条译文都有独立的播放按钮，语速可以调整。",tips:["点击横幅中的任一语言标题，会同时更改网站界面和原文语言。“原文语言”菜单也有同样的作用。","可以勾选多种译文语言，或点击“全选”。译文按语言的法语名称排序，原文语言会从译文列表中移除。","搜索覆盖全部九种语言，包括未勾选的语言。还可以使用主题筛选和收藏。","所选语言和收藏只保存在当前浏览器中，不会在不同设备间同步。"]},
    ja:{audio:"翻訳ごとに再生ボタンがあり、速度も調整できます。",tips:["上部の9つの名前から一つを押すと、サイトの表示言語と元の言語が一緒に変わります。「元の言語」メニューでも変更できます。","翻訳先は複数選べます。「すべて選択」も使えます。表示順はフランス語の言語名のアルファベット順で、元の言語は翻訳先から外れます。","検索対象は、選択していないものも含む9言語すべてです。テーマとお気に入りでも絞り込めます。","選択した言語とお気に入りはこのブラウザーにのみ保存され、端末間では同期されません。"]},
    vi:{audio:"Mỗi bản dịch có nút nghe riêng và bạn có thể chỉnh tốc độ.",tips:["Nhấn một trong chín tên trên dải đầu trang để đổi cả ngôn ngữ giao diện lẫn ngôn ngữ gốc. Menu “Ngôn ngữ gốc” cũng làm như vậy.","Bạn có thể chọn nhiều ngôn ngữ dịch hoặc “Chọn tất cả”. Các bản dịch xếp theo thứ tự chữ cái của tên tiếng Pháp; ngôn ngữ gốc được bỏ khỏi danh sách dịch.","Tìm kiếm bao gồm cả chín ngôn ngữ, kể cả những ngôn ngữ chưa chọn. Bộ lọc chủ đề và mục yêu thích giúp tìm lại câu.","Ngôn ngữ đã chọn và câu yêu thích chỉ được lưu trong trình duyệt này, không đồng bộ giữa các thiết bị."]}
  };
  const $ = selector => document.querySelector(selector);
  const synth = 'speechSynthesis' in window ? window.speechSynthesis : null;
  const state = { source:'fr', targets:new Set(['en']), theme:'Tout', query:'', favoritesOnly:false, favorites:new Set(), playing:null };
  const format = (s, params={}) => String(s).replace(/\{(\w+)\}/g, (_,key) => params[key] ?? '');
  const ui = () => copy[state.source] || copy.fr;
  const pronunciationCopy = () => pronunciationLabels[state.source] || pronunciationLabels.fr;
  const textNode = (tag, cls, value) => { const el=document.createElement(tag); if(cls) el.className=cls; el.textContent=value; return el; };
  const button = (label, cls, title) => { const el=textNode('button',cls,label); el.type='button'; el.title=title; el.setAttribute('aria-label',title); return el; };
  const normalize = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase();
  const storage = (key,value) => { try { localStorage.setItem(key,JSON.stringify(value)); } catch (_) { /* Private mode. */ } };

  try { const favorites=JSON.parse(localStorage.getItem('parlons100.favorites')||'[]'); if(Array.isArray(favorites)) state.favorites=new Set(favorites.filter(n=>Number.isInteger(n)&&n>=0&&n<phrases.length)); } catch (_) { /* Defaults. */ }
  try {
    const prefs=JSON.parse(localStorage.getItem('hundred.sentences.languages.v1')||'null');
    if(prefs && languageByKey(prefs.source)) state.source=prefs.source;
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
    el.addEventListener('click',()=>play(phrase[key],key,el));
    return el;
  }

  const ipaCodes = {fr:'fr',en:'en-us',de:'de',es:'es',it:'it',ru:'ru',zh:'cmn',ja:'ja',vi:'vi'};
  const mandarinTones = phonemes => phonemes.replace(/3(?=[^0-9]*3)/g,'2').replace(/[1-5]/g,tone=>({
    1:'˥',2:'˧˥',3:'˨˩',4:'˥˩',5:'˧'
  })[tone]);
  async function ipaFor(phrase,key,index) {
    const cacheKey=`${key}:${index}`;
    if(phoneticCache.has(cacheKey))return phoneticCache.get(cacheKey);
    phoneticEngine ||= import('https://cdn.jsdelivr.net/npm/@spelling-creator/spellophone@0.2.1/dist/browser.js')
      .then(({createEspeak})=>createEspeak({cdn:'jsdelivr',wasmUrl:'https://cdn.jsdelivr.net/npm/@spelling-creator/spellophone@0.2.1/wasm/espeak-ng.wasm'}));
    const engine=await phoneticEngine;
    await engine.loadVoice(ipaCodes[key]);
    let input=key==='zh'?readings.zh[index]:phrase[key];
    if(key==='ja') {
      kanaConverter ||= import('https://cdn.jsdelivr.net/npm/wanakana@5.3.1/+esm');
      const converter=await kanaConverter;
      input=converter.toHiragana(readings.ja[index].replace(/ō/g,'ou').replace(/ū/g,'uu').replace(/-/g,' '));
    }
    engine.setVoice(ipaCodes[key]);
    let ipa=engine.phonemes(input).trim();
    if(key==='zh') {
      // eSpeak NG accepts tone-marked pinyin. Apply common third-tone sandhi,
      // then render tone numbers as IPA tone letters instead of ASCII digits.
      ipa=mandarinTones(ipa);
    }
    if(!ipa)throw new Error('No phonetic transcription');
    if(['ru','zh','ja'].includes(key)) {
      const roman=key==='ru'?window.romanizeRussian(phrase.ru):readings[key][index];
      // Kanji have no reliable direct reading in eSpeak NG: compare kana and romaji instead.
      const other=engine.phonemes(key==='zh'?phrase.zh:roman).trim();
      const comparison=key==='zh'?mandarinTones(other):other;
      if(comparison && comparison!==ipa)window.PHONETIC_DISCREPANCIES.push({index:index+1,language:key,native:ipa,latin:comparison});
      // Cyrillic wins for Russian; tonal pinyin wins for Mandarin; kana wins for Japanese.
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
      const original=textNode('span','translation-original',phrase[language.key]);original.lang=language.speech;
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
    document.title=`${t.siteName} — Hundred Sentences`;
    const ids={
      '#nav-explore':'navExplore','#nav-how':'navHow','#topbar-tag-text':'tag','#eyebrow-text':'eyebrow','#hero-first':'heroFirst','#hero-second':'heroSecond','#hero-intro':'intro','#hero-cta':'cta','#disc-small':'discSmall','#disc-caption':'discCaption','#stat-phrases':'statPhrases','#stat-languages':'statLanguages','#stat-ways':'statWays','#stat-motto':'motto','#explorer-kicker':'catalogKicker','#explorer-heading':'catalogHeading','#explorer-intro':'catalogIntro','#source-label':'source','#target-label':'target','#speed-label':'speed','#search-label':'searchLabel','#favorites-label':'favorites','#empty-title':'emptyTitle','#empty-description':'emptyDescription','#how-kicker':'howKicker','#how-first':'howFirst','#how-second':'howSecond','#how-step-1':'step1','#how-detail-1':'detail1','#how-step-2':'step2','#how-detail-2':'detail2','#how-step-3':'step3','#how-detail-3':'detail3','#voice-note':'note','#footer-caption':'footer','#footer-back':'back'
    };
    Object.entries(ids).forEach(([selector,key])=>$(selector).textContent=t[key]);
    $('#how-kicker').textContent=`01 / ${t.howKicker.replace(/^\d+\s*\/\s*/,'')}`;
    $('#explorer-kicker').textContent=`02 / ${t.catalogKicker.replace(/^\d+\s*\/\s*/,'')}`;
    $('#how-detail-2').textContent=guide[state.source].audio;
    const tips=document.createDocumentFragment();[...guide[state.source].tips,pronunciationHelp[state.source]].forEach(tip=>tips.append(textNode('li','',tip)));
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
    renderTargets();renderFilters();render();
  }

  function chooseSource(key) {
    if(!languageByKey(key))return;
    state.source=key;state.targets.delete(key);
    $('#source-language').value=key;
    saveLanguages();setPickerOpen(false);localize();
  }

  sortedLanguages.forEach(language=>$('#source-language').add(new Option(language.label,language.key)));
  $('#source-language').value=state.source;
  $('#source-language').addEventListener('change',e=>chooseSource(e.target.value));
  document.querySelectorAll('#language-ribbon button').forEach(el=>el.addEventListener('click',()=>chooseSource(el.dataset.lang)));
  $('#language-trigger').addEventListener('click',()=>setPickerOpen($('#language-options').hidden));
  document.addEventListener('click',e=>{if(!e.target.closest('.multi-picker'))setPickerOpen(false);});
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&!$('#language-options').hidden){setPickerOpen(false);$('#language-trigger').focus();}
    if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();$('#search').focus();}
  });
  $('#search').addEventListener('input',e=>{state.query=e.target.value;render();});
  $('#favorites-toggle').addEventListener('click',e=>{state.favoritesOnly=!state.favoritesOnly;e.currentTarget.setAttribute('aria-pressed',String(state.favoritesOnly));render();});
  window.addEventListener('pagehide',stopAudio);
  localize();
})();

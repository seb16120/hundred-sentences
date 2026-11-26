/* The phrase catalogue is defined in phrases.js so the page also works as a local file. */
(() => {
  'use strict';
  const languages = [
    { key: 'fr', label: 'Français', speech: 'fr-FR' },
    { key: 'en', label: 'English', speech: 'en-US' },
    { key: 'de', label: 'Deutsch', speech: 'de-DE' },
    { key: 'es', label: 'Español', speech: 'es-ES' },
    { key: 'it', label: 'Italiano', speech: 'it-IT' },
    { key: 'ru', label: 'Русский', speech: 'ru-RU' },
    { key: 'zh', label: '中文', speech: 'zh-CN' },
    { key: 'ja', label: '日本語', speech: 'ja-JP' },
    { key: 'vi', label: 'Tiếng Việt', speech: 'vi-VN' }
  ];
  const phrases = Array.isArray(window.PHRASES) ? window.PHRASES : [];
  const $ = (selector) => document.querySelector(selector);
  const cardHost = $('#cards');
  const status = $('#status');
  const synth = 'speechSynthesis' in window ? window.speechSynthesis : null;
  const state = { language: 'en', theme: 'Tout', query: '', favoritesOnly: false, expanded: new Set(), favorites: new Set(), playing: null };
  try { state.favorites = new Set(JSON.parse(localStorage.getItem('parlons100.favorites') || '[]')); } catch (_) { /* Private mode may block storage. */ }

  const normalize = (s) => String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
  const textNode = (tag, cls, value) => { const el = document.createElement(tag); if (cls) el.className = cls; el.textContent = value; return el; };
  const button = (label, cls, title) => { const el = document.createElement('button'); el.type = 'button'; el.className = cls; el.textContent = label; el.title = title; el.setAttribute('aria-label', title); return el; };
  const languageByKey = (key) => languages.find((lang) => lang.key === key);
  const saveFavorites = () => { try { localStorage.setItem('parlons100.favorites', JSON.stringify([...state.favorites])); } catch (_) { /* The UI still works in memory. */ } };

  function voiceFor(langCode) {
    if (!synth) return null;
    const voices = synth.getVoices();
    const exact = voices.find(v => v.lang.toLowerCase() === langCode.toLowerCase());
    if (exact) return exact;
    const primary = langCode.split('-')[0].toLowerCase();
    return voices.find(v => v.lang.split(/[-_]/)[0].toLowerCase() === primary) || null;
  }

  function stopAudio() {
    if (synth) synth.cancel();
    state.playing = null;
    document.querySelectorAll('.playing').forEach(el => { el.classList.remove('playing'); el.textContent = '▶'; });
  }

  function play(text, key, el) {
    if (!synth) { status.textContent = 'La lecture vocale n’est pas prise en charge par ce navigateur.'; return; }
    if (state.playing === el) { stopAudio(); return; }
    stopAudio();
    const language = languageByKey(key);
    const voice = voiceFor(language.speech);
    if (!voice) {
      status.textContent = `Aucune voix ${language.label} n’est disponible ici. Installez une voix ${language.label} sur votre appareil, puis rechargez la page.`;
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language.speech;
    utterance.voice = voice;
    utterance.rate = Number($('#speech-rate').value);
    utterance.onend = () => { if (state.playing === el) stopAudio(); };
    utterance.onerror = (event) => { if (state.playing === el) stopAudio(); if (event.error !== 'interrupted' && event.error !== 'canceled') status.textContent = `Lecture impossible : ${event.error}.`; };
    state.playing = el;
    el.classList.add('playing'); el.textContent = '■';
    status.textContent = `Lecture en ${language.label} : ${voice.name}.`;
    synth.speak(utterance);
  }

  function playButton(phrase, key) {
    const el = button('▶', 'icon-button', `Écouter en ${languageByKey(key).label} : ${phrase[key]}`);
    el.addEventListener('click', () => play(phrase[key], key, el));
    return el;
  }

  function card(phrase, index) {
    const el = textNode('article', 'card', '');
    const top = textNode('div', 'card-top', '');
    top.append(textNode('span', 'card-index', `Nº ${String(index + 1).padStart(3, '0')}`), textNode('span', 'card-theme', phrase.theme.toLocaleUpperCase('fr')));
    const title = textNode('h3', 'card-title', phrase.fr);
    const translation = textNode('p', 'card-translation', phrase[state.language]);
    translation.lang = languageByKey(state.language).speech;
    const bottom = textNode('div', 'card-bottom', '');
    const actions = textNode('div', 'card-actions', '');
    actions.append(playButton(phrase, 'fr'), playButton(phrase, state.language));
    const favorite = button(state.favorites.has(index) ? '♥' : '♡', 'icon-button favorite', 'Ajouter ou retirer des favorites');
    favorite.setAttribute('aria-pressed', String(state.favorites.has(index)));
    favorite.addEventListener('click', () => { state.favorites.has(index) ? state.favorites.delete(index) : state.favorites.add(index); saveFavorites(); render(); });
    actions.append(favorite);
    const expanded = state.expanded.has(index);
    const expand = button(expanded ? 'Masquer ↑' : '9 langues ↗', 'expand', expanded ? 'Masquer les autres langues' : 'Voir les neuf langues');
    expand.setAttribute('aria-expanded', String(expanded));
    expand.addEventListener('click', () => { expanded ? state.expanded.delete(index) : state.expanded.add(index); render(); });
    bottom.append(actions, expand);
    el.append(top, title, translation, bottom);
    if (expanded) {
      const more = textNode('div', 'more-languages', '');
      languages.forEach(language => {
        const line = textNode('div', 'lang-line', '');
        line.append(textNode('span', 'lang-name', language.label));
        const value = textNode('span', 'lang-text', phrase[language.key]); value.lang = language.speech;
        line.append(value, playButton(phrase, language.key)); more.append(line);
      });
      el.append(more);
    }
    return el;
  }

  function renderFilters() {
    const host = $('#filters'); host.replaceChildren();
    ['Tout', ...new Set(phrases.map(p => p.theme))].forEach(theme => {
      const el = button(theme, `filter${theme === state.theme ? ' active' : ''}`, `Filtrer : ${theme}`);
      el.setAttribute('aria-pressed', String(theme === state.theme));
      el.addEventListener('click', () => { state.theme = theme; renderFilters(); render(); });
      host.append(el);
    });
  }

  function render() {
    stopAudio();
    const q = normalize(state.query.trim());
    const visible = phrases.map((p, i) => ({ p, i })).filter(({p, i}) =>
      (state.theme === 'Tout' || p.theme === state.theme) &&
      (!state.favoritesOnly || state.favorites.has(i)) &&
      (!q || [p.theme, ...languages.map(lang => p[lang.key])].some(value => normalize(value).includes(q)))
    );
    const fragment = document.createDocumentFragment();
    visible.forEach(({p, i}) => fragment.append(card(p, i)));
    cardHost.replaceChildren(fragment);
    $('#empty').hidden = visible.length > 0;
    status.textContent = `${visible.length} phrase${visible.length > 1 ? 's' : ''} affichée${visible.length > 1 ? 's' : ''} sur ${phrases.length}.`;
  }

  languages.filter(l => l.key !== 'fr').forEach(lang => { const option = new Option(lang.label, lang.key); $('#target-language').add(option); });
  $('#target-language').addEventListener('change', e => { state.language = e.target.value; render(); });
  $('#search').addEventListener('input', e => { state.query = e.target.value; render(); });
  $('#favorites-toggle').addEventListener('click', e => { state.favoritesOnly = !state.favoritesOnly; e.currentTarget.setAttribute('aria-pressed', String(state.favoritesOnly)); render(); });
  document.addEventListener('keydown', e => { if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) { e.preventDefault(); $('#search').focus(); } });
  window.addEventListener('pagehide', stopAudio);
  renderFilters(); render();
})();

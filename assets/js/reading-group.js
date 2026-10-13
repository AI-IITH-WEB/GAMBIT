/* ===================================================================
   GAMBIT Lab Reading Group
   Everything on the Reading Group page comes from this file.

   WEEKLY UPDATE: add ONE block to `sessions` below (anywhere in the list;
   the page sorts by date). Sessions dated today or later appear under
   "Up next"; earlier ones move to "Past sessions" automatically.

     {
       date: '2026-10-16',            // YYYY-MM-DD (required)
       theme: 'md',                   // id from `themes` below; use ['md', 'info'] for several
       title: 'Paper title',          // required
       authors: 'A. Author, B. Author',
       venue: 'EC 2024',              // conference / journal / arXiv
       link: 'https://arxiv.org/abs/...',
       presenter: 'Presenter name',
       slides: 'https://...',         // optional, add after the session
       notes: 'One-line takeaway or discussion question'   // optional
     },

   Theme ids:  gt = Game Theory,  md = Mechanism Design,
               info = Information Design,  fin = AI in Finance,
               agentic = Mechanism Design for Agentic Control
   =================================================================== */

window.GAMBIT_READING_GROUP = {

  // Meeting details - leave '' to hide any of them.
  schedule: {
    frequency: 'Weekly',
    day: '',        // e.g. 'Fridays'
    time: '',       // e.g. '4:00 - 5:00 PM'
    venue: ''       // e.g. 'Room 711, C Block'
  },

  themes: [
    { id: 'gt',      name: 'Game Theory',                          icon: 'fa-chess-knight',
      blurb: 'Strategic interaction, equilibrium concepts and learning in games.' },
    { id: 'md',      name: 'Mechanism Design',                     icon: 'fa-gears',
      blurb: 'Designing rules, auctions and incentives so that self-interested agents reach good outcomes.' },
    { id: 'info',    name: 'Information Design',                   icon: 'fa-eye',
      blurb: 'Bayesian persuasion and how what agents know shapes what they do.' },
    { id: 'fin',     name: 'AI in Finance',                        icon: 'fa-chart-line',
      blurb: 'Learning and strategic decision-making in markets and financial systems.' },
    { id: 'agentic', name: 'Mechanism Design for Agentic Control', icon: 'fa-robot',
      blurb: 'Incentives, oversight and governance for autonomous AI agents.' }
  ],

  sessions: [
    // Add sessions here (see the template at the top of this file).
  ]
};


/* ---------- Rendering (no need to edit below this line) ---------- */
(function () {
  "use strict";

  const data = window.GAMBIT_READING_GROUP || {};
  const themes = data.themes || [];
  const themeById = Object.fromEntries(themes.map(t => [t.id, t]));
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function icon(name) {
    const i = el('i', 'fa-solid ' + name);
    i.setAttribute('aria-hidden', 'true');
    return i;
  }

  function safeHref(href) {
    return typeof href === 'string' && /^(https?:\/\/|[\w.\-\/#]+$)/i.test(href) ? href : null;
  }

  function link(href, text, className, iconName) {
    const url = safeHref(href);
    if (!url) return null;
    const a = el('a', className);
    if (iconName) a.appendChild(icon(iconName));
    a.appendChild(document.createTextNode(text));
    a.href = url;
    if (/^https?:\/\//i.test(url)) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
    return a;
  }

  function parseDate(s) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || '').trim());
    return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
  }

  function formatDate(d) {
    return DAYS[d.getDay()] + ', ' + d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
  }

  function themeIds(s) {
    return (Array.isArray(s.theme) ? s.theme : [s.theme]).filter(id => themeById[id]);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sessions = (data.sessions || [])
    .map(s => Object.assign({}, s, { _date: parseDate(s.date), _themes: themeIds(s) }))
    .filter(s => s._date && s.title);
  const upcoming = sessions.filter(s => s._date >= today).sort((a, b) => a._date - b._date);
  const past = sessions.filter(s => s._date < today).sort((a, b) => b._date - a._date);

  function themeTags(s) {
    const wrap = el('div', 'rg-tags');
    s._themes.forEach(id => wrap.appendChild(el('span', 'rg-tag rg-tag-' + id, themeById[id].name)));
    return wrap;
  }

  function paperBlock(s, titleTag) {
    const frag = document.createDocumentFragment();
    frag.appendChild(themeTags(s));
    frag.appendChild(el(titleTag, 'rg-title', s.title));
    const by = [s.authors, s.venue].filter(Boolean).join(' · ');
    if (by) frag.appendChild(el('p', 'rg-paper-meta', by));
    if (s.notes) frag.appendChild(el('p', 'rg-notes', s.notes));

    const foot = el('div', 'rg-foot');
    if (s.presenter) {
      const p = el('span', 'rg-presenter');
      p.appendChild(icon('fa-user'));
      p.appendChild(document.createTextNode('Presenter: ' + s.presenter));
      foot.appendChild(p);
    }
    const paper = link(s.link, 'Paper', 'rg-link', 'fa-file-lines');
    const slides = link(s.slides, 'Slides', 'rg-link', 'fa-person-chalkboard');
    if (paper) foot.appendChild(paper);
    if (slides) foot.appendChild(slides);
    if (foot.childNodes.length) frag.appendChild(foot);
    return frag;
  }

  /* --- Meeting details --- */
  const meta = document.getElementById('rg-meta');
  if (meta) {
    const sch = data.schedule || {};
    [['fa-repeat', sch.frequency], ['fa-calendar-days', sch.day], ['fa-clock', sch.time], ['fa-location-dot', sch.venue]]
      .filter(([, v]) => v)
      .forEach(([ic, v]) => {
        const chip = el('span', 'rg-meta-chip');
        chip.appendChild(icon(ic));
        chip.appendChild(document.createTextNode(v));
        meta.appendChild(chip);
      });
  }

  /* --- Up next --- */
  const next = document.getElementById('rg-next');
  if (next) {
    if (upcoming.length) {
      const first = upcoming[0];
      const card = el('article', 'rg-next-card');
      const when = el('div', 'rg-next-date');
      when.appendChild(el('span', 'rg-next-day', String(first._date.getDate())));
      when.appendChild(el('span', 'rg-next-month', MONTHS[first._date.getMonth()] + ' ' + first._date.getFullYear()));
      card.appendChild(when);
      const body = el('div', 'rg-next-body');
      body.appendChild(el('div', 'rg-next-label', formatDate(first._date)));
      body.appendChild(paperBlock(first, 'h3'));
      card.appendChild(body);
      next.appendChild(card);

      if (upcoming.length > 1) {
        next.appendChild(el('h4', 'rg-subhead', 'Also coming up'));
        const ul = el('ul', 'rg-list');
        upcoming.slice(1).forEach(s => ul.appendChild(sessionItem(s)));
        next.appendChild(ul);
      }
    } else {
      const empty = el('div', 'rg-empty');
      empty.appendChild(icon('fa-calendar-plus'));
      empty.appendChild(el('p', '', 'The next session will be announced here soon.'));
      next.appendChild(empty);
    }
  }

  function sessionItem(s) {
    const li = el('li', 'rg-item');
    li.dataset.themes = s._themes.join(' ');
    li.appendChild(el('div', 'rg-item-date', formatDate(s._date)));
    const body = el('div', 'rg-item-body');
    body.appendChild(paperBlock(s, 'h5'));
    li.appendChild(body);
    return li;
  }

  /* --- Past sessions with theme filter --- */
  const pastList = document.getElementById('rg-past');
  const filters = document.getElementById('rg-filters');
  let applyFilter = () => {};

  if (pastList) {
    past.forEach(s => pastList.appendChild(sessionItem(s)));
    const none = el('li', 'rg-empty-row', past.length ? 'No past sessions on this theme yet.' : 'Past sessions will be listed here.');
    none.hidden = past.length > 0;
    pastList.appendChild(none);

    applyFilter = id => {
      let shown = 0;
      pastList.querySelectorAll('.rg-item').forEach(li => {
        const match = id === 'all' || li.dataset.themes.split(' ').includes(id);
        li.hidden = !match;
        if (match) shown++;
      });
      none.hidden = shown > 0;
      if (filters) {
        filters.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.theme === id));
      }
    };

    if (filters) {
      [{ id: 'all', name: 'All' }].concat(themes).forEach(t => {
        const b = el('button', 'rg-filter', t.name);
        b.type = 'button';
        b.dataset.theme = t.id;
        b.setAttribute('aria-pressed', t.id === 'all');
        b.addEventListener('click', () => applyFilter(t.id));
        filters.appendChild(b);
      });
    }
  }

  /* --- Theme cards --- */
  const themeGrid = document.getElementById('rg-themes');
  if (themeGrid) {
    themes.forEach(t => {
      const count = past.filter(s => s._themes.includes(t.id)).length;
      const card = el('button', 'rg-theme rg-theme-' + t.id);
      card.type = 'button';
      card.setAttribute('aria-label', t.name + ': show past sessions');
      const ic = el('span', 'rg-theme-icon');
      ic.appendChild(icon(t.icon));
      card.appendChild(ic);
      card.appendChild(el('span', 'rg-theme-name', t.name));
      card.appendChild(el('span', 'rg-theme-blurb', t.blurb));
      if (count) card.appendChild(el('span', 'rg-theme-count', count === 1 ? '1 session' : count + ' sessions'));
      card.addEventListener('click', () => {
        applyFilter(t.id);
        const target = document.getElementById('rg-archive');
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      themeGrid.appendChild(card);
    });
  }
})();

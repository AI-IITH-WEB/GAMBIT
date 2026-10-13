/* ===================================================================
   GAMBIT Lab Reading Group
   Everything on the Reading Group page comes from this file.

   WEEKLY UPDATE: add ONE block to `sessions` below (anywhere in the list;
   the page sorts by date). Sessions dated today or later appear under
   "Up next"; earlier ones move to "Past sessions" automatically.

     {
       date: '2026-10-16',            // YYYY-MM-DD of the (first) session (required)
       weeks: 1,                      // optional: number of weekly sessions the paper took
       part: 'Part 1',                // optional: for a paper still in progress
       theme: 'md',                   // id from `themes` below; use ['md', 'info'] for several
       title: 'Paper title',          // required
       authors: 'A. Author, B. Author',
       venue: 'EC 2024',              // conference / journal / arXiv
       link: 'https://arxiv.org/abs/...',
       presenter: 'Presenter name',
       description: 'Two or three sentences on what the paper does.',
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
    {
      date: '2026-10-13',
      part: 'Part 1',
      theme: 'info',
      title: 'Strategic Information Transmission',
      authors: 'Vincent P. Crawford, Joel Sobel',
      venue: 'Econometrica, 1982',
      link: 'https://www.jstor.org/stable/1913390',
      presenter: 'Kush Mathukiya',
      description: 'The foundational cheap-talk model: an informed sender advises a receiver whose interests differ. Every equilibrium partitions the state space, so the sender reveals only coarse information, and less is communicated the more their preferences diverge.'
    },
    {
      date: '2026-09-29',
      weeks: 2,
      theme: ['info', 'fin'],
      title: 'Information, Trade and Common Knowledge',
      authors: 'Paul Milgrom, Nancy Stokey',
      venue: 'Journal of Economic Theory, 1982',
      link: 'https://web.stanford.edu/~milgrom/publishedarticles/Information%20Trade%20and%20Common%20Knowledge.pdf',
      presenter: 'Kush Mathukiya',
      description: 'The no-trade theorem: when traders share a common prior and a trade is common knowledge, differences in private information alone cannot create a motive for speculative trade.'
    },
    {
      date: '2026-09-15',
      weeks: 2,
      theme: 'gt',
      title: 'Strategic Classification with Externalities',
      authors: 'Safwan Hossain, Evi Micha, Yiling Chen, Ariel Procaccia',
      venue: 'arXiv 2024',
      link: 'https://arxiv.org/pdf/2410.08032',
      presenter: 'Siddharth Shrivastava',
      description: 'Extends strategic classification to settings where one agent\u2019s manipulation affects others. The learner\u2013agent interaction is a Stackelberg game; under mild assumptions the agents\u2019 game has a unique, efficiently computable pure Nash equilibrium, which yields PAC learning guarantees and gradient-based training of classifiers.'
    },
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

  // "15 \u2013 22 Sep 2026" / "29 Sep \u2013 6 Oct 2026" for multi-week papers
  function formatRange(a, b) {
    if (a.getTime() === b.getTime()) return formatDate(a);
    const end = b.getDate() + ' ' + MONTHS[b.getMonth()] + ' ' + b.getFullYear();
    if (a.getFullYear() !== b.getFullYear()) return a.getDate() + ' ' + MONTHS[a.getMonth()] + ' ' + a.getFullYear() + ' \u2013 ' + end;
    if (a.getMonth() !== b.getMonth()) return a.getDate() + ' ' + MONTHS[a.getMonth()] + ' \u2013 ' + end;
    return a.getDate() + ' \u2013 ' + end;
  }

  function addDays(d, n) {
    const x = new Date(d);
    x.setDate(x.getDate() + n);
    return x;
  }

  function themeIds(s) {
    return (Array.isArray(s.theme) ? s.theme : [s.theme]).filter(id => themeById[id]);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sessions = (data.sessions || [])
    .map(s => {
      const start = parseDate(s.date);
      const weeks = Math.max(1, parseInt(s.weeks, 10) || 1);
      return Object.assign({}, s, {
        _date: start,
        _end: start && addDays(start, 7 * (weeks - 1)),
        _weeks: weeks,
        _themes: themeIds(s)
      });
    })
    .filter(s => s._date && s.title);
  // A paper stays "Up next" until its last session has passed.
  const upcoming = sessions.filter(s => s._end >= today).sort((a, b) => a._date - b._date);
  const past = sessions.filter(s => s._end < today).sort((a, b) => b._end - a._end);

  function whenLabel(s) {
    if (s._weeks === 1 && s._date.getTime() === today.getTime()) return 'Today \u00b7 ' + formatDate(s._date);
    return formatRange(s._date, s._end);
  }

  function themeTags(s) {
    const wrap = el('div', 'rg-tags');
    s._themes.forEach(id => wrap.appendChild(el('span', 'rg-tag rg-tag-' + id, themeById[id].name)));
    if (s._weeks > 1) wrap.appendChild(el('span', 'rg-tag rg-tag-plain', s._weeks + ' sessions'));
    if (s.part) wrap.appendChild(el('span', 'rg-tag rg-tag-plain', s.part));
    return wrap;
  }

  function paperBlock(s, titleTag) {
    const frag = document.createDocumentFragment();
    frag.appendChild(themeTags(s));
    frag.appendChild(el(titleTag, 'rg-title', s.title));
    const by = [s.authors, s.venue].filter(Boolean).join(' · ');
    if (by) frag.appendChild(el('p', 'rg-paper-meta', by));
    if (s.description) frag.appendChild(el('p', 'rg-desc', s.description));
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
      body.appendChild(el('div', 'rg-next-label', whenLabel(first)));
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
    li.appendChild(el('div', 'rg-item-date', whenLabel(s)));
    const body = el('div', 'rg-item-body');
    body.appendChild(paperBlock(s, 'h5'));
    li.appendChild(body);
    return li;
  }

  /* --- Past sessions table: Date | Paper | Presenter | Theme --- */
  function cell(className, label) {
    const td = el('td', className);
    if (label) td.dataset.label = label;
    return td;
  }

  function sessionRow(s) {
    const tr = el('tr', 'rg-row');
    tr.dataset.themes = s._themes.join(' ');

    const date = cell('rg-td-date');
    date.appendChild(el('span', 'rg-row-date', whenLabel(s)));
    if (s._weeks > 1) date.appendChild(el('span', 'rg-row-note', s._weeks + ' sessions'));
    if (s.part) date.appendChild(el('span', 'rg-row-note', s.part));
    tr.appendChild(date);

    const paper = cell('rg-td-paper');
    const url = safeHref(s.link);
    const title = url ? link(url, s.title, 'rg-row-title') : el('span', 'rg-row-title', s.title);
    paper.appendChild(title);
    const by = [s.authors, s.venue].filter(Boolean).join(' \u00b7 ');
    if (by) paper.appendChild(el('p', 'rg-row-meta', by));
    if (s.description || s.notes || s.slides) {
      const details = el('details', 'rg-details');
      details.appendChild(el('summary', '', 'Summary'));
      if (s.description) details.appendChild(el('p', 'rg-desc', s.description));
      if (s.notes) details.appendChild(el('p', 'rg-notes', s.notes));
      const slides = link(s.slides, 'Slides', 'rg-link', 'fa-person-chalkboard');
      if (slides) details.appendChild(slides);
      paper.appendChild(details);
    }
    tr.appendChild(paper);

    tr.appendChild(cell('rg-td-presenter', 'Presenter')).textContent = s.presenter || '\u2014';

    const theme = cell('rg-td-theme', 'Theme');
    const tags = el('div', 'rg-tags');
    s._themes.forEach(id => tags.appendChild(el('span', 'rg-tag rg-tag-' + id, themeById[id].name)));
    theme.appendChild(tags);
    tr.appendChild(theme);
    return tr;
  }

  /* --- Past sessions with theme filter --- */
  const pastList = document.getElementById('rg-past');
  const filters = document.getElementById('rg-filters');
  let applyFilter = () => {};

  if (pastList) {
    past.forEach(s => pastList.appendChild(sessionRow(s)));
    const none = el('tr', 'rg-empty-row');
    const noneCell = el('td', '', past.length ? 'No past sessions on this theme yet.' : 'Past sessions will be listed here.');
    noneCell.colSpan = 4;
    none.appendChild(noneCell);
    none.hidden = past.length > 0;
    pastList.appendChild(none);

    applyFilter = id => {
      let shown = 0;
      pastList.querySelectorAll('.rg-row').forEach(li => {
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
      const card = el('button', 'rg-theme rg-theme-' + t.id);
      card.type = 'button';
      card.setAttribute('aria-label', t.name + ': show past sessions');
      const ic = el('span', 'rg-theme-icon');
      ic.appendChild(icon(t.icon));
      card.appendChild(ic);
      card.appendChild(el('span', 'rg-theme-name', t.name));
      card.appendChild(el('span', 'rg-theme-blurb', t.blurb));
      card.addEventListener('click', () => {
        applyFilter(t.id);
        const target = document.getElementById('rg-archive');
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      themeGrid.appendChild(card);
    });
  }
})();

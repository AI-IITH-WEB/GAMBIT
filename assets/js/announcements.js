/* ===================================================================
   GAMBIT Lab announcements
   Shown on the Home page: the latest few, plus a 'Show all' button for the rest.

   HOW TO ADD AN ANNOUNCEMENT
   1. Copy one { ... }, block below and paste it at the TOP of the list
      (newest first - items are shown in the order written here).
   2. Edit the fields:
        date      Shown exactly as written, e.g. 'Oct 2026'
        tag       Short label: People, Paper, Preprint, Alumni, Award, Event, Talk ...
        title     One-line headline
        text      (optional) a sentence or two of detail
        link      (optional) a URL, or a page on this site such as 'publications.html'
        linkText  (optional) label for the link, defaults to 'Read more'
   3. Keep the comma after each closing brace }.
   =================================================================== */

window.GAMBIT_ANNOUNCEMENTS = [
  {
    date: 'Oct 2026',
    tag: 'Event',
    title: 'AI Innovation Lab launched at IIT Hyderabad',
    text: 'The AI Innovation Lab was officially launched at IIT Hyderabad on 7 October 2026. The lab focuses on Trustworthy AI for Finance, Economies and Society.'
  },
  {
    date: 'Aug 2026',
    tag: 'Preprint',
    title: 'New preprint: Resourced Authority — A Mechanism-Design Model for Participatory Governance of Deployed AI Agents',
    text: 'By Praphul Chandra, Sujit Gujar and Ganesh Ghalme.',
    link: 'https://arxiv.org/abs/2608.06353',
    linkText: 'Read on arXiv'
  },
  {
    date: 'Jul 2026',
    tag: 'People',
    title: 'Welcome, V. Sanvi Rikthik Reddy!',
    text: 'Sanvi joins GAMBIT Lab as an M.Tech RA student.',
    link: 'people.html#current-students',
    linkText: 'Meet the lab'
  },
  {
    date: 'Jul 2026',
    tag: 'Preprint',
    title: 'New preprint: Multi-Sender Bayesian Persuasion with Imperfect Information',
    text: 'By Andra Siva Sai Teja, Ganesh Ghalme and Sujit Gujar.',
    link: 'https://arxiv.org/abs/2607.08675',
    linkText: 'Read on arXiv'
  },
  {
    date: 'Jun 2026',
    tag: 'Alumni',
    title: 'Congratulations, Mahvith Akshintala!',
    text: 'Mahvith completes the M.Tech RA programme and continues at IIT Hyderabad as a Project Associate in the Department of AI.'
  },
  {
    date: 'Jun 2026',
    tag: 'Preprint',
    title: 'New preprint: Linear Strategic Classification with Endogenous Improvements',
    text: 'By Siddharth Shrivastava, Mahvith Akshintala, B. Vamsha Vardhan Reddy, Naresh Manwani, Sujit Gujar and Ganesh Ghalme.',
    link: 'https://arxiv.org/abs/2606.01198',
    linkText: 'Read on arXiv'
  },
  {
    date: '2026',
    tag: 'Paper',
    title: 'Paper at AAAI 2026: On Condorcet’s Jury Theorem with Abstention',
    text: 'By Reshef Meir and Ganesh Ghalme.',
    link: 'https://arxiv.org/abs/2510.18062',
    linkText: 'Read on arXiv'
  },
  {
    date: 'Oct 2025',
    tag: 'Award',
    title: 'Siddharth Shrivastava awarded the Google PhD Fellowship',
    text: 'Congratulations to Siddharth Shrivastava, PhD student at GAMBIT Lab, on being awarded the prestigious Google PhD Fellowship.',
    link: 'people.html#current-students',
    linkText: 'Meet the lab'
  },
  {
    date: 'Jul 2025',
    tag: 'People',
    title: 'Welcome, Kush Mathukiya!',
    text: 'Kush joins GAMBIT Lab as a PhD student.',
    link: 'people.html#current-students',
    linkText: 'Meet the lab'
  },
  {
    date: '2025',
    tag: 'Paper',
    title: 'Two papers at AAMAS 2025',
    text: '“Multi-agent Multi-armed Bandits with Minimum Reward Guarantee Fairness” and “Regret Guarantees for a UCB-based Algorithm for Volatile Combinatorial Bandits”.',
    link: 'publications.html',
    linkText: 'See publications'
  },
];


/* ---------- Rendering (no need to edit below this line) ---------- */
(function () {
  "use strict";

  const items = window.GAMBIT_ANNOUNCEMENTS || [];

  function safeHref(href) {
    return /^(https?:\/\/|[\w.\-\/#]+$)/i.test(href) && !/^\s*javascript:/i.test(href) ? href : null;
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function renderItem(item) {
    const li = el('li', 'ann-item');
    li.appendChild(el('div', 'ann-date', item.date));

    const body = el('div', 'ann-body');
    if (item.tag) {
      const slug = String(item.tag).toLowerCase().replace(/[^a-z]+/g, '');
      body.appendChild(el('span', 'ann-tag ann-tag-' + slug, item.tag));
    }
    body.appendChild(el('h3', 'ann-title', item.title));
    if (item.text) body.appendChild(el('p', 'ann-text', item.text));

    const href = item.link && safeHref(item.link);
    if (href) {
      const a = el('a', 'ann-link', (item.linkText || 'Read more') + ' ');
      a.href = href;
      if (/^https?:\/\//i.test(href)) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      a.appendChild(el('i', 'fa-solid fa-arrow-right'));
      body.appendChild(a);
    }

    li.appendChild(body);
    return li;
  }

  document.querySelectorAll('[data-announcements]').forEach(list => {
    const limit = parseInt(list.dataset.limit, 10) || items.length;
    const rendered = items.map(renderItem);
    rendered.forEach((li, i) => { li.hidden = i >= limit; });
    list.replaceChildren(...rendered);
    if (!items.length) {
      list.appendChild(el('li', 'ann-empty', 'No announcements yet — check back soon.'));
    }

    // Older items stay on the page behind a "Show all" toggle.
    if (items.length > limit) {
      if (!list.id) list.id = 'ann-list';
      const btn = el('button', 'ann-toggle');
      btn.type = 'button';
      btn.setAttribute('aria-controls', list.id);
      const label = el('span');
      const ic = el('i', 'fa-solid fa-chevron-down');
      ic.setAttribute('aria-hidden', 'true');
      btn.append(label, ic);

      const setOpen = open => {
        rendered.forEach((li, i) => { if (i >= limit) li.hidden = !open; });
        btn.setAttribute('aria-expanded', open);
        label.textContent = open ? 'Show fewer' : 'Show all announcements (' + items.length + ')';
      };
      btn.addEventListener('click', () => {
        const open = btn.getAttribute('aria-expanded') !== 'true';
        setOpen(open);
        if (!open) list.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      setOpen(false);

      const wrap = el('div', 'ann-toggle-wrap');
      wrap.appendChild(btn);
      list.after(wrap);
    }
  });
})();

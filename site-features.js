document.addEventListener('DOMContentLoaded', function () {
  const body = document.querySelector('.article-body .wrap');
  if (!body) return;

  // 1. Reading time
  const text = body.innerText || '';
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  const dateEl = document.querySelector('.article-header .date');
  if (dateEl) {
    const rt = document.createElement('span');
    rt.style.marginLeft = '10px';
    rt.style.opacity = '0.8';
    rt.textContent = '· ' + minutes + ' min read';
    dateEl.appendChild(rt);
  }

  // 2. Table of contents
  const headings = body.querySelectorAll('h2');
  if (headings.length > 2) {
    const tocBox = document.createElement('div');
    tocBox.className = 'toc-box';
    const tocTitle = document.createElement('div');
    tocTitle.className = 'toc-title';
    tocTitle.textContent = 'In this article';
    tocBox.appendChild(tocTitle);
    const list = document.createElement('ul');
    headings.forEach((h, i) => {
      const id = 'section-' + i;
      h.id = id;
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#' + id;
      a.textContent = h.textContent;
      li.appendChild(a);
      list.appendChild(li);
    });
    tocBox.appendChild(list);
    const lead = body.querySelector('.lead');
    if (lead) {
      lead.after(tocBox);
    } else {
      const firstH2 = body.querySelector('h2');
      if (firstH2) firstH2.before(tocBox);
    }
  }

  // 3. Related articles
  if (typeof SITE_ARTICLES !== 'undefined') {
    const currentFile = window.location.pathname.split('/').pop();
    const currentTag = document.querySelector('.category-tag');
    const currentCat = currentTag ? currentTag.classList[1] : null;
    let related = SITE_ARTICLES.filter(a => a.url !== currentFile && a.category === currentCat);
    if (related.length < 3) {
      const others = SITE_ARTICLES.filter(a => a.url !== currentFile && !related.includes(a));
      related = related.concat(others).slice(0, 3);
    } else {
      related = related.sort(() => 0.5 - Math.random()).slice(0, 3);
    }
    if (related.length) {
      const section = document.createElement('div');
      section.className = 'related-articles';
      const h2 = document.createElement('h2');
      h2.textContent = 'Related Articles';
      section.appendChild(h2);
      const grid = document.createElement('div');
      grid.className = 'related-grid';
      related.forEach(a => {
        const card = document.createElement('a');
        card.href = a.url;
        card.className = 'related-card';
        card.textContent = a.title;
        grid.appendChild(card);
      });
      section.appendChild(grid);
      const backLink = body.querySelector('.back-link');
      if (backLink) backLink.before(section);
    }
  }
});

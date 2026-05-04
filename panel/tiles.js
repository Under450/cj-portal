// Brand → tile definitions
const BRAND_TILES = {
  fmm: [
    { id: 'stripe', label: 'STRIPE', title: 'Dashboard', icon: 'S', iconClass: 'stripe', badge: 'stripe_events' },
    { id: 'balance', label: 'BALANCE', title: '', type: 'value', section: 'stripe' },
    { id: 'signups', label: 'NEW SIGNUPS', title: 'Last 24h', icon: 'people', badge: 'signups' },
    { id: 'inbox', label: 'INBOX', title: 'FMM mail', icon: 'mail', badge: 'inbox' },
    { id: 'customers', label: 'CUSTOMERS', title: 'All accounts', icon: 'list' },
    { id: 'didit', label: 'DIDIT', title: 'ID queue', icon: 'id', badge: 'didit', badgeColor: 'amber' },
    { id: 'tasks', label: 'TASKS', title: 'Traffic light board', icon: 'tasks', href: 'tasks.html' },
  ],
  bergason: [
    { id: 'placeholder1', label: 'JOBS', title: 'Property jobs', icon: 'clock' },
    { id: 'placeholder2', label: 'INVOICES', title: 'Pending', icon: 'list' },
    { id: 'placeholder3', label: 'BLOCKS', title: 'Reports', icon: 'list' },
    { id: 'tasks', label: 'TASKS', title: 'Traffic light board', icon: 'tasks', href: 'tasks.html' },
  ],
  aventus: [
    { id: 'placeholder1', label: 'STUDIO', title: 'Analytics', icon: 'clock' },
    { id: 'placeholder2', label: 'CONTENT', title: 'Queue', icon: 'list' },
    { id: 'tasks', label: 'TASKS', title: 'Traffic light board', icon: 'tasks', href: 'tasks.html' },
  ],
  velvet: [
    { id: 'placeholder1', label: 'CREATORS', title: 'Dashboard', icon: 'clock' },
    { id: 'tasks', label: 'TASKS', title: 'Traffic light board', icon: 'tasks', href: 'tasks.html' },
  ],
};

const BRAND_NAMES = {
  fmm: 'Forward My Mail',
  bergason: 'Bergason',
  aventus: 'Aventus',
  velvet: 'Velvet',
};

const ICONS = {
  people: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
  mail: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  id: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="12" cy="12" r="3"/></svg>',
  list: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  clock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  tasks: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
};

let currentBrand = 'fmm';
let badgeCache = {};

// ===== SPA NAVIGATION =====

function showSection(id) {
  document.getElementById('home-view').style.display = 'none';
  document.querySelectorAll('.detail-section').forEach(s => s.style.display = 'none');
  const section = document.getElementById('section-' + id);
  if (section) {
    section.style.display = 'block';
    // Load data for section
    if (id === 'stripe') loadStripe();
    else if (id === 'signups') loadSignups();
    else if (id === 'inbox') loadInbox();
    else if (id === 'customers') loadCustomers();
    else if (id === 'didit') loadDidit();
  }
}

function showHome() {
  document.querySelectorAll('.detail-section').forEach(s => s.style.display = 'none');
  document.getElementById('home-view').style.display = 'block';
}

// ===== TILE RENDERING =====

async function render(brand) {
  currentBrand = brand;
  document.getElementById('brand-title').textContent = BRAND_NAMES[brand];
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.brand === brand);
  });

  const grid = document.getElementById('tile-grid');
  grid.innerHTML = BRAND_TILES[brand].map(t => renderTile(t)).join('');

  if (brand === 'fmm') await loadFmmData();
  document.getElementById('sync-time').textContent = 'just now';
}

function renderTile(t) {
  const badge = t.badge && badgeCache[t.badge] > 0
    ? `<div class="tile-badge ${t.badgeColor || ''}">${badgeCache[t.badge]}</div>`
    : '';

  const iconHtml = t.iconClass === 'stripe'
    ? `<div class="tile-icon stripe">${t.icon}</div>`
    : t.iconClass === 'google'
    ? `<div class="tile-icon google">${t.icon}</div>`
    : `<div class="tile-icon" style="color: var(--amber)">${ICONS[t.icon] || ''}</div>`;

  // Which section to open (balance reuses stripe)
  const sectionId = t.section || t.id;
  const SECTIONS = ['stripe', 'signups', 'inbox', 'customers', 'didit'];
  const hasSection = SECTIONS.includes(sectionId);
  const onclick = t.href
    ? `onclick="location.href='${t.href}'"`
    : hasSection ? `onclick="showSection('${sectionId}')"` : '';
  const cursor = (t.href || hasSection) ? 'pointer' : 'default';

  if (t.type === 'value') {
    return `<div class="tile" ${onclick} style="cursor:${cursor}">
      <div class="tile-label">${t.label}</div>
      <div class="tile-value" id="tile-${t.id}-value">—</div>
      <div class="tile-delta" id="tile-${t.id}-delta"></div>
    </div>`;
  }

  return `<div class="tile" ${onclick} style="cursor:${cursor}">
    ${badge}
    ${iconHtml}
    <div class="tile-label">${t.label}</div>
    <div class="tile-title">${t.title}</div>
  </div>`;
}

// ===== HOME DATA LOADING =====

async function loadFmmData() {
  const [balance, stripeEvents, signups, inbox, didit] = await Promise.all([
    callFn('panelGetStripeBalance'),
    callFn('panelGetStripeEvents'),
    callFn('panelGetRecentSignups'),
    callFn('panelGetInbox'),
    callFn('panelGetDiditQueue'),
  ]);

  if (balance) {
    const valEl = document.getElementById('tile-balance-value');
    if (valEl) valEl.textContent = formatGBP(balance.available);
    const delta = balance.todayDelta || 0;
    const deltaEl = document.getElementById('tile-balance-delta');
    if (deltaEl) {
      if (delta > 0) {
        deltaEl.className = 'tile-delta up';
        deltaEl.textContent = `▲ ${formatGBP(delta)} today`;
      } else if (delta < 0) {
        deltaEl.className = 'tile-delta down';
        deltaEl.textContent = `▼ ${formatGBP(Math.abs(delta))} today`;
      }
    }
  }

  badgeCache = {
    stripe_events: stripeEvents?.unreadCount || 0,
    signups: signups?.newCount || 0,
    inbox: inbox?.unread || 0,
    didit: didit?.pendingCount || 0,
  };

  // Re-render to show badges
  const grid = document.getElementById('tile-grid');
  grid.innerHTML = BRAND_TILES[currentBrand].map(t => renderTile(t)).join('');

  // Re-set balance after re-render
  if (balance) {
    const valEl = document.getElementById('tile-balance-value');
    if (valEl) valEl.textContent = formatGBP(balance.available);
    const delta = balance.todayDelta || 0;
    const deltaEl = document.getElementById('tile-balance-delta');
    if (deltaEl) {
      if (delta > 0) {
        deltaEl.className = 'tile-delta up';
        deltaEl.textContent = `▲ ${formatGBP(delta)} today`;
      } else if (delta < 0) {
        deltaEl.className = 'tile-delta down';
        deltaEl.textContent = `▼ ${formatGBP(Math.abs(delta))} today`;
      }
    }
  }
}

// ===== SECTION: STRIPE =====

let spaChart = null;

async function loadStripe() {
  const [balance, events] = await Promise.all([
    callFn('panelGetStripeBalance'),
    callFn('panelGetStripeEvents'),
  ]);

  if (balance) {
    document.getElementById('spa-available').textContent = formatGBP(balance.available);
    document.getElementById('spa-pending').textContent = formatGBP(balance.pending);
    if (balance.history && balance.history.length) {
      renderStripeChart(balance.history);
    }
  }

  const eventsEl = document.getElementById('spa-events');
  if (!events || !events.events?.length) {
    eventsEl.className = 'empty';
    eventsEl.textContent = 'No recent payments.';
  } else {
    const lastViewed = events.lastViewed ? new Date(events.lastViewed) : new Date(0);
    eventsEl.className = 'list';
    eventsEl.innerHTML = events.events.map(e => {
      const isNew = new Date(e.created) > lastViewed;
      const nameLine = escapeHtml(e.name || 'Unknown');
      const companyLine = e.company ? ` · ${escapeHtml(e.company)}` : '';
      return `<div class="list-row ${isNew ? 'new' : ''}">
        <div class="list-row-title">${nameLine}${companyLine}</div>
        <div class="list-row-sub" style="color:var(--amber);font-weight:500;">${formatGBP(e.amount)} · ${escapeHtml(e.package || 'N/A')}</div>
        <div class="list-row-meta">${escapeHtml(e.email || '')} · ${formatTime(new Date(e.created))}</div>
      </div>`;
    }).join('');
  }

  await markViewed('stripe_events');
}

function renderStripeChart(history) {
  if (spaChart) spaChart.destroy();
  const ctx = document.getElementById('spa-balanceChart').getContext('2d');
  spaChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: history.map(h => h.date),
      datasets: [{
        data: history.map(h => h.balance),
        borderColor: '#d4a04c',
        backgroundColor: 'rgba(212, 160, 76, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointRadius: 0,
        pointHitRadius: 10,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          ticks: { color: '#555', font: { size: 10 }, maxTicksLimit: 6 },
          grid: { color: 'rgba(255,255,255,0.05)' },
          border: { color: '#262626' },
        },
        y: {
          ticks: { color: '#555', font: { size: 10 }, callback: v => '£' + v.toLocaleString() },
          grid: { color: 'rgba(255,255,255,0.05)' },
          border: { color: '#262626' },
        }
      }
    }
  });
}

// ===== SECTION: SIGNUPS =====

async function loadSignups() {
  const data = await callFn('panelGetRecentSignups');
  const listEl = document.getElementById('spa-signups-list');

  if (!data || !data.customers?.length) {
    listEl.className = 'empty';
    listEl.textContent = 'No recent signups.';
    return;
  }

  const lastViewed = data.lastViewed ? new Date(data.lastViewed) : new Date(0);
  listEl.className = 'list';
  listEl.innerHTML = data.customers.map(c => {
    const isNew = new Date(c.createdAt) > lastViewed;
    return `<div class="list-row ${isNew ? 'new' : ''}">
      <div class="list-row-title">${escapeHtml(c.name || c.email)}</div>
      <div class="list-row-sub">${escapeHtml(c.tier || 'No tier')} · ${escapeHtml(c.email)}</div>
      <div class="list-row-meta">${formatTime(new Date(c.createdAt))}</div>
    </div>`;
  }).join('');

  await markViewed('signups');
}

// ===== SECTION: INBOX =====

let spaEmails = [];

async function loadInbox() {
  const data = await callFn('panelGetInbox');
  const contentEl = document.getElementById('spa-inbox-content');

  if (data?.notConfigured) {
    contentEl.innerHTML = `<div class="not-configured">
      <div class="not-configured-icon">✉</div>
      <div class="not-configured-title">Setup needed</div>
      <div class="not-configured-sub">Gmail API not configured yet.<br>Connect info@forwardmymail.co.uk to enable.</div>
    </div>`;
    return;
  }

  if (!data || !data.messages?.length) {
    contentEl.className = 'empty';
    contentEl.textContent = 'No emails.';
    return;
  }

  spaEmails = data.messages;
  renderInboxList();
  await markViewed('inbox');
}

function renderInboxList() {
  const contentEl = document.getElementById('spa-inbox-content');
  document.getElementById('spa-inbox-title').textContent = 'Inbox';
  const backEl = document.getElementById('spa-inbox-back');
  backEl.onclick = function(ev) { ev.preventDefault(); showHome(); };

  contentEl.className = 'list';
  contentEl.innerHTML = spaEmails.map((e, i) => `
    <div class="list-row ${e.unread ? 'new' : ''}" onclick="openSpaEmail(${i})">
      <div class="list-row-title">${escapeHtml(e.from)}</div>
      <div class="list-row-sub">${escapeHtml(e.subject)}</div>
      <div class="list-row-meta">${escapeHtml(e.preview || '')} · ${formatTime(new Date(e.date))}</div>
    </div>
  `).join('');
}

function openSpaEmail(idx) {
  const e = spaEmails[idx];
  const contentEl = document.getElementById('spa-inbox-content');
  document.getElementById('spa-inbox-title').textContent = 'Email';
  const backEl = document.getElementById('spa-inbox-back');
  backEl.onclick = function(ev) { ev.preventDefault(); renderInboxList(); };

  contentEl.className = '';
  contentEl.innerHTML = `<div class="email-reader">
    <div class="email-reader-header">
      <div class="email-reader-subject">${escapeHtml(e.subject)}</div>
      <div class="email-reader-from">${escapeHtml(e.from)}</div>
      <div class="email-reader-date">${formatTime(new Date(e.date))}</div>
    </div>
    <div class="email-reader-body">${escapeHtml(e.body || e.preview || 'No content')}</div>
  </div>`;
}

// ===== SECTION: CUSTOMERS =====

let spaAllCustomers = [];

async function loadCustomers() {
  const data = await callFn('panelGetAllCustomers');
  const listEl = document.getElementById('spa-cust-list');

  if (!data || !data.customers?.length) {
    listEl.className = 'empty';
    listEl.textContent = 'No customers found.';
    return;
  }

  spaAllCustomers = data.customers;
  document.getElementById('spa-cust-count').textContent = `${spaAllCustomers.length} total`;
  renderCustomerList(spaAllCustomers);

  document.getElementById('spa-cust-search').oninput = function(e) {
    const q = e.target.value.toLowerCase();
    if (!q) return renderCustomerList(spaAllCustomers);
    renderCustomerList(spaAllCustomers.filter(c =>
      (c.name || '').toLowerCase().includes(q) ||
      (c.email || '').toLowerCase().includes(q)
    ));
  };
}

function renderCustomerList(customers) {
  const listEl = document.getElementById('spa-cust-list');
  if (!customers.length) {
    listEl.className = 'empty';
    listEl.textContent = 'No matches.';
    return;
  }

  listEl.className = 'list';
  listEl.innerHTML = customers.map(c => {
    const statusClass = c.idStatus === 'approved' ? 'approved' : c.idStatus === 'declined' ? 'declined' : 'pending';
    return `<div class="list-row">
      <div class="list-row-title">${escapeHtml(c.name || 'No name')}</div>
      <div class="list-row-sub">${escapeHtml(c.email)} ${c.tier ? '· ' + escapeHtml(c.tier) : ''}</div>
      <div class="list-row-meta">
        <span class="status-badge ${statusClass}">${c.idStatus || 'unknown'}</span>
        ${c.createdAt ? ' · ' + formatTime(new Date(c.createdAt)) : ''}
      </div>
    </div>`;
  }).join('');
}

// ===== SECTION: DIDIT =====

let spaDiditCustomers = [];
let spaDiditFilter = 'all';

function diditStatusLabel(s) {
  return ({ approved: 'Approved', pending: 'Pending', not_started: 'Not Started', declined: 'Declined' })[s] || s;
}

function renderDiditList() {
  const listEl = document.getElementById('spa-didit-list');
  const filtered = spaDiditFilter === 'all'
    ? spaDiditCustomers
    : spaDiditCustomers.filter(c => c.idStatus === spaDiditFilter);

  const metaEl = document.getElementById('spa-didit-meta');
  metaEl.style.display = '';
  metaEl.textContent = spaDiditFilter === 'all'
    ? `Showing all ${filtered.length} active customers`
    : `Showing ${filtered.length} ${diditStatusLabel(spaDiditFilter).toLowerCase()}`;

  if (!filtered.length) {
    listEl.className = 'empty';
    listEl.textContent = spaDiditFilter === 'all'
      ? 'No active customers found.'
      : `No customers with status: ${diditStatusLabel(spaDiditFilter)}.`;
    return;
  }

  listEl.className = 'list';
  listEl.innerHTML = filtered.map(c => {
    const updated = c.idStatusUpdatedAt
      ? ' · Updated ' + formatTime(new Date(c.idStatusUpdatedAt))
      : (c.createdAt ? ' · Signed up ' + formatTime(new Date(c.createdAt)) : '');
    return `<div class="list-row">
      <div class="list-row-title">${escapeHtml(c.name || c.email)}</div>
      <div class="list-row-sub">${escapeHtml(c.email)}</div>
      <div class="list-row-pkg">${escapeHtml(c.package)}</div>
      <div class="list-row-meta">
        <span class="status-badge ${c.idStatus}">${diditStatusLabel(c.idStatus)}</span>${updated}
      </div>
    </div>`;
  }).join('');
}

async function loadDidit() {
  const data = await callFn('panelGetDiditQueue');

  if (!data || !Array.isArray(data.customers)) {
    document.getElementById('spa-didit-list').className = 'empty';
    document.getElementById('spa-didit-list').textContent = 'Failed to load customers.';
    return;
  }

  spaDiditCustomers = data.customers;
  const counts = data.counts || { all: 0, approved: 0, pending: 0, not_started: 0, declined: 0 };

  document.getElementById('spa-didit-total').textContent = `${counts.pending} pending`;
  document.getElementById('spa-didit-tabs').style.display = '';
  document.getElementById('spa-c-all').textContent = counts.all;
  document.getElementById('spa-c-pending').textContent = counts.pending;
  document.getElementById('spa-c-not_started').textContent = counts.not_started;
  document.getElementById('spa-c-declined').textContent = counts.declined;
  document.getElementById('spa-c-approved').textContent = counts.approved;

  document.querySelectorAll('#spa-didit-tabs .tab').forEach(t => {
    t.onclick = function() {
      spaDiditFilter = t.dataset.filter;
      document.querySelectorAll('#spa-didit-tabs .tab').forEach(b => {
        b.classList.toggle('active', b.dataset.filter === spaDiditFilter);
      });
      renderDiditList();
    };
  });

  spaDiditFilter = 'all';
  renderDiditList();
  await markViewed('didit');
}

// ===== TAB SWITCHING =====

document.querySelectorAll('.tab[data-brand]').forEach(tab => {
  tab.addEventListener('click', () => render(tab.dataset.brand));
});

function signOut() {
  if (confirm('Sign out?')) auth.signOut().then(() => window.location.href = 'login.html');
}

// Initial load once auth confirmed
auth.onAuthStateChanged(user => {
  if (user && user.uid === ALLOWED_UID) render('fmm');
});


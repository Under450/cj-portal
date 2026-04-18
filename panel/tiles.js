// Brand → tile definitions
const BRAND_TILES = {
  fmm: [
    { id: 'stripe', label: 'STRIPE', title: 'Dashboard', icon: 'S', iconClass: 'stripe', link: 'stripe.html', badge: 'stripe_events' },
    { id: 'balance', label: 'BALANCE', title: '', type: 'value', link: 'stripe.html' },
    { id: 'signups', label: 'NEW SIGNUPS', title: 'Last 24h', icon: 'people', link: 'signups.html', badge: 'signups' },
    { id: 'inbox', label: 'INBOX', title: 'FMM mail', icon: 'mail', link: 'inbox.html', badge: 'inbox' },
    { id: 'customers', label: 'CUSTOMERS', title: 'All accounts', icon: 'list', link: 'customers.html' },
    { id: 'didit', label: 'DIDIT', title: 'ID queue', icon: 'id', link: 'didit.html', badge: 'didit', badgeColor: 'amber' },
  ],
  bergason: [
    { id: 'placeholder1', label: 'JOBS', title: 'Property jobs', icon: 'clock' },
    { id: 'placeholder2', label: 'INVOICES', title: 'Pending', icon: 'list' },
    { id: 'placeholder3', label: 'BLOCKS', title: 'Reports', icon: 'list' },
  ],
  aventus: [
    { id: 'placeholder1', label: 'STUDIO', title: 'Analytics', icon: 'clock' },
    { id: 'placeholder2', label: 'CONTENT', title: 'Queue', icon: 'list' },
  ],
  velvet: [
    { id: 'placeholder1', label: 'CREATORS', title: 'Dashboard', icon: 'clock' },
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
};

let currentBrand = 'fmm';
let badgeCache = {};

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

  if (t.type === 'value') {
    return `<a class="tile" href="${t.link || '#'}">
      <div class="tile-label">${t.label}</div>
      <div class="tile-value" id="tile-${t.id}-value">—</div>
      <div class="tile-delta" id="tile-${t.id}-delta"></div>
    </a>`;
  }

  return `<a class="tile" href="${t.link || '#'}">
    ${badge}
    ${iconHtml}
    <div class="tile-label">${t.label}</div>
    <div class="tile-title">${t.title}</div>
  </a>`;
}

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

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => render(tab.dataset.brand));
});

function signOut() {
  if (confirm('Sign out?')) auth.signOut().then(() => window.location.href = 'login.html');
}

// Initial load once auth confirmed
auth.onAuthStateChanged(user => {
  if (user && user.uid === ALLOWED_UID) render('fmm');
});

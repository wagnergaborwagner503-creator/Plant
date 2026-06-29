// Palánta – Service Worker v11
const CACHE = 'palanta-v11';

// Telepítéskor azonnal átveszi az irányítást
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = e.request.url;

  // App shell (index.html, sw.js, manifest.json): mindig friss hálózatról (a böngésző HTTP-cache-ét is kihagyva)
  if (url.endsWith('/') || url.endsWith('/index.html') || url.endsWith('/sw.js') || url.endsWith('/manifest.json')) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' }).then(resp => {
        if (resp && resp.status === 200) {
          const cloned = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, cloned));
        }
        return resp;
      }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // CDN assetek (React, Babel, Chart.js, fontok, ikon): cache-first
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (resp && resp.status === 200 && resp.type !== 'opaque') {
          const cloned = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, cloned));
        }
        return resp;
      }).catch(() => cached);
    })
  );
});

/* ===================== ÉRTESÍTÉSEK (háttér) ===================== */
// A SW nem éri el a localStorage-ot, ezért az app IndexedDB-be tükrözi az ütemezést.

function idbOpen() {
  return new Promise((res, rej) => {
    const r = indexedDB.open('palanta-db', 1);
    r.onupgradeneeded = () => { if (!r.result.objectStoreNames.contains('kv')) r.result.createObjectStore('kv'); };
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}
function idbGet(k) { return idbOpen().then(db => new Promise((res, rej) => { const q = db.transaction('kv', 'readonly').objectStore('kv').get(k); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); })); }
function idbSet(k, v) { return idbOpen().then(db => new Promise((res, rej) => { const tx = db.transaction('kv', 'readwrite'); tx.objectStore('kv').put(v, k); tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error); })); }

const pad = n => String(n).padStart(2, '0');
const dateToISO = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const todayISO = () => dateToISO(new Date());
function addDaysISO(iso, n) { const [y, m, d] = iso.split('-').map(Number); const dt = new Date(y, m - 1, d); dt.setDate(dt.getDate() + n); return dateToISO(dt); }

// FONTOS: ugyanez a logika az index.html-ben is megvan — tartsd szinkronban!
function buildReminders(schedule, today) {
  const tomorrow = addDaysISO(today, 1);
  const dueNow = schedule.filter(s => s.due && s.due <= today).map(s => s.name);
  const dueTom = schedule.filter(s => s.due === tomorrow).map(s => s.name);
  const rem = [];
  if (dueNow.length) rem.push({ key: 'day:' + today, title: '💧 Öntözés ma', body: dueNow.length === 1 ? dueNow[0] + ' – ma esedékes az öntözés.' : dueNow.length + ' növény szomjas ma: ' + dueNow.join(', ') });
  if (dueTom.length) rem.push({ key: 'pre:' + today, title: '🌱 Holnap öntözés', body: dueTom.length === 1 ? dueTom[0] + ' – holnap lesz esedékes.' : 'Holnap esedékes: ' + dueTom.join(', ') });
  return rem;
}

async function runReminders() {
  const config = (await idbGet('config')) || {};
  if (!config.enabled) return;
  const schedule = (await idbGet('schedule')) || [];
  const today = todayISO();
  const log = (await idbGet('notifLog')) || {};
  const rem = buildReminders(schedule, today).filter(r => !log[r.key]);
  for (const r of rem) {
    await self.registration.showNotification(r.title, { body: r.body, tag: r.key, icon: './icon.svg', badge: './icon.svg', data: { url: './' } });
    log[r.key] = Date.now();
  }
  const cut = addDaysISO(today, -3);
  for (const k in log) { const dt = k.split(':')[1]; if (dt && dt < cut) delete log[k]; }
  await idbSet('notifLog', log);
}

// Periodikus háttér-ellenőrzés (Android Chrome, telepített PWA)
self.addEventListener('periodicsync', e => {
  if (e.tag === 'palanta-water-check') e.waitUntil(runReminders());
});

// Értesítésre kattintva nyissa meg / hozza előtérbe az appot
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});

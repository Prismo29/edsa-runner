/* EDSA Runner service worker.
 * This file is a TEMPLATE: the `pwa` plugin in vite.config.js fills in the VERSION and PRECACHE placeholders
 * at build time and writes the result to dist/sw.js. It is never bundled into the app.
 *
 * - install: precache every built file (app shell, JS/CSS chunks, models, voice, sfx, manifests, icons)
 * - activate: delete caches from older deploys, take control of open pages
 * - fetch: pages are network-first (so a new deploy shows up on the next load), everything else is
 *   cache-first. Cross-origin requests (Firebase, Google APIs, analytics) are never touched, except
 *   the web fonts, which are cached so the menus look right offline.
 */
const VERSION = "319dd159d660";
const PRECACHE = [
  "assets/index-BhpgiDob.js",
  "assets/index-UI91TQ92.css",
  "assets/index.esm-B6lFqEDa.js",
  "assets/index.esm-BQBmQXJE.js",
  "assets/index.esm-JdHYYdE_.js",
  "assets/index.esm2017-BXVMkbBA.js",
  "assets/music-worker-CqMjUD_9.js",
  "assets/three-6CS_sk28.js",
  "data-deletion.html",
  "icons/apple-touch-icon.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-192.png",
  "icons/maskable-512.png",
  "index.html",
  "manifest.webmanifest",
  "models/CREDITS.md",
  "models/characters/anne.glb",
  "models/characters/enforcer.glb",
  "models/characters/lis.glb",
  "models/characters/matt.glb",
  "models/characters/sam.glb",
  "models/characters/shaun.glb",
  "privacy.html",
  "sfx/manifest.json",
  "voice/commute_late.mp3",
  "voice/commute_win.mp3",
  "voice/enforcer_1.mp3",
  "voice/enforcer_2.mp3",
  "voice/enforcer_3.mp3",
  "voice/enforcer_caught.mp3",
  "voice/gameover_1.mp3",
  "voice/gameover_2.mp3",
  "voice/gameover_3.mp3",
  "voice/intro_enforcer.mp3",
  "voice/intro_runner.mp3",
  "voice/jeepney_1.mp3",
  "voice/jeepney_2.mp3",
  "voice/jeepney_3.mp3",
  "voice/manifest.json",
  "voice/mrt_breakdown.mp3",
  "voice/powerup_beep.mp3",
  "voice/powerup_carousel.mp3",
  "voice/powerup_escort.mp3",
  "voice/powerup_habal.mp3",
  "voice/powerup_load.mp3",
  "voice/powerup_mrt.mp3",
  "voice/powerup_pandesal.mp3",
  "voice/powerup_payong.mp3",
  "voice/powerup_taho.mp3",
  "voice/powerup_wangwang.mp3",
  "voice/stage_ayala.mp3",
  "voice/stage_balintawak.mp3",
  "voice/stage_cubao.mp3",
  "voice/stage_guadalupe.mp3",
  "voice/stage_monumento.mp3",
  "voice/stage_ortigas.mp3",
  "voice/stage_taft.mp3",
  "voice/start_1.mp3",
  "voice/start_2.mp3",
  "voice/start_3.mp3"
];
const CACHE = `edsa-runner-${VERSION}`;
const FONT_CACHE = 'edsa-runner-fonts';
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

const scopeURL = (path) => new URL(path, self.registration.scope).href;
const INDEX = scopeURL('./index.html');

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // `cache: 'reload'` bypasses the HTTP cache so we never store a stale copy from an older deploy.
    await cache.addAll(PRECACHE.map((p) => new Request(scopeURL(p), { cache: 'reload' })));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((k) => k.startsWith('edsa-runner-') && k !== CACHE && k !== FONT_CACHE)
      .map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.origin !== self.location.origin) {
    if (FONT_HOSTS.includes(url.hostname)) event.respondWith(staleWhileRevalidate(req, FONT_CACHE));
    return; // Firebase / Google APIs / everything else: straight to the network
  }
  if (!url.href.startsWith(self.registration.scope)) return;

  if (req.mode === 'navigate') {
    event.respondWith(networkFirstPage(req));
    return;
  }
  event.respondWith(cacheFirst(req));
});

async function networkFirstPage(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    const path = new URL(req.url).pathname;
    const root = new URL(self.registration.scope).pathname;
    if (res.ok && (path === root || path === `${root}index.html`)) cache.put(INDEX, res.clone());
    return res;
  } catch {
    return (await cache.match(req, { ignoreSearch: true })) || (await cache.match(INDEX)) || Response.error();
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req, { ignoreSearch: true });
  if (hit) return hit;
  const res = await fetch(req);
  // Runtime-cache anything same-origin we missed (e.g. a file added after precache was generated).
  if (res.ok && res.type === 'basic' && !req.headers.has('range')) cache.put(req, res.clone());
  return res;
}

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(req);
  const net = fetch(req).then((res) => {
    if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
    return res;
  }).catch(() => hit || Response.error());
  return hit || net;
}

/* Service worker: guarda o app para abrir offline e serve as fotos (/_blob/ID) vindas do Drive. */
const V="v80";
const SHELL = ["./", "index.html", "drive.js", "jszip.min.js", "config.js", "manifest.webmanifest", "icon-192.png", "icon-512.png","caladea-r.ttf","caladea-b.ttf"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open("shell-" + V).then(c => Promise.all(SHELL.map(u => c.add(new Request(u, { cache: "reload" }))))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith("shell-") && k !== "shell-" + V) await caches.delete(k);
    await self.clients.claim();
  })());
});

async function askToken() {
  const cs = await self.clients.matchAll({ type: "window" });
  for (const c of cs) {
    try {
      const t = await new Promise((ok, no) => {
        const ch = new MessageChannel();
        const to = setTimeout(no, 20000);
        ch.port1.onmessage = ev => { clearTimeout(to); ok(ev.data); };
        c.postMessage({ type: "need-token" }, [ch.port2]);
      });
      if (t) return t;
    } catch (e) {}
  }
  return null;
}

async function photo(id) {
  const c = await caches.open("fotos");
  const hit = await c.match("/_blob/" + id);
  if (hit) return hit;
  for (let i = 0; i < 2; i++) {
    const t = await askToken();
    if (!t) break;
    let r;
    try { r = await fetch("https://www.googleapis.com/drive/v3/files/" + id + "?alt=media", { headers: { Authorization: "Bearer " + t } }); }
    catch (e) { break; }
    if (r.ok) { await c.put("/_blob/" + id, r.clone()); return r; }
    if (r.status !== 401) break;
  }
  return new Response("", { status: 503 });
}

async function shell(e) {
  /* rede primeiro (sempre a versão mais nova quando online); cache só se estiver offline/lento */
  const req = e.request;
  const c = await caches.open("shell-" + V);
  const net = fetch(req, { cache: "no-cache" }).then(r => { if (r.ok) c.put(req, r.clone()); return r; });
  try {
    return await Promise.race([net, new Promise((_, no) => setTimeout(no, 4000))]);
  } catch (err) {
    const hit = await c.match(req, { ignoreSearch: true });
    if (hit) return hit;
    try { return await net; } catch (e2) {}
    if (req.mode === "navigate") { const i = await c.match("index.html"); if (i) return i; }
    return new Response("offline", { status: 503 });
  }
}

self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  const m = u.pathname.match(/\/_blob\/([\w-]+)$/);
  if (m) { e.respondWith(photo(m[1])); return; }
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  e.respondWith(shell(e));
});

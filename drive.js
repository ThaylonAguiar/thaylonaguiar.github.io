/* Camada de armazenamento: Google Drive (escopo drive.file) + cópia local (IndexedDB).
   Expõe window.claude.use("db"|"assets"|"downloads") com a mesma interface que o app já usa. */
(function () {
  "use strict";
  var CFG = window.CFG || {};
  var SCOPE = "https://www.googleapis.com/auth/drive.file";
  var API = "https://www.googleapis.com/drive/v3", UP = "https://www.googleapis.com/upload/drive/v3";
  var FOLDER = "Catalogo Menor Preco (app)", DATAFILE = "catalogo-dados.json", PHOTOS = "Fotos";
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var CID = function () { return CFG.CLIENT_ID || localStorage.getItem("cid") || ""; };

  /* ---------- IndexedDB ---------- */
  var idb = new Promise(function (ok, no) {
    var r = indexedDB.open("catalogo-drive", 1);
    r.onupgradeneeded = function () { r.result.createObjectStore("kv"); };
    r.onsuccess = function () { ok(r.result); };
    r.onerror = function () { no(r.error); };
  });
  function kvGet(k) {
    return idb.then(function (d) {
      return new Promise(function (ok, no) {
        var q = d.transaction("kv").objectStore("kv").get(k);
        q.onsuccess = function () { ok(q.result); };
        q.onerror = function () { no(q.error); };
      });
    });
  }
  function kvSet(k, v) {
    return idb.then(function (d) {
      return new Promise(function (ok, no) {
        var t = d.transaction("kv", "readwrite");
        t.objectStore("kv").put(v, k);
        t.oncomplete = function () { ok(); };
        t.onerror = function () { no(t.error); };
      });
    });
  }

  /* ---------- estado ---------- */
  var st = { data: {}, ops: [], meta: {} };
  var saveT = null;
  function save() {
    clearTimeout(saveT);
    saveT = setTimeout(function () { kvSet("st", st).catch(function () {}); }, 250);
  }
  function saveNow() { clearTimeout(saveT); return kvSet("st", st).catch(function () {}); }

  var listeners = {};
  function snap(c) {
    var o = (testMode ? tdata : st.data)[c] || {};
    return { docs: Object.keys(o).map(function (id) { return { id: id, data: function () { return o[id]; } }; }) };
  }
  function notify(c) {
    (listeners[c] || []).forEach(function (cb) { try { cb(snap(c)); } catch (e) { console.error(e); } });
  }

  /* ---------- status ---------- */
  var VERSION = "v52", lastErr = "";
  var state = "init";
  var testMode = false, tdata = null, testPh = [], gShow = false;
  function visitor() { return !testMode && localStorage.getItem("signed") !== "1"; }
  function applyMode() {
    try {
      var b = document.body; if (!b) return;
      b.classList.toggle("ro", visitor()); b.classList.toggle("tst", testMode);
      var g = document.getElementById("gbtn"); if (g) g.style.display = (gShow && !testMode) ? "" : "none";
      var f = document.getElementById("tfr"), p = document.getElementById("tpl");
      if (testMode && !f) {
        f = document.createElement("div"); f.id = "tfr"; f.style.cssText = "position:fixed;inset:0;border:5px solid #ff9800;pointer-events:none;z-index:99998";
        p = document.createElement("div"); p.id = "tpl";
        p.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);bottom:calc(10px + env(safe-area-inset-bottom,0px));z-index:99999;background:#ff9800;color:#111;padding:8px 14px;border-radius:999px;font:700 14px system-ui,sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.5);display:flex;gap:10px;align-items:center;white-space:nowrap";
        p.innerHTML = '<span>🧪 MODO TESTE · nada é salvo</span>';
        var x = document.createElement("button"); x.textContent = "Voltar ao normal";
        x.style.cssText = "border:0;border-radius:999px;background:#111;color:#fff;padding:6px 12px;font-weight:700;cursor:pointer";
        x.onclick = function () { exitTest(); }; p.appendChild(x);
        b.appendChild(f); b.appendChild(p);
      } else if (!testMode) { if (f) f.remove(); if (p) p.remove(); }
      document.title = (testMode ? "🧪 TESTE · " : "") + (document.title || "").replace(/^🧪 TESTE · /, "");
    } catch (e) {}
  }
  function banner(show) {
    try { var b = document.getElementById("lgb"); if (b) b.style.display = "none"; } catch (e) {}
    gShow = !!show; applyMode();
  }
  function allCols() { var o = {}; Object.keys(st.data).forEach(function (c) { o[c] = 1; }); Object.keys(tdata || {}).forEach(function (c) { o[c] = 1; }); Object.keys(listeners).forEach(function (c) { o[c] = 1; }); return Object.keys(o); }
  function enterTest() {
    if (testMode) return;
    tdata = JSON.parse(JSON.stringify(st.data)); testMode = true; testPh = [];
    applyMode(); setSt(state); allCols().forEach(notify); say("Modo TESTE ligado: tudo que você fizer aqui NÃO é salvo.");
  }
  async function exitTest() {
    if (!testMode) return;
    testMode = false; var cols = allCols(); tdata = null;
    try { var c = await caches.open("fotos"); await Promise.all(testPh.map(function (i) { return c.delete("/_blob/" + i); })); } catch (e) {}
    testPh = []; applyMode(); setSt(state); cols.forEach(notify); say("Voltou ao modo normal. Nada do teste foi salvo.");
  }
  function signOut() {
    if (!window.confirm("Sair da conta Google neste aparelho?\n\nO app fica em modo visitante (somente consulta). Alterações pendentes ficam guardadas e sobem quando você entrar de novo.")) return;
    try { if (tok && window.google && google.accounts && google.accounts.oauth2) google.accounts.oauth2.revoke(tok, function () {}); } catch (e) {}
    try { localStorage.removeItem("signed"); localStorage.removeItem("tok"); } catch (e) {}
    tok = null; tokExp = 0; setSt("login"); say("Você saiu. Modo visitante.");
  }
  function setSt(s, extra) {
    state = s;
    var e = document.getElementById("st");
    if (!e) return;
    var n = st.ops.length, p = n ? " · " + n + " pendente(s)" : "";
    var T = {
      init: "○ Iniciando…",
      ok: "● Sincronizado",
      sync: "↻ Sincronizando…",
      off: "○ Sem internet" + p,
      login: "○ Sem login (toque)" + p,
      nocid: "○ Configurar login (toque)",
      err: "○ Erro (toque)" + (extra ? ": " + extra : "") + p
    };
    banner(s === "login" || s === "nocid");
    e.textContent = testMode ? "🧪 MODO TESTE (nada é salvo) · " + VERSION : visitor() ? "👁 Visitante (só consulta) · " + VERSION : (T[s] || s) + " · " + VERSION;
    e.style.cursor = (s === "login" || s === "nocid" || s === "err") ? "pointer" : "";
  }

  /* ---------- login Google (GIS, fluxo de token) ---------- */
  var tok = null, tokExp = 0, pend = null, pendI = false;
  try {
    var s0 = JSON.parse(localStorage.getItem("tok") || "null");
    if (s0 && s0.exp > Date.now()) { tok = s0.t; tokExp = s0.exp; }
  } catch (e) {}

  function redirectLogin() {
    var id = CID(); if (!id) return configure();
    var ru = location.origin + "/";
    location.href = "https://accounts.google.com/o/oauth2/v2/auth?client_id=" + encodeURIComponent(id) + "&redirect_uri=" + encodeURIComponent(ru) + "&response_type=token&scope=" + encodeURIComponent(SCOPE) + "&include_granted_scopes=true&state=cat" + (function () { try { var h = localStorage.getItem("hint"); return h ? "&login_hint=" + encodeURIComponent(h) : ""; } catch (e) { return ""; } })();
  }
  (function () {
    var h = location.hash || "";
    try {
      if (h.indexOf("access_token=") >= 0) {
        var q = new URLSearchParams(h.slice(1)), t = q.get("access_token");
        if (t) {
          tok = t; tokExp = Date.now() + ((+q.get("expires_in") || 3600) - 60) * 1000;
          localStorage.setItem("tok", JSON.stringify({ t: tok, exp: tokExp })); localStorage.setItem("signed", "1");
          setTimeout(function () { learnHint(tok); }, 800);
        }
        history.replaceState(null, "", location.pathname + location.search);
      } else if (h.indexOf("error=") >= 0) {
        lastErr = "Google recusou o login: " + decodeURIComponent(h.slice(1).slice(0, 200));
        history.replaceState(null, "", location.pathname + location.search);
      }
    } catch (e) {}
  })();
  function loadGis() {
    return new Promise(function (ok, no) {
      if (window.google && google.accounts && google.accounts.oauth2) return ok();
      var s = document.createElement("script");
      s.src = "https://accounts.google.com/gsi/client";
      s.onload = function () { ok(); };
      s.onerror = function () { no(Object.assign(new Error("não foi possível carregar o login do Google (sem internet ou bloqueador de conteúdo)"), { code: "net" })); };
      document.head.appendChild(s);
    });
  }
  function learnHint(t) {
    try { if (localStorage.getItem("hint")) return; } catch (e) { return; }
    fetch(API + "/about?fields=user(emailAddress)", { headers: { Authorization: "Bearer " + t } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { var m = j && j.user && j.user.emailAddress; if (m) localStorage.setItem("hint", m); })
      .catch(function () {});
  }
  /* renovacao silenciosa SEM popup: iframe invisivel com prompt=none (o popup do GIS era bloqueado pelo Chrome do celular) */
  function silentIframe(id) {
    return new Promise(function (ok, no) {
      var f = document.createElement("iframe"), done = false;
      f.name = "silentauth"; f.style.cssText = "display:none;width:0;height:0;border:0";
      function end(err, r) {
        if (done) return; done = true; clearTimeout(to); window.removeEventListener("message", on);
        try { f.remove(); } catch (e) {}
        if (err) return no(Object.assign(new Error(err), { auth: true }));
        tok = r.t; tokExp = Date.now() + (r.e - 60) * 1000;
        try { localStorage.setItem("tok", JSON.stringify({ t: tok, exp: tokExp })); localStorage.setItem("signed", "1"); } catch (e) {}
        ok(tok);
      }
      function on(ev) {
        if (ev.origin !== location.origin || !ev.data || ev.data.silentAuth !== 1) return;
        var q = new URLSearchParams(String(ev.data.hash || "").replace(/^#/, "")), t = q.get("access_token");
        if (t) end(null, { t: t, e: +q.get("expires_in") || 3600 }); else end("login");
      }
      var to = setTimeout(function () { end("tempo esgotado"); }, 12000);
      window.addEventListener("message", on);
      var hint = ""; try { hint = localStorage.getItem("hint") || ""; } catch (e) {}
      f.src = "https://accounts.google.com/o/oauth2/v2/auth?client_id=" + encodeURIComponent(id) + "&redirect_uri=" + encodeURIComponent(location.origin + "/") + "&response_type=token&scope=" + encodeURIComponent(SCOPE) + "&prompt=none&state=silent" + (hint ? "&login_hint=" + encodeURIComponent(hint) : "");
      document.body.appendChild(f);
    });
  }
  function getToken(interactive) {
    if (tok && tokExp > Date.now() + 60000) return Promise.resolve(tok);
    if (pend && (!interactive || pendI)) return pend;
    var p = (async function () {
      {
        if (!interactive && localStorage.getItem("signed") !== "1") throw Object.assign(new Error("login"), { auth: true });
        var id = CID();
        if (!id) throw Object.assign(new Error("Falta o Client ID"), { code: "cid" });
        if (!interactive) return await silentIframe(id);
        await loadGis();
        return await new Promise(function (ok, no) {
          var done = false;
          var to = setTimeout(function () { if (!done) { done = true; no(Object.assign(new Error("tempo esgotado"), { auth: true })); } }, interactive ? 120000 : 15000);
          var c = google.accounts.oauth2.initTokenClient({
            client_id: id, scope: SCOPE, hint: (function () { try { return localStorage.getItem("hint") || undefined; } catch (e) { return undefined; } })(),
            callback: function (r) {
              if (done) return; done = true; clearTimeout(to);
              if (r.error) return no(Object.assign(new Error(r.error), { auth: true }));
              tok = r.access_token; tokExp = Date.now() + (r.expires_in || 3600) * 1000;
              try { localStorage.setItem("tok", JSON.stringify({ t: tok, exp: tokExp })); localStorage.setItem("signed", "1"); } catch (e) {}
              learnHint(tok); ok(tok);
            },
            error_callback: function (e) {
              if (done) return; done = true; clearTimeout(to);
              no(Object.assign(new Error((e && e.type) || "erro"), { auth: true }));
            }
          });
          c.requestAccessToken({ prompt: interactive ? "" : "none" });
        });
      }
    })();
    pend = p; pendI = !!interactive;
    var clr = function () { if (pend === p) pend = null; };
    p.then(clr, clr);
    return p;
  }

  /* ---------- chamadas ao Drive ---------- */
  async function gf(url, o, tries) {
    o = o || {}; tries = tries || 0;
    var t = await getToken(false);
    var h = Object.assign({}, o.headers, { Authorization: "Bearer " + t });
    var r;
    try { r = await fetch(url, Object.assign({}, o, { headers: h })); }
    catch (e) { throw Object.assign(new Error("sem internet"), { code: "net" }); }
    if (r.status === 401 && tries < 1) { tok = null; tokExp = 0; return gf(url, o, tries + 1); }
    if ((r.status === 429 || r.status >= 500) && tries < 4) { await sleep(800 * Math.pow(2, tries)); return gf(url, o, tries + 1); }
    if (!r.ok) {
      var tx = await r.text().catch(function () { return ""; });
      throw Object.assign(new Error("Drive " + r.status + " " + tx.slice(0, 120)), { code: "http" + r.status, auth: r.status === 401 });
    }
    return r;
  }
  function multipart(meta, blob, type) {
    var b = "----cat" + Math.random().toString(36).slice(2);
    var body = new Blob(["--" + b + "\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n" + JSON.stringify(meta) + "\r\n--" + b + "\r\nContent-Type: " + type + "\r\n\r\n", blob, "\r\n--" + b + "--"]);
    return { body: body, headers: { "Content-Type": "multipart/related; boundary=" + b } };
  }
  async function findOne(name, parent, folder) {
    var q = "name='" + name + "' and trashed=false" + (folder ? " and mimeType='application/vnd.google-apps.folder'" : "") + (parent ? " and '" + parent + "' in parents" : "");
    var r = await (await gf(API + "/files?q=" + encodeURIComponent(q) + "&fields=files(id)&pageSize=5&spaces=drive")).json();
    return r.files && r.files.length ? r.files[0].id : null;
  }
  async function mkFolder(name, parent) {
    var body = { name: name, mimeType: "application/vnd.google-apps.folder" };
    if (parent) body.parents = [parent];
    var r = await (await gf(API + "/files?fields=id", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })).json();
    return r.id;
  }
  async function ensure() {
    var m = st.meta;
    if (m.folder && m.photos && m.file) return;
    var f = m.folder || await findOne(FOLDER, null, true) || await mkFolder(FOLDER);
    var p = m.photos || await findOne(PHOTOS, f, true) || await mkFolder(PHOTOS, f);
    var d = m.file || await findOne(DATAFILE, f, false);
    if (!d) {
      var mp = multipart({ name: DATAFILE, parents: [f], mimeType: "application/json" }, new Blob([JSON.stringify({ rev: Date.now(), data: {} })]), "application/json");
      var c = await (await gf(UP + "/files?uploadType=multipart&fields=id,version", { method: "POST", headers: mp.headers, body: mp.body })).json();
      d = c.id; m.ver = undefined;
    }
    m.folder = f; m.photos = p; m.file = d;
    save();
  }

  /* ---------- sincronização ---------- */
  function applyOp(c, id, d) {
    if (d == null) { if (st.data[c]) delete st.data[c][id]; }
    else { (st.data[c] = st.data[c] || {})[id] = d; }
  }
  var busy = null, again = false;
  function sync() {
    if (testMode) return Promise.resolve();
    if (busy) { again = true; return busy; }
    busy = (async function () {
      try { do { again = false; await syncOnce(); } while (again); }
      finally { busy = null; }
    })();
    return busy;
  }
  async function syncOnce() {
    if (!navigator.onLine) return setSt("off");
    if (!CID()) return setSt("nocid");
    setSt("sync");
    try {
      await getToken(false);
      await ensure();
      var m = st.meta;
      var info = await (await gf(API + "/files/" + m.file + "?fields=version")).json();
      if (info.version !== m.ver) {
        var rem = await (await gf(API + "/files/" + m.file + "?alt=media")).json();
        var cols = {};
        Object.keys(st.data).forEach(function (c) { cols[c] = 1; });
        var rd = (rem && rem.data) || {};
        Object.keys(rd).forEach(function (c) { cols[c] = 1; });
        st.data = rd;
        st.ops.forEach(function (o) { applyOp(o.c, o.id, o.d); });
        m.ver = info.version;
        Object.keys(cols).forEach(notify);
      }
      if (st.ops.length) {
        var n = st.ops.length;
        var body = JSON.stringify({ rev: Date.now(), data: st.data });
        var up = await (await gf(UP + "/files/" + m.file + "?uploadType=media&fields=version", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: body })).json();
        st.ops.splice(0, n);
        m.ver = up.version;
      }
      await saveNow();
      setSt("ok");
    } catch (e) {
      if (e.code === "net") setSt("off");
      else if (e.code === "cid") setSt("nocid");
      else if (e.auth) setSt("login");
      else { console.error(e); setSt("err", (e.message || "").slice(0, 60)); }
    }
  }
  var flushT = null;
  function schedule() { clearTimeout(flushT); flushT = setTimeout(sync, 1500); }

  function say(m) { if (typeof window.toast === "function") window.toast(m); else console.log(m); }
  async function signIn() {
    /* Login em tela cheia (sem pop-up): o navegador não bloqueia e funciona igual no celular e no PC. */
    if (!CID()) return configure();
    say("Abrindo o login do Google…");
    redirectLogin();
  }
  function configure() {
    var v = window.prompt("Cole aqui o Client ID do Google (termina com .apps.googleusercontent.com):", CID());
    if (v && v.trim()) { localStorage.setItem("cid", v.trim()); signIn(); }
  }

  /* ---------- db ---------- */
  function put(c, id, d) {
    if (visitor()) return Promise.reject(Object.assign(new Error("Modo visitante: somente consulta. Entre com o Google para alterar."), { ro: true }));
    var v = d == null ? null : JSON.parse(JSON.stringify(d));
    if (testMode) {
      if (v == null) { if (tdata[c]) delete tdata[c][id]; } else { (tdata[c] = tdata[c] || {})[id] = v; }
      notify(c); return Promise.resolve();
    }
    applyOp(c, id, v);
    st.ops = st.ops.filter(function (o) { return !(o.c === c && o.id === id); });
    st.ops.push({ c: c, id: id, d: v });
    notify(c); save(); schedule(); setSt(state === "ok" || state === "init" ? "sync" : state);
    return Promise.resolve();
  }
  var dbo = {
    doc: function (p) {
      var i = p.indexOf("/"), c = p.slice(0, i), id = p.slice(i + 1);
      return {
        set: function (d) { return put(c, id, d); },
        update: function (d) { return put(c, id, Object.assign({}, ((testMode ? tdata : st.data)[c] || {})[id], d)); },
        delete: function () { return put(c, id, null); },
        get: function () { var x = ((testMode ? tdata : st.data)[c] || {})[id]; return Promise.resolve({ exists: !!x, data: function () { return x; } }); }
      };
    },
    collection: function (c) {
      return {
        onSnapshot: function (cb) {
          (listeners[c] = listeners[c] || []).push(cb);
          Promise.resolve().then(function () { cb(snap(c)); });
          return function () { listeners[c] = listeners[c].filter(function (f) { return f !== cb; }); };
        }
      };
    },
    dump: function () { return JSON.parse(JSON.stringify(testMode ? tdata : st.data)); }
  };

  /* ---------- fotos ---------- */
  function safeName(r) { return String(r || "sem-ref").replace(/[\\\/:*?"<>|']+/g, "_").trim().slice(0, 80) || "sem-ref"; }
  var subP = {};
  async function refFolder(ref) {
    var n = safeName(ref);
    st.meta.sub = st.meta.sub || {};
    if (st.meta.sub[n]) return st.meta.sub[n];
    if (subP[n]) return subP[n];
    subP[n] = (async function () {
      var id = (await findOne(n, st.meta.photos, true)) || (await mkFolder(n, st.meta.photos));
      st.meta.sub[n] = id; save(); return id;
    })();
    try { return await subP[n]; } finally { delete subP[n]; }
  }
  var assets = {
    upload: async function (blob, ref) {
      if (visitor()) throw new Error("Modo visitante: somente consulta.");
      if (testMode) {
        var tid = "t_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
        (await caches.open("fotos")).put("/_blob/" + tid, new Response(blob, { headers: { "Content-Type": "image/jpeg" } }));
        testPh.push(tid); return { id: tid };
      }
      await ensure();
      var folder = await refFolder(ref);
      var name = safeName(ref) + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5) + ".jpg";
      var last;
      for (var i = 0; i < 3; i++) {
        try {
          var mp = multipart({ name: name, parents: [folder], appProperties: { ref: String(ref || "") } }, blob, "image/jpeg");
          var r = await (await gf(UP + "/files?uploadType=multipart&fields=id", { method: "POST", headers: mp.headers, body: mp.body })).json();
          try { (await caches.open("fotos")).put("/_blob/" + r.id, new Response(blob, { headers: { "Content-Type": "image/jpeg" } })); } catch (e) {}
          (st.meta.org = st.meta.org || {})[r.id] = 1;
          return { id: r.id };
        } catch (e) { last = e; if (e.auth) break; await sleep(1500 * (i + 1)); }
      }
      if (last && last.auth) { setSt("login"); last.message = "Entre com o Google (toque no aviso do topo)"; }
      throw last;
    },
    organize: async function (pairs, onProg) {
      if (testMode || visitor()) return { ok: 0, bad: 0, skipped: pairs.length };
      await ensure();
      st.meta.org = st.meta.org || {};
      var todo = pairs.filter(function (p) { return !st.meta.org[p.id]; }), i = 0, ok = 0, bad = 0, n = 0;
      async function w() {
        while (i < todo.length) {
          var p = todo[i++];
          try {
            var f = await refFolder(p.ref);
            await gf(API + "/files/" + p.id + "?addParents=" + f + "&removeParents=" + st.meta.photos + "&fields=id", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ appProperties: { ref: String(p.ref || "") } }) });
            st.meta.org[p.id] = 1; ok++;
          } catch (e) { bad++; }
          n++; if (onProg && n % 10 === 0) onProg(n, todo.length);
        }
      }
      await Promise.all([1, 2, 3, 4].map(w));
      save(); await saveNow();
      return { ok: ok, bad: bad, skipped: pairs.length - todo.length };
    },
    delete: async function (id) {
      if (visitor()) throw new Error("Modo visitante: somente consulta.");
      if (testMode) { if (String(id).indexOf("t_") === 0) { try { (await caches.open("fotos")).delete("/_blob/" + id); } catch (e) {} } return; }
      await gf(API + "/files/" + id, { method: "DELETE" });
      try { (await caches.open("fotos")).delete("/_blob/" + id); } catch (e) {}
    }
  };

  /* ---------- downloads ---------- */
  var downloads = {
    save: function (o) {
      return new Promise(function (ok) {
        var u = URL.createObjectURL(o.data instanceof Blob ? o.data : new Blob([o.data]));
        var a = document.createElement("a");
        a.href = u; a.download = o.filename; document.body.appendChild(a); a.click();
        setTimeout(function () { a.remove(); URL.revokeObjectURL(u); ok(); }, 1500);
      });
    }
  };

  /* ---------- inicialização ---------- */
  var ready = (async function () {
    try { var s = await kvGet("st"); if (s) { st = s; st.data = st.data || {}; st.ops = st.ops || []; st.meta = st.meta || {}; } } catch (e) {}
    setTimeout(function () {
      loadGis().catch(function () {});
      setSt(navigator.onLine ? "sync" : "off");
      sync();
    }, 400);
    try { navigator.storage && navigator.storage.persist && navigator.storage.persist(); } catch (e) {}
    return dbo;
  })();

  document.addEventListener("click", function (ev) {
    var t = ev.target;
    if (!t || t.id !== "st") return;
    if (state === "nocid") configure(); else if (state === "login") signIn(); else if (state === "err" || state === "off") sync();
    else say("Estado: " + (t.textContent || state));
  });
  /* Renova o acesso quando você toca na tela: o navegador só deixa abrir a janela do Google a partir de um toque. */
  var lastTry = 0;
  function maybeRefresh() {
    if (!CID() || localStorage.getItem("signed") !== "1" || pend) return;
    if (tok && tokExp > Date.now() + 5 * 60000) return;
    if (Date.now() - lastTry < 30000) return;
    lastTry = Date.now();
    getToken(false).then(function () { sync(); }, function () {});
  }
  document.addEventListener("pointerdown", maybeRefresh, true);
  window.addEventListener("online", sync);
  window.addEventListener("offline", function () { setSt("off"); });
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "visible") sync(); else saveNow(); });
  window.addEventListener("pagehide", saveNow);
  setInterval(function () { if (document.visibilityState === "visible" && state !== "login" && state !== "nocid") sync(); }, 25000);

  window.claude = {
    use: function (n) {
      if (n === "db") return ready;
      if (n === "assets") return Promise.resolve(assets);
      if (n === "downloads") return Promise.resolve(downloads);
      return Promise.resolve(null);
    }
  };
  window.driveSync = sync;
  window.driveSignIn = signIn;
  window.catMode = { enterTest: enterTest, exitTest: exitTest, signOut: signOut, gSign: function () { if (state === "nocid") configure(); else signIn(); }, ro: visitor, test: function () { return testMode; } };
  document.addEventListener("DOMContentLoaded", applyMode);

  /* ---------- service worker ---------- */
  if ("serviceWorker" in navigator) {
    var had = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.register("sw.js").then(function (reg) {
      var chk = function () { try { reg.update(); } catch (e) {} };
      document.addEventListener("visibilitychange", function () { if (!document.hidden) chk(); });
      setInterval(chk, 600000);
    }).catch(function () {});
    window.atualizarApp = async function () {
      try { var ks = await caches.keys(); for (var i = 0; i < ks.length; i++) if (ks[i].indexOf("shell-") === 0) await caches.delete(ks[i]); } catch (e) {}
      try { var rs = await navigator.serviceWorker.getRegistrations(); for (var j = 0; j < rs.length; j++) await rs[j].unregister(); } catch (e) {}
      location.reload();
    };
    navigator.serviceWorker.addEventListener("message", function (e) {
      if (e.data && e.data.type === "need-token" && e.ports && e.ports[0]) {
        getToken(false).then(function (t) { e.ports[0].postMessage(t); }, function () { e.ports[0].postMessage(null); });
      }
    });
    var reloaded = false;
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      if (reloaded) return; reloaded = true; location.reload();
    });
  }
})();

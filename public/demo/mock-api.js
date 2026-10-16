/*!
 * NERA (gestion d'hôtel) : API de démonstration (données simulées).
 * Chargé AVANT le bundle. Intercepte fetch, XMLHttpRequest (axios), WebSocket,
 * EventSource et sendBeacon : aucune requête ne part vers un backend
 * (les appels vers /api, ou vers http://localhost:8081, sont servis ici).
 * Les ressources statiques du site (JS, CSS, images, polices) passent normalement.
 */
(function () {
  'use strict';
  if (window.__DEMO_MOCK__) return;

  /* ====================================================================== */
  /* 1. Configuration propre au site                                        */
  /* ====================================================================== */

  var SITE = {
    name: 'hotel',
    // L'application appelle `${API_URL}/...` (src/config.js), soit /api/... en démo.
    isApi: function (u) { return /^\/api(\/|$)/.test(u.pathname); },
    fallback: function (ctx) {
      if (ctx.method !== 'GET') return { success: true };
      return /nombre|count|stat/i.test(ctx.path) ? 0 : [];
    },
    routes: []
  };

  // Avatars et vignettes générés localement (SVG en data: URI, aucun service externe).
  var PALETTE = ['#14377B', '#2E86C8', '#38A1E8', '#1f9d6b', '#5b6b8c', '#b5651d', '#7b4ea3', '#c0392b'];
  function svgTile(text, color, round) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">' +
      (round ? '<circle cx="40" cy="40" r="40" fill="' + color + '"/>' : '<rect width="80" height="80" rx="10" fill="' + color + '"/>') +
      '<text x="40" y="40" dy=".35em" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="30" font-weight="700" fill="#ffffff">' +
      text + '</text></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
  function initials(name) {
    var p = String(name || '?').trim().split(/\s+/);
    var s = ((p[0] || '?').charAt(0) + (p.length > 1 ? p[p.length - 1].charAt(0) : '')).toUpperCase();
    return s.replace(/[<>&"]/g, '');
  }
  function slug(s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '.').replace(/^\.|\.$/g, '');
  }
  function stockStatus(n) { return Number(n) < 25 ? 'Insuffisant' : 'Suffisant'; }

  var BASE_USERS = ['Jean Atangana', 'Marie Ewane', 'Paul Ndzi', 'Sandrine Ekotto', 'Eric Fouda', 'Carine Mballa', 'Hervé Nkou', 'Aline Tchoua'].map(function (username, i) {
    return {
      id: i + 1,
      username: username,
      img: svgTile(initials(username), PALETTE[i % PALETTE.length], true),
      tel: '6XX XXX XXX',
      email: slug(username) + '@exemple.org',
      age: 24 + i * 3,
      role: ['Réceptionniste', 'Gouvernante', 'Cuisinier', 'Comptable', 'Agent sécurité', 'Serveur', 'Maintenance', 'Manager'][i],
      salaire: 120000 + i * 15000,
      status: ['actif', 'actif', 'pending', 'actif', 'deconnecter', 'actif', 'pending', 'actif'][i]
    };
  });

  var CATS = ['Linge', 'Hygiène', 'Boissons', 'Petit-déjeuner', 'Maintenance'];
  function productImg(name, category) {
    var k = CATS.indexOf(category);
    return svgTile(initials(name), PALETTE[(k < 0 ? 5 : k) % PALETTE.length], false);
  }
  var BASE_PRODUCTS = [
    ['Draps 2 places', 'Linge', 3500, 120, 'Parure de draps en coton pour lit double'],
    ['Savon d’accueil', 'Hygiène', 250, 18, 'Savon individuel pour salle de bain'],
    ['Eau minérale 1,5 L', 'Boissons', 500, 340, 'Bouteille pour minibar et restaurant'],
    ['Serviettes de bain', 'Linge', 4000, 22, 'Serviette éponge 70 x 140 cm'],
    ['Café moulu 1 kg', 'Petit-déjeuner', 6500, 9, 'Café arabica pour le service du matin'],
    ['Ampoules LED', 'Maintenance', 1500, 60, 'Ampoule E27 9 W blanc chaud']
  ].map(function (p, i) {
    return { id: i + 1, produit: p[0], category: p[1], prix: p[2], stock: p[3], description: p[4], img: productImg(p[0], p[1]), status: stockStatus(p[3]) };
  });

  function users() { return S.get('users', BASE_USERS); }
  function products() { return S.get('products', BASE_PRODUCTS); }
  function nextId(key, list) {
    var max = list.reduce(function (m, x) { return Math.max(m, Number(x.id) || 0); }, 0);
    var n = Math.max(S.get(key, 0), max + 1);
    S.set(key, n + 1);
    return n;
  }
  function byId(list, id) { for (var i = 0; i < list.length; i++) if (String(list[i].id) === String(id)) return list[i]; return null; }
  function num(v, def) {
    if (v == null || String(v).trim() === '') return def;
    var n = Number(String(v).replace(/\s/g, '').replace(',', '.').replace(/[^\d.-]/g, ''));
    return isFinite(n) ? n : def;
  }
  function obj(b) { return b && typeof b === 'object' ? b : {}; }

  function toast(msg) {
    try {
      var t = document.createElement('div');
      t.textContent = msg;
      t.setAttribute('role', 'status');
      t.style.cssText = 'position:fixed;right:16px;bottom:16px;z-index:2147483001;font:600 13px/1.3 Montserrat,Helvetica,Arial,sans-serif;' +
        'color:#fff;background:#14377B;border-left:4px solid #38A1E8;padding:10px 14px;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,.2)';
      document.body.appendChild(t);
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 3500);
    } catch (e) { /* ignore */ }
  }

  // Les formulaires de l'application n'ont ni action ni gestion du submit :
  // sans backend, l'envoi natif rechargerait la page et annulerait la requête en cours.
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (f && f.tagName === 'FORM' && !f.getAttribute('action')) e.preventDefault();
  }, true);

  /* ---- Utilisateurs (personnel) ---- */
  route('GET', /^\/nombre-utilisateurs\/?$/, function () { return users().length; });
  route('GET', /^\/utilisateurs\/?$/, function () { return users(); });
  route('GET', /^\/utilisateurs\/([^/]+)\/?$/, function (ctx) {
    return byId(users(), ctx.params[1]) || R(404, { message: 'Utilisateur introuvable' });
  });
  route('POST', /^\/utilisateurs\/?$/, function (ctx) {
    var b = obj(ctx.body), list = users();
    var name = b.username || b.nom || 'Nouvel employé';
    var u = {
      id: nextId('userSeq', list), username: name,
      img: svgTile(initials(name), PALETTE[list.length % PALETTE.length], true),
      tel: '6XX XXX XXX', email: b.email || slug(name) + '@exemple.org',
      age: num(b.age, 30), role: b.role || b.poste || 'Réceptionniste',
      salaire: num(b.salaire, 120000), status: b.status || 'actif'
    };
    list.push(u); S.set('users', list);
    toast('Employé « ' + u.username + ' » ajouté (démo)');
    return R(201, u);
  });
  route('PUT', /^\/utilisateurs\/([^/]+)\/?$/, function (ctx) {
    var list = users(), u = byId(list, ctx.params[1]);
    if (!u) return R(404, { message: 'Utilisateur introuvable' });
    var b = obj(ctx.body);
    Object.keys(b).forEach(function (k) { if (k !== 'id') u[k] = b[k]; });
    S.set('users', list);
    return u;
  });
  route('DELETE', /^\/utilisateurs\/([^/]+)\/?$/, function (ctx) {
    var id = ctx.params[1];
    S.set('users', users().filter(function (u) { return String(u.id) !== String(id); }));
    return { success: true, id: Number(id) };
  });

  /* ---- Produits / stock ---- */
  route('GET', /^\/produits\/?$/, function () { return products(); });
  route('GET', /^\/produits\/([^/]+)\/?$/, function (ctx) {
    return byId(products(), ctx.params[1]) || R(404, { message: 'Produit introuvable' });
  });
  route('POST', /^\/produits\/?$/, function (ctx) {
    var b = obj(ctx.body);
    // Téléversement d'image seul (FormData { image }) : accepté sans créer de produit.
    if (!b.produit) {
      if ('image' in b) return { success: true, message: 'Image reçue (démo)' };
      return R(400, { message: 'Le nom du produit est obligatoire' });
    }
    var list = products(), stock = num(b.stock, 0);
    var p = {
      id: nextId('productSeq', list), produit: String(b.produit), category: b.category || 'Divers',
      prix: num(b.prix, 0), stock: stock, description: b.description || '',
      img: productImg(b.produit, b.category), status: stockStatus(stock)
    };
    list.push(p); S.set('products', list);
    toast('Produit « ' + p.produit + ' » ajouté (démo)');
    return R(201, p);
  });
  route('PUT', /^\/produits\/([^/]+)\/?$/, function (ctx) {
    var list = products(), p = byId(list, ctx.params[1]);
    if (!p) return R(404, { message: 'Produit introuvable' });
    var b = obj(ctx.body);
    Object.keys(b).forEach(function (k) { if (k !== 'id') p[k] = b[k]; });
    p.stock = num(p.stock, 0); p.prix = num(p.prix, 0); p.status = stockStatus(p.stock);
    S.set('products', list);
    return p;
  });
  route('DELETE', /^\/produits\/([^/]+)\/?$/, function (ctx) {
    var id = ctx.params[1];
    S.set('products', products().filter(function (p) { return String(p.id) !== String(id); }));
    return { success: true, id: Number(id) };
  });

  /* ====================================================================== */
  /* 2. Noyau commun (identique sur tous les sites de démo)                 */
  /* ====================================================================== */

  function route(method, re, fn) { SITE.routes.push({ method: method, re: re, fn: fn }); }

  // État de démo persistant pour l'onglet (sessionStorage, repli en mémoire).
  var MEM = {};
  var S = {
    key: function (k) { return '__demo_' + SITE.name + '_' + k; },
    get: function (k, def) {
      try { var v = sessionStorage.getItem(S.key(k)); if (v != null) return JSON.parse(v); } catch (e) { if (S.key(k) in MEM) return MEM[S.key(k)]; }
      return def;
    },
    set: function (k, v) { MEM[S.key(k)] = v; try { sessionStorage.setItem(S.key(k), JSON.stringify(v)); } catch (e) { /* mémoire seule */ } }
  };

  function R(status, body, headers) { return { __r: true, status: status, body: body, headers: headers || {} }; }

  var DEMO = window.__DEMO_MOCK__ = { site: SITE.name, calls: [], blocked: [], R: R, S: S };
  var STATIC_HOSTS = /(^|\.)(fonts\.googleapis\.com|fonts\.gstatic\.com|unpkg\.com|cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com)$/i;

  function toURL(url) { try { return new URL(String(url), location.href); } catch (e) { return null; } }

  // 'pass' : ressource statique du site ou CDN public ; 'mock' : tout le reste.
  function classify(url) {
    var u = toURL(url);
    if (!u) return 'mock';
    if (u.protocol === 'data:' || u.protocol === 'blob:') return 'pass';
    if (u.origin === location.origin) return SITE.isApi(u) ? 'mock' : 'pass';
    if (STATIC_HOSTS.test(u.hostname) && !(SITE.isApi(u))) return 'pass';
    return 'mock';
  }

  function parseBody(b) {
    if (b == null) return null;
    if (typeof b === 'string') { try { return JSON.parse(b); } catch (e) { return b; } }
    try {
      if (typeof FormData !== 'undefined' && b instanceof FormData) {
        var o = {}; b.forEach(function (v, k) { o[k] = (typeof File !== 'undefined' && v instanceof File) ? v.name : v; }); return o;
      }
      if (typeof URLSearchParams !== 'undefined' && b instanceof URLSearchParams) {
        var q = {}; b.forEach(function (v, k) { q[k] = v; }); return q;
      }
    } catch (e) { /* ignore */ }
    return b;
  }

  function resolve(method, url, body, headers) {
    var u = toURL(url) || new URL(location.origin);
    var query = {};
    u.searchParams.forEach(function (v, k) { query[k] = v; });
    var ctx = { method: String(method || 'GET').toUpperCase(), url: u, path: u.pathname.replace(/^\/api(?=\/|$)/, '') || '/', query: query, body: parseBody(body), headers: headers || {} };
    var out;
    try {
      for (var i = 0; i < SITE.routes.length; i++) {
        var r = SITE.routes[i];
        if (r.method !== '*' && r.method !== ctx.method) continue;
        var m = ctx.path.match(r.re) || (u.href.match(r.re));
        if (!m) continue;
        ctx.params = m;
        out = r.fn(ctx);
        if (out !== undefined) break;
      }
    } catch (e) {
      try { console.warn('[démo] erreur du mock', ctx.method, ctx.path, e); } catch (e2) { /* ignore */ }
      out = undefined;
    }
    var matched = out !== undefined;
    if (!matched) out = SITE.fallback(ctx);
    var res = out && out.__r ? out : R(200, out);
    DEMO.calls.push({ method: ctx.method, url: u.href, status: res.status, matched: matched });
    return res;
  }

  function delay() { return 200 + Math.floor(Math.random() * 300); }

  function bodyText(res) {
    if (res.body === undefined || res.body === null) return res.status === 204 ? '' : 'null';
    return typeof res.body === 'string' ? res.body : JSON.stringify(res.body);
  }
  function contentType(res) {
    return res.headers['content-type'] || (typeof res.body === 'string' ? 'text/plain; charset=utf-8' : 'application/json; charset=utf-8');
  }
  var STATUS_TEXT = { 200: 'OK', 201: 'Created', 204: 'No Content', 400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not Found', 500: 'Internal Server Error' };

  /* ---- fetch ---- */
  var realFetch = window.fetch ? window.fetch.bind(window) : null;
  window.fetch = function (input, init) {
    init = init || {};
    var isReq = typeof Request !== 'undefined' && input instanceof Request;
    var url = isReq ? input.url : (input && input.href) || String(input);
    if (classify(url) === 'pass') return realFetch(input, init);
    var method = init.method || (isReq ? input.method : 'GET');
    var signal = init.signal || (isReq ? input.signal : null);
    var hdrs = {};
    try { new Headers(init.headers || (isReq ? input.headers : undefined)).forEach(function (v, k) { hdrs[k] = v; }); } catch (e) { /* ignore */ }
    var bodyP = init.body !== undefined ? Promise.resolve(init.body) : (isReq && method !== 'GET' && method !== 'HEAD' ? input.clone().text() : Promise.resolve(null));
    return bodyP.then(function (b) {
      return new Promise(function (ok, ko) {
        if (signal && signal.aborted) return ko(new DOMException('Aborted', 'AbortError'));
        var t = setTimeout(function () {
          var res = resolve(method, url, b, hdrs);
          var noBody = res.status === 204 || res.status === 304 || String(method).toUpperCase() === 'HEAD';
          var h = new Headers(res.headers); h.set('content-type', contentType(res));
          var resp = new Response(noBody ? null : bodyText(res), { status: res.status, statusText: STATUS_TEXT[res.status] || '', headers: h });
          try { Object.defineProperty(resp, 'url', { value: toURL(url).href }); } catch (e) { /* ignore */ }
          ok(resp);
        }, delay());
        if (signal) signal.addEventListener('abort', function () { clearTimeout(t); ko(new DOMException('Aborted', 'AbortError')); });
      });
    });
  };

  /* ---- XMLHttpRequest (axios) ---- */
  var XP = window.XMLHttpRequest && window.XMLHttpRequest.prototype;
  if (XP) {
    var oOpen = XP.open, oSend = XP.send, oSet = XP.setRequestHeader, oAbort = XP.abort,
      oAll = XP.getAllResponseHeaders, oOne = XP.getResponseHeader, oMime = XP.overrideMimeType;
    var fire = function (xhr, type) {
      var ev;
      try { ev = type === 'readystatechange' ? new Event(type) : new ProgressEvent(type, { lengthComputable: false }); } catch (e) { ev = document.createEvent('Event'); ev.initEvent(type, false, false); }
      xhr.dispatchEvent(ev);
    };
    var defineState = function (xhr, st) {
      ['readyState', 'status', 'statusText', 'responseText', 'response', 'responseURL', 'responseXML'].forEach(function (p) {
        Object.defineProperty(xhr, p, { configurable: true, get: function () { return st[p]; } });
      });
    };
    XP.open = function (method, url) {
      if (classify(url) === 'pass') { this.__demo = null; return oOpen.apply(this, arguments); }
      var st = { readyState: 1, status: 0, statusText: '', responseText: '', response: '', responseURL: '', responseXML: null };
      this.__demo = { method: method, url: url, headers: {}, st: st, aborted: false, timer: null, resHeaders: '' };
      defineState(this, st);
      fire(this, 'readystatechange');
    };
    XP.setRequestHeader = function (k, v) { if (this.__demo) { this.__demo.headers[String(k).toLowerCase()] = v; return; } return oSet.apply(this, arguments); };
    XP.overrideMimeType = function () { if (this.__demo) return; return oMime.apply(this, arguments); };
    XP.getAllResponseHeaders = function () { return this.__demo ? this.__demo.resHeaders : oAll.apply(this, arguments); };
    XP.getResponseHeader = function (name) {
      if (!this.__demo) return oOne.apply(this, arguments);
      var m = this.__demo.resHeaders.match(new RegExp('^' + String(name).replace(/[-]/g, '\\-') + ':\\s*(.*)$', 'im'));
      return m ? m[1].trim() : null;
    };
    XP.abort = function () {
      var d = this.__demo;
      if (!d) return oAbort.apply(this, arguments);
      d.aborted = true; clearTimeout(d.timer);
      d.st.readyState = 4; d.st.status = 0;
      fire(this, 'readystatechange'); fire(this, 'abort'); fire(this, 'loadend');
    };
    XP.send = function (body) {
      var d = this.__demo, xhr = this;
      if (!d) return oSend.apply(this, arguments);
      fire(xhr, 'loadstart');
      d.timer = setTimeout(function () {
        if (d.aborted) return;
        var res = resolve(d.method, d.url, body, d.headers);
        var text = bodyText(res);
        var st = d.st;
        var hdr = Object.assign({}, res.headers, { 'content-type': contentType(res) });
        d.resHeaders = Object.keys(hdr).map(function (k) { return k + ': ' + hdr[k]; }).join('\r\n') + '\r\n';
        st.status = res.status; st.statusText = STATUS_TEXT[res.status] || '';
        st.responseURL = (toURL(d.url) || {}).href || '';
        st.responseText = text;
        var rt = xhr.responseType;
        if (rt === 'json') { try { st.response = JSON.parse(text); } catch (e) { st.response = null; } }
        else if (rt === 'blob') st.response = new Blob([text], { type: hdr['content-type'] });
        else if (rt === 'arraybuffer') st.response = new TextEncoder().encode(text).buffer;
        else st.response = text;
        st.readyState = 2; fire(xhr, 'readystatechange');
        st.readyState = 3; fire(xhr, 'readystatechange');
        st.readyState = 4; fire(xhr, 'readystatechange');
        fire(xhr, 'load'); fire(xhr, 'loadend');
      }, delay());
    };
  }

  /* ---- WebSocket / EventSource : stubs qui n'ouvrent rien ---- */
  function makeStub(kind) {
    function Stub(url) {
      var et = new EventTarget();
      this._et = et;
      this.url = String(url); this.readyState = 0; this.protocol = ''; this.extensions = '';
      this.bufferedAmount = 0; this.binaryType = 'blob'; this.withCredentials = false;
      this.onopen = this.onmessage = this.onerror = this.onclose = null;
      DEMO.blocked.push(kind + ' ' + this.url);
    }
    Stub.prototype.addEventListener = function (t, f, o) { if (this._et) this._et.addEventListener(t, f, o); };
    Stub.prototype.removeEventListener = function (t, f, o) { if (this._et) this._et.removeEventListener(t, f, o); };
    Stub.prototype.dispatchEvent = function (e) { return this._et ? this._et.dispatchEvent(e) : true; };
    Stub.prototype.send = function () { /* rien n'est envoyé en démo */ };
    Stub.prototype.close = function () { this.readyState = kind === 'WebSocket' ? 3 : 2; };
    Stub.CONNECTING = 0; Stub.OPEN = 1; Stub.CLOSING = 2; Stub.CLOSED = kind === 'WebSocket' ? 3 : 2;
    return Stub;
  }
  window.WebSocket = makeStub('WebSocket');
  if (window.EventSource) window.EventSource = makeStub('EventSource');
  if (navigator.sendBeacon) {
    var oBeacon = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = function (url, data) { if (classify(url) === 'pass') return oBeacon(url, data); DEMO.blocked.push('beacon ' + url); return true; };
  }

  /* ---- Bandeau « Démo · données simulées » ---- */
  function banner() {
    if (document.getElementById('__demo-badge')) return;
    var b = document.createElement('div');
    b.id = '__demo-badge';
    b.setAttribute('role', 'note');
    b.textContent = 'Démo · données simulées';
    b.style.cssText = 'position:fixed;left:10px;bottom:10px;z-index:2147483000;pointer-events:none;' +
      'font:500 11px/1.2 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;letter-spacing:.02em;' +
      'color:#f4f4f5;background:rgba(39,39,42,.78);padding:5px 9px;border-radius:999px;' +
      'box-shadow:0 1px 4px rgba(0,0,0,.18);opacity:.85';
    document.body.appendChild(b);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', banner); else banner();
})();

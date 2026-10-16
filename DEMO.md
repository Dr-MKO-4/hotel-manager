# Branche `demo` — NERA – gestion d'hôtel

Cette branche contient la **version de démonstration** publiée sur https://mko-hotel.vercel.app.
Toutes les données affichées sont **simulées** ; aucun appel n'est envoyé à un backend réel.

## Ce qui diffère de la branche principale

- `public/demo/mock-api.js`, chargé en premier dans `index.html`, intercepte fetch, XMLHttpRequest, WebSocket, EventSource et sendBeacon, et répond avec des données fictives. Il affiche aussi le bandeau « Démo · données simulées ».
- Les URL `http://localhost:8081` codées en dur passent par `src/config.js` (`REACT_APP_API_URL`, `/api` par défaut), servi par le mock.
- Photo personnelle de l'avatar retirée et remplacée par un SVG neutre ; noms, e-mails, téléphones et images externes remplacés par des valeurs fictives.
- Pas de source maps dans le build (`.env.production` : `GENERATE_SOURCEMAP=false`).

## Construire

```bash
npm ci
npm run build   # sortie : build/
```

Branche de référence du code : `main (dépôt local, sans dépôt distant)`. Cette branche n'est pas destinée à y être fusionnée.

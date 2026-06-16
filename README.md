# 🌱 Palánta — Növénynapló

Egyszerű, modern növénygondozó napló. Kövesd nyomon az **öntözést, tápoldatozást, átültetést, metszést** és sok más gondozási teendőt — növényenként, dátumhoz kötve, grafikonokkal.

**Minden adat kizárólag a saját eszközödön tárolódik** (a böngésző `localStorage`-ában). Nincs szerver, nincs felhő, nincs regisztráció.

---

## ✨ Funkciók

- **Kezdőképernyő** — ma esedékes öntözések, „mind megöntözése" gomb, hamarosan esedékes növények, legutóbbi gondozások.
- **Növények** — kártyás nézet fotóval, állapotjelzővel (lemaradt / ma / hamarosan / rendben), kereséssel és szűréssel.
- **🌿 Növénytár (95+ faj) + okos gondozási tippek** — új növénynél kiválaszthatod a faját (szobanövény, pozsgás, fűszer, zöldség, gyümölcs, virág, páfrány, pálma), és az app automatikusan beállítja a gondozást (fény, öntözés, tápoldat, átültetés), majd személyre szabott útmutatót ad: mit, mivel és mikor csinálj. A **Beállítások → Otthonom és felszerelésem** (szoba, erkély, üvegház, cserép, metszőolló, tápoldat, növénylámpa…) alapján a tippek a te lehetőségeidre szabottak.
- **Növény részletek** — gyors rögzítés 9-féle eseménytípussal (öntözés, tápoldat, átültetés, metszés, permetezés, kártevő, forgatás, levéltisztítás, megfigyelés), gondozási útmutató, teljes napló idővonal és öntözési grafikon. A napló bejegyzéseire koppintva **átírhatod a dátumot** – az app innen számolja a következő öntözést.
- **Naptár** — havi nézet a naplózott eseményekkel (telt pöttyök) ÉS a jövőbeli, előrejelzett teendőkkel (üreges pöttyök). Egy **jövőbeli napra koppintva** kiírja, melyik növényt mikor kell majd öntözni/tápoldatozni.
- **📖 Tudástár** (Beállítások → Tudástár) — kereshető, kategóriánként szűrhető növény-enciklopédia (~300+ faj). A gyakori fajok pontos, a többi típus szerinti gondozási adattal. Bővíthető az `index.html`-ben (`PLANT_DB_EXTRA_INLINE` tömb).
- **Statisztika** — gondozástípusok megoszlása, 12 hetes aktivitás, növényenkénti gondozásszám.
- **Beállítások** — világos / sötét / rendszer téma, **otthonod és felszerelésed** megadása (a tippekhez), adat **exportálás és visszatöltés** (JSON mentés), tárhelyhasználat.
- **🔔 Öntözési emlékeztetők** — értesítés egy nappal az öntözés előtt és aznap is, szerver nélkül (Androidon a háttérben is).
- **PWA** — telepíthető a telefon kezdőképernyőjére, offline is működik.

---

## 🚀 Publikálás GitHub Pages-re

1. Hozz létre egy új repót a GitHubon (pl. `palanta`).
2. Töltsd fel ezeket a fájlokat a repó gyökerébe:
   - `index.html`, `manifest.json`, `sw.js`, `icon.svg`, `_headers`
   - *(A teljes Tudástár-növényadatbázis mostantól az `index.html`-ben van – nincs külön feltöltendő fájl. A korábbi `plantdb.js` már nem szükséges, nyugodtan törölhető.)*
3. A repóban: **Settings → Pages → Build and deployment → Source: „Deploy from a branch"**, ágnak válaszd a `main`-t, mappának a `/ (root)`-ot, majd **Save**.
4. 1–2 perc múlva elérhető lesz itt: `https://<felhasznalonev>.github.io/palanta/`

> A GitHub Pages HTTPS-en szolgálja ki az oldalt, ami a PWA-telepítéshez és az offline működéshez szükséges. ✅

---

## 📲 Telepítés telefonra (Chrome, Android)

1. Nyisd meg a fenti `github.io` címet a telefon **Chrome** böngészőjében.
2. Koppints a jobb felső **⋮** menüre → **„Alkalmazás telepítése"** / **„Hozzáadás a kezdőképernyőhöz"**.
   *(Vagy a Beállítások fülön belül a „Telepítés a kezdőképernyőre" gomb.)*
3. Ezután önálló alkalmazásként indul, böngészősáv nélkül.

> **iPhone (Safari):** Megosztás ikon → „Add to Home Screen".

---

## 🔔 Öntözési emlékeztetők

A **Beállítások → Értesítések → Bekapcsolás** gombbal kapcsolhatod be. Ezután:

- **Egy nappal az öntözés előtt** és **az öntözés napján** is kapsz emlékeztetőt a szomjas növényekről.
- **Androidon** (telepített appként) a háttérben is működik — a böngésző kb. naponta egyszer ellenőriz. ⚠️ A pontos időpontot a böngésző választja (nem fix óra), és csak telepített appnál + nettel megy.
- **Minden eszközön:** amikor megnyitod az appot, rögtön ellenőrzi a mai és holnapi teendőket.
- **iPhone:** háttér-értesítés szerver nélkül nem lehetséges — ott csak az app megnyitásakor szól.

> Mindez **szerver nélkül**, helyben működik (a service worker az ütemezést IndexedDB-ből olvassa). Ha az értesítés „Letiltva", a böngésző címsorában a 🔒 ikonnál engedélyezheted újra.

---

## 💾 Adatok és biztonsági mentés

- Minden adat **ezen az egy eszközön**, a böngészőben tárolódik.
- Ha törlöd az appot, vagy üríted a böngésző adatait, a napló is törlődik.
- Ezért időnként a **Beállítások → Mentés exportálása** gombbal készíts JSON biztonsági mentést. Ugyanitt a **Visszatöltés** gombbal állíthatod vissza (vagy viheted át másik eszközre).

---

## 🛠️ Technikai részletek

- Egyetlen `index.html` fájl — React 18 + Babel CDN-ről, build lépés nélkül.
- Grafikonok: Chart.js.
- Adattárolás: `localStorage` (a fotók tömörített bélyegképként).
- Service worker (`sw.js`) az offline működéshez és gyors betöltéshez.

Helyi futtatáshoz elég bármilyen statikus szerver, pl.:
```bash
python -m http.server 8124
```
majd nyisd meg: `http://localhost:8124`

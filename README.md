# 🌱 Palánta — Növénynapló

Egyszerű, modern növénygondozó napló. Kövesd nyomon az **öntözést, tápoldatozást, átültetést, metszést** és sok más gondozási teendőt — növényenként, dátumhoz kötve, grafikonokkal.

**Minden adat kizárólag a saját eszközödön tárolódik** (a böngésző `localStorage`-ában). Nincs szerver, nincs felhő, nincs regisztráció.

---

## ✨ Funkciók

- **Kezdőképernyő** — ma esedékes öntözések, „mind megöntözése" gomb, hamarosan esedékes növények, legutóbbi gondozások.
- **Növények** — kártyás nézet fotóval, állapotjelzővel (lemaradt / ma / hamarosan / rendben), kereséssel és szűréssel.
- **Növény részletek** — gyors rögzítés 9-féle eseménytípussal (öntözés, tápoldat, átültetés, metszés, permetezés, kártevő, forgatás, levéltisztítás, megfigyelés), teljes napló idővonal és öntözési grafikon.
- **Naptár** — havi nézet az eseményekkel és a következő öntözések jelölésével.
- **Statisztika** — gondozástípusok megoszlása, 12 hetes aktivitás, növényenkénti gondozásszám.
- **Beállítások** — világos / sötét / rendszer téma, adat **exportálás és visszatöltés** (JSON mentés), tárhelyhasználat.
- **PWA** — telepíthető a telefon kezdőképernyőjére, offline is működik.

---

## 🚀 Publikálás GitHub Pages-re

1. Hozz létre egy új repót a GitHubon (pl. `palanta`).
2. Töltsd fel ezeket a fájlokat a repó gyökerébe:
   - `index.html`, `manifest.json`, `sw.js`, `icon.svg`, `_headers`
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

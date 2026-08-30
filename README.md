# 🛒 Budget Cart

A dead-simple shopping budget tracker for your phone. Built for the exact problem
of standing in Costco with a set budget and *not* wanting to do running math in
your head — because that's where the mistakes (like being $100 over) sneak in.

Instead of a calculator that only adds up, this shows **one big number: what you
have left** — and it does the subtracting for you.

**▶️ Live app:** once GitHub Pages is enabled, it's at
`https://sumaia2.github.io/budget-cart/`

## What it does

- **Set a budget** → the top of the screen shows what's **remaining**, not just the total.
- **Type a price → tap Add.** Just like your calculator habit, but it subtracts from your budget.
- The big number goes **green → amber → red** as you get close to / over your limit,
  and your phone buzzes + shows an **Undo** the moment an item pushes you over.
- **📷 Photograph the price tag** and it reads the number off it. You always
  confirm the price before it's added — it never guesses silently.
- **Quantity** (2 × $4.99) and an optional **+Tax** toggle for taxed items.
- **Trip history** — tap *Finish trip & start new* and the shop is saved: date, store,
  spent vs. budget, over/under, and the full item list. Browse or delete past trips
  from ☰ → *Trip history*.
- Every item is in a list you can **delete or Undo** if you grabbed the wrong price.
- **Remembers your cart** if your screen locks or you close the tab — nothing lost.
- Works **offline** once loaded (the photo reader needs data the first time).

## How to use it

Open the live URL above on your phone, then use your browser's
**"Add to Home Screen"** — it opens full-screen like a real app, and the camera
works because it's served over `https`.

You can also just open `index.html` in any browser to try it on a laptop.

## A note on the photo/scan feature

The price reader uses on-device OCR ([Tesseract.js](https://tesseract.projectnaptha.com/)).
Price tags are read well most of the time, but lighting and glare vary — so the
app **always asks you to confirm or fix the number** before adding it. It's an
assist, not autopilot. When in doubt, just type the price; the keypad is right there.

Barcode → price lookup isn't included, because there's no free, reliable price
database that knows *your* store's prices. Reading the printed price off the tag
is the approach that actually works everywhere.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The whole app — UI, budget logic, calculator, camera + OCR. |
| `manifest.json` | Lets it install to your home screen as an app. |
| `sw.js` | Service worker for offline use. |

No build step, no dependencies to install. Everything runs in the browser.
Your budget and cart stay **on your device** (`localStorage`) — nothing is sent anywhere.

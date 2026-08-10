# ETB Storefront — Public Equipment Rental Website

A public website where visitors can browse your equipment (no prices shown) and
submit a rental request. Every request lands directly in your **ETB Office**
app under **Online Orders**, where you can review it and create a Quotation
in one click.

This is a separate, standalone site from your internal ETB Office app — it
shares the same Firebase project (so equipment and requests stay in sync)
but has its own GitHub repo and Netlify deployment, and nobody needs to log
in to use it.

---

## How it connects to your ETB Office app

- **Equipment shown here** = any item in your **Items & Equipment** list
  (inside ETB Office) with **"Show on public website"** turned on. Nothing
  is shown unless you explicitly opt it in — and prices are never shown here.
- **Every request submitted here** appears in ETB Office under the new
  **Online Orders** page, with a **"Create Quotation"** button that opens a
  pre-filled quotation for that client.

## Step 1 — Add equipment to show publicly

In your **ETB Office** app (the billing app), go to **Items & Equipment**,
open an item, tick **"Show on public website"**, and add a short public
description. Do this for each item you want visible here.

## Step 2 — Update your Firestore security rules

Your ETB Office project's `firestore.rules` was updated to allow this site
to (a) read only equipment marked public, and (b) submit new requests —
nothing else. If you haven't already, publish the updated
`firestore.rules` from the ETB Office project to Firebase Console the same
way you did before (Firestore Database -> Rules -> paste -> Publish).

## Step 3 — Install and run locally

```bash
npm install
```

Copy `.env.example` to `.env` — the values are the **same Firebase project**
as your ETB Office app, since this site reads from the same database. You
can copy them straight from that project's `.env` file.

```bash
npm run dev
```

## Step 4 — Deploy to Netlify (free, separate site from ETB Office)

1. Push this folder to its **own** new GitHub repository (e.g. `etb-storefront`)
   the same way you did for ETB Office (`git init`, `git add .`, `git commit`,
   `git remote add origin ...`, `git push`).
2. Go to Netlify -> **Add new site -> Import an existing project** -> pick this
   new repo.
3. Add the same six `VITE_FIREBASE_...` environment variables as your `.env`.
4. Deploy. You'll get a free address like `https://etb-storefront.netlify.app`
   — you can rename it, or connect a real domain later (e.g.
   `rent.equipmenttechbd.com`), still free.

## Notes

- No prices are ever shown on this site — by design, per your earlier request.
- No login exists on this site — anyone can view equipment and submit a
  request, but nobody can see other people's requests or edit anything.
  That's enforced by the Firestore rules, not just hidden in the UI.
- If you want to change the wording, colors, or add more sections (About Us,
  testimonials, etc.), just ask — this is a normal React site like ETB Office.

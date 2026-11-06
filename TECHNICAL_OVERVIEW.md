# Database and Backend Configuration

**Project:** Ella in Amsterdam (author site for the Ella in Amsterdam thriller series)
**Publisher:** Cachette Group LLC
**Published app:** https://ellainamsterdam.base44.app
**Custom domain:** https://ellainamsterdam.com
**Last reviewed:** 2026-11-06

This document describes the app's stored data, server-side functions, integrations, and the
configuration a reviewer needs in order to take the project over. It reflects the code in this
repository at the date above.

No secrets, API keys, or credential values appear in this document. Where a function depends on
a configured value, this document says where that value lives instead of reproducing it.

---

## 1. At a glance

| Area | Configuration |
| --- | --- |
| Frontend | React 18 + Vite 6, React Router 6, Tailwind CSS 3, shadcn/ui components |
| Backend | Base44 platform (entities + serverless functions) |
| Authentication | Base44 platform identity; app is public (`requiresAuth: false`) |
| Entities (tables) | 2 — `ContactInquiry`, `User` |
| Backend functions | 2 — `sendContactInquiry`, `subscribeNewsletter` |
| Platform integrations | Base44 Core `SendEmail` |
| External services | Mailchimp (newsletter list), Square (payments linked out), Amazon Kindle (retail links) |
| App connectors / OAuth | None configured |
| Workflows / automations | None configured |
| Email templates (`base44/emails/`) | None; emails are composed as plain text inside the function |
| Custom environment variables | None set by this app (see §7) |

The site is a marketing site: there is no user account area, no logged-in data, and no
database-backed content. The book catalog is a **static data file**, not an entity (§4).

---

## 2. Repository layout

```
base44/
  config.jsonc                 build/serve configuration
  entities/
    ContactInquiry.jsonc       contact form submissions
    User.jsonc                 app user role definition
  functions/
    sendContactInquiry/entry.ts
    subscribeNewsletter/entry.ts
src/
  pages/                       Home, Contact, auth pages
  components/                  presentation and 3D book components
  data/books.js                book catalog (static content source)
  api/base44Client.js          Base44 SDK client
  lib/                         auth context, app params, helpers
```

---

## 3. Database

Base44 entities are JSON-schema-defined collections. Every record also carries the platform's
built-in fields, which are **not** declared in the schema files:

`id`, `created_date`, `updated_date`, `created_by_id`

### 3.1 `ContactInquiry` — `base44/entities/ContactInquiry.jsonc`

Stores every message submitted from the public contact form at `/contact`. One record per
submission, written server-side by `sendContactInquiry`.

| Field | Type | Notes |
| --- | --- | --- |
| `name` | string | Required. Trimmed, max 120 chars (enforced in the function) |
| `email` | string | Required. Trimmed, max 200 chars, format-validated in the function |
| `subject` | string | Optional. Trimmed, max 200 chars |
| `message` | string | Required. Trimmed, max 4000 chars |
| `emailed` | boolean | Default `false`. Set to `true` only after `SendEmail` succeeds, so records where delivery failed are identifiable |
| `created_by_id` | string (built-in) | Note: for public submissions this is the service-role writer, not the visitor. The visitor's identity is in `email` |

Written with: `base44.asServiceRole.entities.ContactInquiry.create(...)`.
Updated with: `base44.asServiceRole.entities.ContactInquiry.update(id, { emailed: true })`.

**Access rules:** no custom row-level security block is declared on this entity, so access
follows platform defaults. Records are never read by the frontend — there is currently no admin
or moderator screen for inquiries. They are viewed in the Base44 dashboard data browser, and can
be exported from there.

### 3.2 `User` — `base44/entities/User.jsonc`

The platform's built-in user collection, customized here only to declare the `role` field.

| Field | Type | Notes |
| --- | --- | --- |
| `role` | string, enum `admin` \| `user` | Required. Platform default role handling |

Built-in user fields available on every app: `id`, `created_date`, `full_name`, `email`, `role`.
User records cannot be created or imported directly; users are added through platform invites.

Because the public site has no account features, this collection is effectively unused by the
site itself. It exists so that owner/admin access and platform invites work normally.

---

## 4. The book catalog is static, not in the database

All book content (titles, taglines, story copy, cover images, release dates, per-book accent
colors, chapter lists, and purchase links) lives in a single module:

`src/data/books.js`

Three entries: `outside-money` (released), `capital-call` (pre-order), `heavy-carry`
(pre-order). Each entry carries `squareUrl` and `kindleUrl` purchase links.

**Implication for a maintainer:** changing a release date, cover, blurb, or buy link is a code
change in that one file, not a data edit. Nothing about books is stored server-side, and there is
no CMS. The footer, vault section, featured book, dossier panel, and 3D book components all read
from this module.

---

## 5. Backend functions

Both are HTTP handlers on the Base44 runtime (`entry.ts`, ES module default export taking a
`Request` and returning a `Response`). Both are invoked from the frontend through the Base44 SDK
(`base44.functions.invoke(...)`), not by absolute URL.

Invocation endpoints follow the platform pattern
`https://ellainamsterdam.base44.app/functions/<functionName>` if one is ever needed outside the
app.

### 5.1 `sendContactInquiry`

**File:** `base44/functions/sendContactInquiry/entry.ts`
**Called from:** `src/pages/Contact.jsx`
**Purpose:** persist a contact-form message, then email a copy to the series inbox.

Request body: `{ name, email, subject, message }`

Behaviour, in order:

1. Parse body; coerce each field to string, trim, and truncate
   (120 / 200 / 200 / 4000 chars).
2. Validate: `name`, `email`, `message` all present, and `email` matches a basic
   address pattern. Failures return HTTP 400 with `{ error }`.
3. Create the `ContactInquiry` record with `emailed: false`.
4. Send the message with Core `SendEmail` to the series inbox address held in the `RECIPIENT`
   constant at the top of the file, with `from_name` built from the app name. Subject line is
   `Inquiry: <subject>` when a subject was supplied, otherwise `Inquiry from <name>`.
5. On successful send, update the record to `emailed: true` and return `{ ok: true, emailed: true }`.
6. If the send throws, the failure is logged and the function still returns
   `{ ok: true, emailed: false }`. **The submission is not lost** — it is stored with
   `emailed: false`.

Response shape: `{ ok: boolean, emailed: boolean }` on success; `{ error: string }` with 400 or
500 otherwise.

Notes for a maintainer:

- The recipient address is a single constant near the top of the file. Changing where inquiries
  go is a one-line code change in that file, plus the matching `CONTACT_EMAIL` constant in
  `src/pages/Contact.jsx` (used for the visible address and the `mailto:` fallback link on the page).
- The recipient is a **non-registered** email address, so delivery depends on the platform-side
  prerequisite described in §8. The page's inline error message only appears when the function
  itself fails; a stored-but-unsent submission still shows the success state to the visitor.
- No spam protection (captcha, honeypot, rate limit) is implemented. The function is publicly
  callable.

### 5.2 `subscribeNewsletter`

**File:** `base44/functions/subscribeNewsletter/entry.ts`
**Called from:** `src/components/NewsletterSection.jsx`
**Purpose:** enrol an address in the Mailchimp audience without redirecting the visitor off-site.

Request body: `{ email }`

Configuration constants at the top of the file: Mailchimp host, list `u` value, list `id` value.
These identify the existing Mailchimp audience/list and are not API credentials.

Behaviour:

1. Validate the address with a basic pattern; return HTTP 400 with
   `{ ok: false, error }` on failure.
2. POST a form-encoded subscribe request to Mailchimp's hosted
   `subscribe/post` endpoint, with browser-like `User-Agent`, `Referer`, `Origin`, and
   `Accept` headers, and a 15-second timeout. This uses the public hosted-form flow, not the
   Mailchimp Marketing API, so **no Mailchimp API key is stored anywhere**.
3. Convert the HTML response to text and classify it:
   - thank-you / confirmed wording → `{ ok: true }`
   - already subscribed → `{ ok: true, alreadySubscribed: true }`
   - invalid / fake address wording → `{ ok: false, error }`
   - anything else → logs the first 300 chars and returns a generic
     `{ ok: false, error }` (signup unavailable)

Notes for a maintainer:

- Classification is **text matching against Mailchimp's rendered HTML**. Mailchimp can change
  that markup or wording without notice, in which case signups keep working but the app reports
  a generic failure. If that happens, inspect the logs (`console.log` line) and update the
  patterns. This is the most fragile part of the backend.
- A successful double opt-in still requires the visitor to confirm by email; the site reports
  "You are enrolled. Watch your inbox."
- No subscription record is stored in this app's database; Mailchimp is the system of record.
- No rate limiting is implemented.

---

## 6. Integrations and external services

| Service | How it is used | Credentials |
| --- | --- | --- |
| Base44 Core `SendEmail` | Delivers contact-form copies to the series inbox; called with `asServiceRole` from inside the function | Platform-managed; no key in the repo |
| Mailchimp | Newsletter audience, via the public hosted subscribe endpoint | None stored (list identifiers only) |
| Square | Per-book purchase links, opened in a new tab | Link-only; no API, no webhook, no payment processing in this app |
| Amazon Kindle | Per-book retail links, opened in a new tab | Link-only |
| Image hosting | Cover art and logo served from platform image storage (`media.base44.com`) | None |

There are **no** app connectors, OAuth authorizations, webhooks, or payment integrations
configured. Nothing in this project holds a third-party API key or secret.

---

## 7. Environment, build, and deployment

**Build config:** `base44/config.jsonc`

```
installCommand : npm install
buildCommand   : npm run build
serveCommand   : npm run dev
outputDirectory: ./dist
```

**Local development:** `npm install`, then `base44 dev` (Base44 CLI, which runs the local backend
and the frontend dev server), or `npm run dev` for frontend-only work against the hosted backend.

**Environment variables:** the frontend reads `VITE_BASE44_APP_ID`,
`VITE_BASE44_FUNCTIONS_VERSION`, and `VITE_BASE44_APP_BASE_URL` through
`src/lib/app-params.js`, which supplies platform defaults. These are injected by the platform;
no app-specific values are committed to the repository in this file. There are no
user-defined secrets configured for the backend functions.

**Client configuration:** `src/api/base44Client.js` creates the SDK client with
`requiresAuth: false`, which is what makes the marketing site publicly readable.

**Routing:** `src/App.jsx` defines `/` (Home), `/contact` (Contact), and a catch-all 404 page, plus
the platform-provided auth routes (`/login`, `/register`, `/forgot-password`,
`/reset-password`, `/mfa`). No route is hidden behind authentication.

**Version control / deployment:** the project is published from the Base44 builder and can be
connected to GitHub for two-way sync (Workspace settings, GitHub). Publishing is done with the
Publish button in the builder; there is no separate CI pipeline or hosting account.

**Domain:** the app answers on both its `base44.app` subdomain and the `ellainamsterdam.com`
custom domain. Domain and DNS records are managed in the Base44 dashboard, not in this repo.

---

## 8. Known dependencies and open items

1. **Email delivery to a non-registered recipient.** `sendContactInquiry` sends to an address
   that is not an app user. That requires the workspace to be on a paid plan with the custom
   domain connected and verified for email. When that prerequisite is not met, submissions are
   still stored (`emailed: false`) but no email is delivered and no error surfaces to the
   visitor. Anyone taking over should verify the domain and email-domain setup and check a
   recent record's `emailed` flag.
2. **No admin UI for inquiries.** Messages are only visible in the dashboard data browser or an
   export. Nothing in the site lists them.
3. **Newsletter depends on Mailchimp HTML.** See §5.2.
4. **No automated tests.** Neither function has unit or integration tests; both are exercised
   manually through the site and with the platform's function tester.
5. **No spam protection or rate limiting** on either public function.
6. **Contact inbox address appears in two places** (function constant and the Contact page
   constant). Both must be changed together.

---

## 9. Verifying the current state

| Check | How |
| --- | --- |
| Contact form end-to-end | Submit at `/contact`; confirm a new record in `ContactInquiry` and that its `emailed` flag matches whether a copy arrived in the inbox |
| Newsletter end-to-end | Submit an address in the footer/newsletter section; confirm `{ ok: true }` in the network response and the address in the Mailchimp audience |
| Function behaviour in isolation | Base44 dashboard function tester for `sendContactInquiry` and `subscribeNewsletter` |
| Recent runtime errors | Base44 dashboard logs explorer |
| Stored data | Base44 dashboard data browser for `ContactInquiry` |
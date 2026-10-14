# Security

## Secrets
- `.env` (git-ignored) holds `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. Vercel stores its own copy in project environment
  variables. Since 2026-10-12 the key belongs to vaibhav.jain.careers@gmail.com, so form messages arrive there.
- The Web3Forms key is shipped to the browser by design; it only allows sending form messages to its inbox.
- Never print, log or commit `.env` values.

## Auth
None: the site is public and read-only. No accounts, no admin pages.

## Personal and sensitive data
- Public on purpose: name, job email, LinkedIn, GitHub, city, notice period, open-to locations, and the CV PDF
  (which includes the phone number).
- Never public: salary, current CTC, sponsorship details, anything marked `public: false` or `confidential` in
  `career/master_profile.yaml`, employer client/clinic names, codenames, internal repo names, Jira keys, PHI.

## Network and third parties
| Service | Gets |
|---|---|
| Vercel | Hosts the site; sees visitor requests |
| Google Drive (`lh3.googleusercontent.com`) | Photo fetch from the server, at most once a day |
| Web3Forms | Name, email and message a visitor submits |
| Vercel Web Analytics | Anonymous page views: page, referrer, country, device. No cookies, no personal data |
| Google Fonts (via `next/font`, self-hosted at build) | Nothing at runtime |

## Threats and mitigations
- Form spam: hidden `botcheck` honeypot; Web3Forms' own filtering.
- Open relay: removed (`/api/contact` forwarded arbitrary JSON).
- XSS: no `dangerouslySetInnerHTML`; all content is static strings rendered by React.

## Hard rules
- Never push or deploy without Vaibhav's OK.
- Never add a fact that isn't in the master profile.

## Leaked key
Log in to web3forms.com, create a new access key, update `.env` and the Vercel environment variable, redeploy,
delete the old key.

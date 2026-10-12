# Six Observations:
1) Element: Section headings with uneven styling (e.g. gradient on “Everything you need to succeed online”, plain on other headings)
Consequence: Visual hierarchy feels inconsistent, so the page can read as template-like / unevenly designed instead of one clear brand system.

2) Element: “Trusted by brands” name list (TECHi.com, etc.) without clickable links
Consequence: Social proof is weaker users cannot verify the brands quickly, so trust is harder to earn than with real outbound links.

3) Element: Body paragraphs under section headings (heavy use of dash-style phrasing / generic marketing tone)
Consequence: Copy can feel mass-produced; users may skim past instead of trusting the details.

4) Element: Plan comparison tables on hosting/pricing (widths / alignment not matching between tables)
Consequence: Side-by-side comparison is harder; the eye has to re-adjust, which slows decision-making.

5) Element: Long pricing page layout (pkhosting.com/pricing style — many plan blocks stacked)
Consequence: Reaching a specific price table needs a lot of scrolling; an in-page jump nav / sticky section list would reduce friction.

6) Element: Multi-line, sentence-style section titles (first letter capital, rest like a paragraph; sometimes 2–3 lines)
Consequence: Headings don’t scan like clear section labels, so users take longer to find the block they care about.

Overall the site still feels responsive and professional despite these polish issues.



# State persistence:
I used: localStorage for billing + currency
Why: 
    The brief said currency and billing period must survive a reload.
    localStorage works offline, needs no server/login/cookies, and is simple
    for a static page.
Cost / limit: 
    It is per-browser only (not synced across devices).
    Private / strict mode may block storage then toggles still work
    for that session, but reload may reset. I did not put state in the URL.



# Dropped payment methods:
PKHosting publicly lists several pay options (cards via Stripe, PayPal,
JazzCash, EasyPaisa, bank transfer, plus slower offline options in older
payment copy).

# Kept (6): 
JazzCash, EasyPaisa, bank transfer, Visa, Mastercard, PayPal

# Cut (2):
| Cut | Why |
| --- | --- |
| Office cash deposit | VPS is provisioned remotely; asking a buyer to visit an office adds friction and delay for a virtual server. |
| Cheque / money order | Slow clearing and hard to match to an invoice quickly; bad fit for on-demand VPS activation. |

No payment logos (no hotlinks) text only, so the page stays offline-safe
and under the no-external-requests rule.
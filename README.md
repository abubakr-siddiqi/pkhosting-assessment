# PKHosting VPS Hosting assessment:
Static offline pricing page for an invented PKHosting VPS line.
TechAbout Web Developer assessment.

# How to open:
1. Open the `pkhosting-vps` folder.
2. Double-click `index.html` (or Open with Live Server).
3. No build step. No API keys. Works offline after download.

# What is included:
`index.html` — page structure, monthly PKR in source, table, FAQ, footer
`css/styles.css` — layout and responsive styles
`js/pricing.js` — billing period, currency, localStorage, announcements
`NOTES.md` — live site observations and trade-offs
`screenshots/` — (Step 11) 360 / 768 / 1440
`lighthouse/` — (Step 11) report

# Pricing rules:
- Monthly PKR: Starter 2400, Growth 4800, Scale 9600, Dedicated Core 19500
- Annual: charge 10 months for 12 → shown per-month = (monthly × 10) / 12
- Growth annual per-month = Rs 4000
- Rates: 1 USD = 278.50 PKR, 1 GBP = 355.00 PKR
- PKR whole numbers; USD/GBP two decimals
- Billing + currency restored from localStorage after reload

# Browsers tested:
- Chrome: yes
- Firefox: yes
- Widths checked: 360, 768, 1440
- Keyboard Tab + visible focus: yes
- JS disabled still shows monthly PKR + table: yes
- Offline / no external requests: yes
- Zoom 200%: yes

# AI assistant disclosure:
Yes. I used AI for guidance, research help for NOTES, and suggestions for
styling. I implemented everything myself in VS Code, tested in the
browser, and can explain my decisions on a call.


# Time taken:
About 4:30 hours.
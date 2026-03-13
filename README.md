<p align="center">
  <img src="https://webmatik.ai/logo.png" alt="Webmatik" width="200" />
</p>

<h1 align="center">Webmatik — AI Website Audit</h1>

<p align="center">
  <strong>Chrome extension that audits any website with AI in one click.</strong><br/>
  Get a Growth Score, actionable insights, and a full report — right from your browser.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/manifest-v3-blue?logo=googlechrome&logoColor=white" alt="Manifest V3" />
  <img src="https://img.shields.io/badge/version-1.0.0-7c3aed" alt="Version 1.0.0" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License" />
  <a href="https://webmatik.ai"><img src="https://img.shields.io/badge/webmatik.ai-visit-818cf8?logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNiIvPjwvc3ZnPg==" alt="webmatik.ai" /></a>
</p>

---

## ✨ Features

- **One-click audits** — click the extension icon on any website to start an AI-powered audit
- **Growth Score** — see your 0–100 score and grade (Poor / Fair / Good / Great / Excellent) instantly in the popup
- **50+ signals across 7 categories** — Performance, SEO, AI Search (GEO), UI/UX, Conversion, Retention, Accessibility
- **Full report link** — jump straight to the detailed report on [webmatik.ai](https://webmatik.ai)
- **Dark themed popup** — clean, minimal UI matching the Webmatik brand
- **Secure connection** — one-time account linking via webmatik.ai; API key stored locally in your browser

## 🖥️ Screenshots

| Connect | Ready | Result |
|---------|-------|--------|
| Link your Webmatik account | See the current tab URL, hit Run Audit | Growth Score + grade with a link to the full report |

## 🔧 How It Works

1. **Install** the extension from the Chrome Web Store (or load it unpacked — see below).
2. **Connect your account** — click the extension icon and press *Connect to Webmatik*. You'll be taken to `webmatik.ai/connect` to authorize. This is a one-time step.
3. **Navigate** to any website you want to audit.
4. **Click the extension icon** and press *Run Audit*.
5. The extension sends the URL to the Webmatik API, which runs the full analysis (typically 2–3 minutes).
6. When it's done, you'll see the **Growth Score** and **grade** right in the popup, along with a link to the **full report** on webmatik.ai.

## 📦 Project Structure

```
webmatik-chrome/
├── manifest.json      # Manifest V3 configuration
├── background.js      # Service worker — stores API key from connect flow
├── content.js         # Content script — captures API key on webmatik.ai/connect
├── popup.html         # Extension popup markup
├── popup.css          # Dark-themed popup styles
├── popup.js           # Popup logic — audit lifecycle, polling, UI states
├── icons/             # Extension icons (16, 48, 128)
└── promo/             # Chrome Web Store promotional tiles
```

## 🛠️ Local Development

### Prerequisites

- Google Chrome (or any Chromium-based browser)
- A [Webmatik](https://webmatik.ai) account

### Loading Unpacked

1. Clone the repository:
   ```bash
   git clone https://github.com/belovdigital/webmatik-chrome.git
   ```
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the `webmatik-chrome` directory.
5. The Webmatik icon will appear in your toolbar — click it to get started.

### Making Changes

The extension is plain HTML/CSS/JS with no build step. Edit any file, then go to `chrome://extensions` and click the **reload** button (🔄) on the Webmatik card to pick up changes.

## 🏗️ Building for Chrome Web Store

1. Make sure `manifest.json` has the correct `version` number.
2. Create a ZIP archive of the extension files (exclude `.git`, `promo/`, and this README):
   ```bash
   zip -r webmatik-chrome.zip . \
     -x ".git/*" \
     -x "promo/*" \
     -x "README.md" \
     -x ".DS_Store"
   ```
3. Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
4. Upload the ZIP as a new version.
5. Upload promotional images from the `promo/` directory (small tile 440×280, marquee 1400×560).

## 🔒 Privacy

Webmatik takes privacy seriously:

- **Only the page URL** is sent to the Webmatik API when you run an audit. No browsing history, page content, or personal data is collected.
- **Your API key** is stored locally in `chrome.storage.local` and never leaves your browser except as an auth header to `webmatik.ai`.
- **No tracking or analytics** — the extension makes zero third-party requests.
- **Minimal permissions** — `activeTab` (to read the current tab URL) and `storage` (to persist your API key). Host permission is scoped to `https://webmatik.ai/*` only.
- The extension's content script runs **only** on the `webmatik.ai/connect` page during account linking.

## 💰 Pricing

| Plan | Audits | Price |
|------|--------|-------|
| Free | 3 / month | $0 |
| Starter | 10+ / month | [See plans](https://webmatik.ai/#pricing) |
| Growth | Unlimited | [See plans](https://webmatik.ai/#pricing) |

## 🔗 Related

- **[webmatik.ai](https://webmatik.ai)** — full web app with detailed reports, action plans, and dashboards
- **WordPress Plugin** — run audits directly from your WordPress admin panel (coming soon)

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Built with 💜 by <a href="https://webmatik.ai">Webmatik</a>
</p>

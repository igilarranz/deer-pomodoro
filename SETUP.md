# Pomo-01 — Mac desktop app

Turns the single HTML file into a real `.app` you can keep in the Dock.

## Run it

You need Node.js. Check with `node -v`; if that errors, install it from
nodejs.org or with `brew install node`.

```bash
cd pomo-desktop
npm install        # ~2 min the first time, downloads Electron
npm start
```

The app opens in its own window. `Cmd-Q` quits, `Cmd-W` closes.

## Build a real .app

```bash
npm run build
```

Output lands in `dist/`:

- `dist/mac-arm64/Pomo-01.app` — drag this to `/Applications`
- `dist/Pomo-01-1.0.0.dmg` — an installer, if you want one

Built on Apple Silicon by default. On an Intel Mac, change `"arch": ["arm64"]`
to `"arch": ["x64"]` in `package.json`.

### Gatekeeper

The app is unsigned, so macOS may refuse to open it the first time. Either
right-click the app and choose Open (then Open again in the dialog), or run:

```bash
xattr -cr /Applications/Pomo-01.app
```

Signing requires a paid Apple Developer account and is unnecessary for
personal use.

### App icon (optional)

`package.json` points at `icon.icns`, which doesn't exist yet — the build
falls back to the default Electron icon. To make your own:

1. Export a 1024x1024 PNG (the standing deer on the twilight background
   scales up cleanly since it's pixel art — use nearest-neighbour).
2. Convert it:

```bash
mkdir icon.iconset
sips -z 16 16     icon.png --out icon.iconset/icon_16x16.png
sips -z 32 32     icon.png --out icon.iconset/icon_16x16@2x.png
sips -z 32 32     icon.png --out icon.iconset/icon_32x32.png
sips -z 64 64     icon.png --out icon.iconset/icon_32x32@2x.png
sips -z 128 128   icon.png --out icon.iconset/icon_128x128.png
sips -z 256 256   icon.png --out icon.iconset/icon_128x128@2x.png
sips -z 256 256   icon.png --out icon.iconset/icon_256x256.png
sips -z 512 512   icon.png --out icon.iconset/icon_256x256@2x.png
sips -z 512 512   icon.png --out icon.iconset/icon_512x512.png
sips -z 1024 1024 icon.png --out icon.iconset/icon_512x512@2x.png
iconutil -c icns icon.iconset
```

That produces `icon.icns` next to `package.json`.

## Editing

`pomo-01.html` is still a plain file — edit it and restart the app to see
changes. Nothing is compiled or bundled.

## Size note

Electron ships a whole browser, so the built app is roughly 200 MB. If that
bothers you, the Chrome "Install page as app" route costs nothing extra, and
Tauri produces apps a few MB in size but requires Rust.

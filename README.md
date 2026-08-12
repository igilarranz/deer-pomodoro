# Pomo-01

A pomodoro timer styled as a pixel-art handheld device — rendered on a true **128×160 pixel canvas**, the same resolution as an ST7735 TFT display. Built as a UI prototyping exercise for embedded display work: everything on screen is drawn pixel-by-pixel, with no web fonts and no anti-aliasing.

![demo](docs/demo.gif)

## Why 128×160?

I work with ST7735 displays on embedded projects (see my [ESP32 MP3 player]). Constraining the UI to real hardware resolution forces the same design decisions you face on a microcontroller: hand-set bitmap fonts, sprite budgets, and layouts that survive at 28×28px. The frame refreshes at ~11 fps on purpose, to feel like a budget LCD.

## Features

- **Hand-built bitmap font system** — 3×5 glyphs for labels, 5×7 for timer digits, every pixel set by hand
- **4-frame sprite animation** — a deer mascot with a full gallop cycle while you focus, and a couched sleep pose during breaks
- **Moonrise progress indicator** — the moon climbs across the sky as the session runs
- **Parallax scrolling scenery** behind the mascot
- **Twilight dark palette** tuned so the warm sprite colors read cleanly against the screen
- Focus lengths of 15 / 25 / 50 minutes, four tracked rounds with a long break after the set
- 8-bit chime with a speaker-grille mute toggle
- Tab title counts down when the window is in the background

## Controls

| Key | Action |
|-----|--------|
| `A` / `Space` | Start / pause |
| `B` / `R` | Reset |

The on-device A/B buttons are clickable too.

## Run it

It's a single HTML file — open `pomo-01.html` in any browser. That's it.

### As a Mac desktop app (Electron)

```bash
npm install
npm start        # run windowed
npm run build    # build the .app bundle + dmg
```

The Electron wrapper uses a fixed window sized to the device art with a hiddenInset title bar. Full build details (Gatekeeper, custom icon, Intel vs Apple Silicon) are in [SETUP.md](SETUP.md).

## How the sprite was made

The mascot frames were extracted from a reference sprite sheet by resampling onto a 14px grid (median color per cell) and k-means clustering to a 4-color palette. Two frames came straight from the source; three more gallop poses and the sleep pose were constructed programmatically to complete the animation cycle.

<!-- TODO: credit the original sprite artist here -->

## Stack

Vanilla HTML/CSS/JS, one file, no dependencies. Electron only for desktop packaging. Sprite extraction pipeline: Python + PIL.

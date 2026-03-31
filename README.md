# KABI.PORTFOLIO // BOOT_SEQUENCE

```txt
██╗  ██╗ █████╗ ██████╗ ██╗
██║ ██╔╝██╔══██╗██╔══██╗██║
█████╔╝ ███████║██████╔╝██║
██╔═██╗ ██╔══██║██╔══██╗██║
██║  ██╗██║  ██║██████╔╝██║
╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝

██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗
██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝

> INITIALIZING KABI.PORTFOLIO...
> LOADING MODULES: AI_ENGINE, FULL_STACK, NEO_BRUTAL_UI
> STATUS: ONLINE
```

Professional AI Engineer and Full Stack Developer building intelligent, scalable products with clean design and real world impact.

## LIVE

- **Website**: https://kabi-dev.vercel.app/
- **Theme**: Neo Brutalist
- **Status**: Production Ready

## ABOUT THIS PORTFOLIO

This is a high contrast, motion rich portfolio focused on:

- AI and ML product engineering
- Full stack development
- Bold visual identity with practical UX
- Real project and hackathon credibility

No unnecessary frameworks for core pages. Just fast delivery, clean structure, and expressive design.

## PAGES

- **index.html** — Public portfolio, live reports marquee, achievements conveyors, skills motion rows, contact CTA.
- **admin.html** — Mission Control for live reports (Firestore-backed): approve/revoke, seed helpers, live marquee preview.

## LIVE DATA + MARQUEES

- Live reports pull from Firestore `reports` where `status == "approved"`.
- Marquees repeat segments to allow seamless drag/loop; horizontal wheel and touchpad supported; pauses on hover.
- Admin page mirrors the live feed loop with slower auto-scroll for review comfort.

## INTERACTION NOTES

- Drag horizontally (mouse/touchpad) on live feed to scrub; auto-scroll resumes after a short idle.
- Wheel gestures prefer horizontal delta on touchpads; vertical wheels still work.
- Hover pauses animations to reduce motion while reading.

## TECH MAP

| Layer | Stack |
| :--- | :--- |
| Frontend | HTML5, TailwindCSS, Vanilla JavaScript |
| Styling | Neo Brutalist layout system, custom animation utilities |
| Data Widgets | GitHub API integrations |
| Icons and Fonts | Remix Icons, Space Grotesk, JetBrains Mono |

## PERFORMANCE & ACCESSIBILITY

- Minimal JS for marquee math; heavy assets preloaded only where needed.
- Images compressed; social previews via `og:image`.
- High-contrast palette; hover-pause on motion; keyboard focus inherits browser defaults.

## DEPLOYMENT NOTES

- Static hosting ready (Vercel/Netlify/S3). No build step required.
- Firestore requires valid config in `index.html`/`admin.html` and rules allowing approved read + admin write.
- Favicon/logo: `Assets/images/title_icon.png` referenced by both public and admin pages.

## HIGHLIGHTS

- Dynamic skills conveyor with multi row motion
- Interactive achievements feed with smooth manual control
- Reports and testimonial flow with clean intake UX
- Optimized metadata for SEO and social sharing

## PROJECT STRUCTURE

```bash
.
├── Assets/
│   ├── images/
│   │   ├── Achievements/
│   │   └── title_icon.png
│   └── Resume/
├── index.html          # public portfolio
├── admin.html          # mission-control (live reports admin)
└── README.md
```

## RUN LOCALLY

This is a static portfolio. Open `index.html` directly in your browser.

## CONTACT

- **Name**: Kabilesh C
- **Email**: kabileshc.dev@gmail.com
- **GitHub**: https://github.com/kabilesh-c
- **Location**: Remote / Earth

---
**© 2026 KABI.PORTFOLIO // SYSTEM_END**

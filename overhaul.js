const fs = require('fs');
let c = fs.readFileSync('admin-sample4.html', 'utf8');

// 1. New headers mapping
// Main top nav
c = c.replace(
  /<div class="nav-title">[\s\S]*?<h2>ADMIN PORTAL<\/h2>[\s\S]*?<p>Access Level: OMNIPOTENT \/\/ SYS_STATUS: ONLINE<\/p>[\s\S]*?<\/div>/,
  `<div class="nav-title">
            <h2>MISSION CONTROL</h2>
            <p>Live Feed :: Pending 'Let's Talk Code' Submissions</p>
          </div>`
);

// If there's no top-nav wrapping it, add one
if (!c.includes('<div class="top-nav">')) {
  c = c.replace(
    /<div class="nav-title">[\s\S]*?<h2>MISSION CONTROL<\/h2>[\s\S]*?<p>Live Feed :: Pending 'Let's Talk Code' Submissions<\/p>[\s\S]*?<\/div>[\s\S]*?<button class="btn-logout" id="btn-logout-dashboard">DISCONNECT<\/button>/,
    `<div class="section-top-nav" style="border-radius: 12px; margin-bottom: 60px;">
          <div class="nav-title">
            <h2 style="color: var(--accent-yellow);">MISSION CONTROL</h2>
            <p style="text-transform:none;">Live Feed :: Pending Let's Talk Code Submissions</p>
          </div>
          <button class="btn-logout" id="btn-logout-dashboard">TERMINATE_SESSION</button>
        </div>`
  );
}

// 2. Pending Header
c = c.replace(
  /<div class="terminal-header-box" style="box-shadow: 4px 4px 0 var\(--accent-yellow\);">[\s\S]*?<h2>PENDING_REPORT_LOGS.txt<\/h2>[\s\S]*?<\/div>/,
  `<div class="section-top-nav" style="box-shadow: 6px 6px 0 var(--accent-yellow);">
          <div class="nav-title">
            <h2 style="color: var(--accent-yellow);">PENDING LOGS</h2>
            <p style="text-transform:none;">Awaiting Admin Approval :: Action Required</p>
          </div>
        </div>`
);

// 3. Live Header
c = c.replace(
  /<div class="live-header">[\s\S]*?<div class="terminal-header-box"[\s\S]*?<h2>USER_REPORTS.txt<\/h2>[\s\S]*?<\/div>\s*<\/div>/,
  `<div class="live-header" style="max-width: 1400px; margin: 0 auto; padding: 0;">
          <div class="section-top-nav" style="box-shadow: 6px 6px 0 var(--accent-green);">
            <div class="nav-title">
              <h2 style="color: var(--accent-green);">LIVE REPORTS</h2>
              <p style="text-transform:none;">Currently Streamed to the Portfolio Front-End</p>
            </div>
          </div>
        </div>`
);

// 4. Dictionary Header
c = c.replace(
  /<div class="terminal-header-box">[\s\S]*?<h2>GLOBAL_DICTIONARY.txt<\/h2>[\s\S]*?<\/div>/,
  `<div class="section-top-nav" style="box-shadow: 6px 6px 0 var(--accent-blue);">
          <div class="nav-title">
            <h2 style="color: var(--accent-blue);">GLOBAL DICTIONARY</h2>
            <p style="text-transform:none;">Complete Archive :: Database Records</p>
          </div>
        </div>`
);

// 5. CSS overrides for layout and cards
const additionalCSS = `
    .section-top-nav {
      background: var(--card-bg);
      color: #fff;
      border: 4px solid var(--border-dark);
      border-radius: 12px;
      padding: 24px 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    .section-top-nav .nav-title h2 {
      margin: 0;
      font-size: 2.2rem;
      text-transform: uppercase;
      letter-spacing: -0.5px;
    }
    .section-top-nav .nav-title p {
      margin: 4px 0 0 0;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      color: #aaa;
    }
    .live-section {
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      background: var(--text-dark);
      padding: 60px 0;
      position: relative;
      border-top: 4px solid var(--border-dark);
      border-bottom: 4px solid var(--border-dark);
    }
    .live-marquee-wrapper {
      overflow-x: auto;
      white-space: nowrap;
      padding: 40px 20px;
      cursor: grab;
      scrollbar-width: none; /* Firefox */
      scroll-behavior: smooth;
    }
    .live-marquee-wrapper::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
    .live-marquee-wrapper:active {
      cursor: grabbing;
    }
    .live-marquee-container {
      display: inline-flex;
      gap: 32px;
      padding: 0 16px;
    }

    .live-index-card {
      /* increase bottom padding to leave space for button drawer */
      padding-bottom: 80px; 
    }
    .revoke-btn-wrapper {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 80px;
      background: linear-gradient(transparent, rgba(26,26,26,1) 30%);
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding: 20px;
      box-sizing: border-box;
      transform: translateY(100%);
      opacity: 0;
      transition: all 0.3s ease;
    }
    .live-index-card:hover .revoke-btn-wrapper {
      transform: translateY(0);
      opacity: 1;
    }
    .live-index-btn { margin: 0; background: var(--card-bg); width: 100%; }
`;

c = c.replace('</style>', additionalCSS + '\n</style>');

// Strip existing marquee animations if there are any attached to live marquee
c = c.replace(/animation:\s*scroll-left-live[\s\S]*?;/g, '/* removed animation */');
c = c.replace(/@keyframes scroll-left-live[\s\S]*?}/g, '');

// 6. Update the JS injection for revokeBtn
c = c.replace(
  /let revokeBtn = report\.id\.length > 10 \? `[\s\S]*?` : '';/,
  `let revokeBtn = report.id.length > 10 ? \`<div class="revoke-btn-wrapper"><button class="live-index-btn" onclick="updateReportStatus('\${report.id}', 'rejected')">REVOKE APPROVAL</button></div>\` : '';`
);

// 7. Inject Drag-to-Scroll Script at the very bottom
const scrollScript = `
        // Drag to scroll for live feed
        const slider = document.querySelector('.live-marquee-wrapper');
        let isDown = false;
        let startX;
        let scrollLeft;

        if(slider) {
            slider.addEventListener('mousedown', (e) => {
              isDown = true;
              slider.style.cursor = 'grabbing';
              startX = e.pageX - slider.offsetLeft;
              scrollLeft = slider.scrollLeft;
            });
            slider.addEventListener('mouseleave', () => {
              isDown = false;
              slider.style.cursor = 'grab';
            });
            slider.addEventListener('mouseup', () => {
              isDown = false;
              slider.style.cursor = 'grab';
            });
            slider.addEventListener('mousemove', (e) => {
              if (!isDown) return;
              e.preventDefault();
              const x = e.pageX - slider.offsetLeft;
              const walk = (x - startX) * 2; 
              slider.scrollLeft = scrollLeft - walk;
            });
            slider.addEventListener('wheel', (e) => {
              if (e.deltaY !== 0) {
                e.preventDefault();
                slider.scrollLeft += e.deltaY;
              }
            }, { passive: false });
        }
`;

c = c.replace(/}\s*\);\s*<\/script>/, '});\n' + scrollScript + '\n    </script>');

fs.writeFileSync('admin-sample4.html', c);
console.log('Applied new visual overhaul to admin-sample4.html');

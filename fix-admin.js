const fs=require('fs');
let c=fs.readFileSync('admin-sample4.html', 'utf8');

// 1. Hide marquees when logged in
c = c.replace(
  'document.getElementById(\'login-container\').style.display = \'none\';',
  'document.getElementById(\'login-container\').style.display = \'none\';\n      document.querySelectorAll(\'.marquee-container\').forEach(el => el.style.display = \'none\');'
);

// Show them when logged out (for reset)
c = c.replace(
  "document.getElementById('login-container').style.display = 'block';",
  "document.getElementById('login-container').style.display = 'block';\n      document.querySelectorAll('.marquee-container').forEach(el => el.style.display = 'flex');"
);

// 2. Insert CSS styles for the Terminal header box
let newStyles = `
    .terminal-header-box {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 30px;
        padding: 16px;
        background: #1A1A1A;
        border: 2px solid var(--border-dark);
        box-shadow: 4px 4px 0 var(--accent-blue);
        color: white;
    }
    .terminal-header-box .dots-wrapper {
        display: flex;
        gap: 8px;
        margin-right: 8px;
    }
    .terminal-header-box .dot {
        height: 12px;
        width: 12px;
        border-radius: 50%;
        border: 1px solid var(--border-dark);
    }
    .dot-red { background: var(--accent-pink); }
    .dot-yellow { background: var(--accent-yellow); }
    .dot-green { background: var(--accent-green); }
    .terminal-header-box h2 {
        font-family: 'JetBrains Mono', monospace;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: -0.05em;
        margin: 0;
        color: white;
        text-transform: uppercase;
    }
    .terminal-header-box .badge {
        margin-left: 32px;
        padding: 2px 8px;
        background: var(--accent-blue);
        color: black;
        font-size: 10px;
        font-weight: 900;
        text-transform: uppercase;
        border: 1px solid black;
    }
    .live-section { border: none; background: transparent; margin-top: 40px; margin-bottom:40px; }
    .live-header { padding: 0; border: none; display: block; }
`;

c = c.replace('</style>', newStyles + '\n</style>');

// 3. Replace headers in DOM
c = c.replace(/<h3 class="section-title">[\s\S]*?NEW INCOMING LOGS[\s\S]*?<\/h3>/, 
`    <div class="terminal-header-box" style="box-shadow: 4px 4px 0 var(--accent-yellow);">
        <div class="dots-wrapper">
            <div class="dot dot-red"></div>
            <div class="dot dot-yellow"></div>
            <div class="dot dot-green"></div>
        </div>
        <h2>PENDING_REPORT_LOGS.txt</h2>
        <div class="badge" style="background: var(--accent-yellow);">INCOMING</div>
    </div>`);

c = c.replace(/<div class="live-header">[\s\S]*?<h2>LIVE ON PORTFOLIO<\/h2>\s*<\/div>/, 
`    <div class="live-header">
        <div class="terminal-header-box" style="box-shadow: 4px 4px 0 var(--accent-green);">
            <div class="dots-wrapper">
                <div class="dot dot-red"></div>
                <div class="dot dot-yellow"></div>
                <div class="dot dot-green"></div>
            </div>
            <h2>USER_REPORTS.txt</h2>
            <div class="badge" style="background: var(--accent-green);">LIVE_FEED</div>
        </div>
    </div>`);

c = c.replace(/<h3 class="section-title">[\s\S]*?GLOBAL REPORT DICTIONARY[\s\S]*?<\/h3>/,
`    <div class="terminal-header-box">
        <div class="dots-wrapper">
            <div class="dot dot-red"></div>
            <div class="dot dot-yellow"></div>
            <div class="dot dot-green"></div>
        </div>
        <h2>GLOBAL_DICTIONARY.txt</h2>
        <div class="badge">DATABASE</div>
    </div>`);

fs.writeFileSync('admin-sample4.html', c);
console.log('Successfully patched headers and auth hide logic in admin!');

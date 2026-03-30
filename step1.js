const fs = require('fs');

let c = fs.readFileSync('admin-sample4.html', 'utf8');

// The new box styles
const cssInject = `
    .section-top-nav {
      background: var(--text-dark);
      color: #fff;
      border: 4px solid var(--border-dark);
      border-radius: 12px;
      padding: 24px 32px;
      box-shadow: 8px 8px 0 var(--border-dark);
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    .section-top-nav h2 {
      margin: 0;
      font-size: 2.2rem;
      text-transform: uppercase;
      letter-spacing: -0.5px;
    }
    .section-top-nav p {
      margin: 4px 0 0 0;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      color: #aaa;
    }
    .section-badge {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 900;
      padding: 8px 16px;
      color: black;
      font-size: 14px;
      border-radius: 4px;
      border: 2px solid black;
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
    .live-header-wrapper {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 20px;
    }
    .live-marquee-wrapper {
      overflow-x: auto;
      overflow-y: hidden;
      padding: 40px 20px;
      cursor: grab;
      scrollbar-width: none;
    }
    .live-marquee-wrapper::-webkit-scrollbar {
      display: none;
    }
    .live-marquee-wrapper:active {
      cursor: grabbing;
    }
    .live-marquee-container {
      display: inline-flex;
      gap: 32px;
      padding: 0 16px;
      transition: none; /* override animation */
    }

    /* Override the hover interaction for the revoke button */
    .live-index-card {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .revoke-btn-wrapper {
      margin-top: auto;
      pt: 20px;
      opacity: 0;
      transform: translateY(15px);
      transition: all 0.3s ease;
    }
    .live-index-card:hover .revoke-btn-wrapper {
      opacity: 1;
      transform: translateY(0);
    }
`;

// Insert new CSS rules at the end of <style>
c = c.replace('</style>', cssInject + '\n</style>');

// Fix the main navigation title (revert ADMIN PORTAL to MISSION CONTROL)
c = c.replace(/<div class="nav-title">[\s\S]*?<h2>ADMIN PORTAL<\/h2>[\s\S]*?<p>Access Level: OMNIPOTENT \/\/ SYS_STATUS: ONLINE<\/p>[\s\S]*?<\/div>/, 
  `<div class="nav-title">
            <h2>MISSION CONTROL</h2>
            <p>Live Feed :: Pending 'Let's Talk Code' Submissions</p>
          </div>`);

// Ensure main has top-nav class
if (!c.includes('class="top-nav"')) {
    c = c.replace(/<div class="nav-title">/g, '<div class="top-nav">\n          <div class="nav-title">');
    // NOTE: This might mess up matching if there are multiple. 
}

fs.writeFileSync('temp.html', c);

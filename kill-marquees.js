const fs = require('fs');

const file = 'admin-sample4.backup.html';
let c = fs.readFileSync(file, 'utf16le');

// Make a very aggressive hide:
let replacement = `            dashboardWrapper.style.display = 'flex';
            const marquees = document.querySelectorAll('.marquee-container, .marquee-top, .marquee-bottom');
            for(let i=0; i<marquees.length; i++) {
                marquees[i].style.display = 'none';
                marquees[i].style.visibility = 'hidden';
                marquees[i].style.opacity = '0';
                marquees[i].remove(); // just nuke them from the DOM to be 1000% sure
            }`;

c = c.replace(/dashboardWrapper\.style\.display\s*=\s*'flex';\s*document\.querySelectorAll\('\.marquee-container'\)\.forEach\(el=>el\.style\.display='none'\);/g, replacement);
// Also fallback if it's the old version
c = c.replace(/dashboardWrapper\.style\.display\s*=\s*'flex';(?!\s*const marquees)/g, replacement);

fs.writeFileSync(file, Buffer.from(c, 'utf16le'));
console.log('Aggressively patched ' + file);

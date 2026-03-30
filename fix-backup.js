const fs = require('fs');

let f = 'admin-sample4.backup.html';
let c = fs.readFileSync(f, 'utf16le'); // Try parsing correctly

// Hide marquees when entering dashboard
if (c.includes("dashboardWrapper.style.display = 'flex';") && !c.includes("style.display='none'")) {
    c = c.replace(/dashboardWrapper\.style\.display\s*=\s*'flex';/g, 
      "dashboardWrapper.style.display = 'flex';\n            document.querySelectorAll('.marquee-container').forEach(el=>el.style.display='none');");
}
if (c.includes('dashboardWrapper.style.display = "flex";') && !c.includes("style.display='none'")) {
    c = c.replace(/dashboardWrapper\.style\.display\s*=\s*"flex";/g, 
      'dashboardWrapper.style.display = "flex";\n            document.querySelectorAll(".marquee-container").forEach(el=>el.style.display="none");');
}


// Show marquees when showing login panel
if (c.includes("loginWrapper.style.display = 'block';") && !c.includes("style.display='flex'")) {
    c = c.replace(/loginWrapper\.style\.display\s*=\s*'block';/g, 
      "loginWrapper.style.display = 'block';\n          document.querySelectorAll('.marquee-container').forEach(el=>el.style.display='flex');");
}
if (c.includes('loginWrapper.style.display = "block";') && !c.includes('style.display="flex"')) {
    c = c.replace(/loginWrapper\.style\.display\s*=\s*"block";/g, 
      'loginWrapper.style.display = "block";\n          document.querySelectorAll(".marquee-container").forEach(el=>el.style.display="flex");');
}

fs.writeFileSync(f, Buffer.from(c, 'utf16le'));
console.log('Fixed ' + f);

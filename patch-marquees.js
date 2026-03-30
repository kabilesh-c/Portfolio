const fs = require('fs');

['admin-sample4.html', 'admin-sample4.backup.html'].forEach(f => {
  try {
    let c = fs.readFileSync(f, 'utf8');
    
    // Hide marquees when we show dashboard
    c = c.replace(/dashboardWrapper\.style\.display\s*=\s*'([^']+)'\s*;/g, (match, p1) => {
        if (p1 === 'none') return match; // don't replace if it's hiding the dashboard
        return `dashboardWrapper.style.display = '${p1}';\n            document.querySelectorAll('.marquee-container').forEach(el=>el.style.display='none');`;
    });
    
    // Show marquees when we show login screen
    c = c.replace(/loginWrapper\.style\.display\s*=\s*'block'\s*;/g, match => {
        return `loginWrapper.style.display = 'block';\n          document.querySelectorAll('.marquee-container').forEach(el=>el.style.display='flex');`;
    });

    // Make sure we don't accidentally duplicate
    c = c.replace(/document\.querySelectorAll\('\.marquee-container'\)\.forEach\(el=>el\.style\.display='none'\);\s*document\.querySelectorAll\('\.marquee-container'\)/g, "document.querySelectorAll('.marquee-container')");
    
    fs.writeFileSync(f, c);
    console.log('Patched ' + f);
  } catch(e) {
    console.log('Error patching ' + f + ':', e.message);
  }
});

import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to replace inside loadLiveReports
# We will match the beginning of loadLiveReports up to let segment = '';

target = '''        async function loadLiveReports() {
            const marquee = document.getElementById("index-reports-marquee");
            if (!marquee) return;
            
            try {
                const q = query(collection(db, "reports"), where("status", "==", "approved"));'''

replacement = '''        async function loadLiveReports() {
            const marquee = document.getElementById("index-reports-marquee");
            if (!marquee) return;

            // Preserve the original hardcoded static cards so they aren't overwritten and lost when DB only has 1 or 2 items
            let staticCardsHTML = '';
            const origChildren = Array.from(marquee.children).slice(0, 6);
            if (origChildren.length > 0) {
                staticCardsHTML = origChildren.map(el => {
                    if (!el.classList.contains('live-feed-card')) {
                        el.classList.add('live-feed-card');
                    }
                    return el.outerHTML;
                }).join('');
            }
            
            try {
                const q = query(collection(db, "reports"), where("status", "==", "approved"));'''

new_content = content.replace(target, replacement)

target_seg = '''                let segment = '';
                const colors = ['#33FF57', '#3B82F6', '#FF70A6', '#FBFF48'];
                
                approved.forEach((report, index) => {'''

replacement_seg = '''                let segment = '';
                const colors = ['#33FF57', '#3B82F6', '#FF70A6', '#FBFF48'];
                
                approved.forEach((report, index) => {'''

target_wrap = '''                // Wrap segment in a perfectly measurable container
                let wrappedSegment = <div class="live-feed-segment flex gap-8 shrink-0"></div>;'''

replacement_wrap = '''                // Append the preserved static cards to the live segment so they aren't deleted
                segment += staticCardsHTML;

                // Wrap segment in a perfectly measurable container
                let wrappedSegment = <div class="live-feed-segment flex gap-8 shrink-0"></div>;'''

new_content = new_content.replace(target_wrap, replacement_wrap)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Patched index.html")

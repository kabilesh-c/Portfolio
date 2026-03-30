const fs=require('fs');

const demoReportsStr = `
const demoReports = [
    { id: '001', timestamp: Date.now(), role: 'Student', organization: 'Innovation Lab', message: 'Built an intelligent AI system under tight deadlines and delivered a complete full stack product with excellent quality.', rating: 5, status: 'approved' },
    { id: '002', timestamp: Date.now(), role: 'CEO', organization: 'Digital Consultancy', message: 'The AI and ML architecture is highly reliable, and the full stack execution is fast, stable, and production-ready.', rating: 5, status: 'approved' },
    { id: '003', timestamp: Date.now(), role: 'Research Team', organization: 'ML Center', message: 'Exceptional code quality across AI pipelines and full stack modules, with strong handling of complex data and state flows.', rating: 5, status: 'approved' },
    { id: '004', timestamp: Date.now(), role: 'Engineering', organization: 'Product Studio', message: 'A great blend of intelligent AI features, ML-driven logic, and a polished full stack user experience.', rating: 5, status: 'approved' },
    { id: '005', timestamp: Date.now(), role: 'Design Team', organization: 'TechFlow', message: 'Delivered an intuitive full stack experience powered by smart AI insights and practical machine learning outcomes.', rating: 5, status: 'approved' }
];
`;

// FIX INDEX.HTML
let idxStr = fs.readFileSync('index.html', 'utf8');

let newLoadLiveReports = `async function loadLiveReports() {
            const marquee = document.getElementById("index-reports-marquee");
            if (!marquee) return;

            try {
                const q = query(collection(db, "reports"), where("status", "==", "approved"));
                const snapshot = await getDocs(q);
                let liveData = [
                    { id: '001', timestamp: Date.now(), role: 'Student', organization: 'Innovation Lab', message: 'Built an intelligent AI system under tight deadlines and delivered a complete full stack product with excellent quality.', rating: 5, status: 'approved' },
                    { id: '002', timestamp: Date.now(), role: 'CEO', organization: 'Digital Consultancy', message: 'The AI and ML architecture is highly reliable, and the full stack execution is fast, stable, and production-ready.', rating: 5, status: 'approved' },
                    { id: '003', timestamp: Date.now(), role: 'Research Team', organization: 'ML Center', message: 'Exceptional code quality across AI pipelines and full stack modules, with strong handling of complex data and state flows.', rating: 5, status: 'approved' },
                    { id: '004', timestamp: Date.now(), role: 'Engineering', organization: 'Product Studio', message: 'A great blend of intelligent AI features, ML-driven logic, and a polished full stack user experience.', rating: 5, status: 'approved' },
                    { id: '005', timestamp: Date.now(), role: 'Design Team', organization: 'TechFlow', message: 'Delivered an intuitive full stack experience powered by smart AI insights and practical machine learning outcomes.', rating: 5, status: 'approved' }
                ];
                snapshot.forEach(doc => liveData.push({id: doc.id, ...doc.data()}));

                let html = '';
                const colors = ['neo-green', 'neo-blue', 'neo-pink', 'neo-yellow', 'neo-orange', 'neo-purple'];

                const generateSet = () => {
                    liveData.forEach((report, index) => {
                        let cVar = colors[index % colors.length];
                        let stars = '<i class="ri-star-fill"></i>'.repeat(report.rating || 5);
                        let dispId = report.id.length > 10 ? report.id.substring(0,6) : report.id;

                        html += \`
                        <div class="flex-shrink-0 w-[450px] bg-neo-black border-4 border-white/10 p-8 shadow-hard hover:border-\${cVar}/50 hover:-translate-y-2 transition-all duration-500 relative group/card overflow-hidden text-left whitespace-normal">
                            <div class="absolute top-0 left-0 w-full h-1 bg-\${cVar}"></div>
                            <div class="absolute -top-4 -right-4 w-12 h-12 bg-white/5 rotate-45"></div>
                            <div class="flex justify-between items-start mb-6">
                                <div class="font-mono text-\${cVar} text-xs font-bold tracking-widest uppercase">REPORT_\${dispId}.log</div>
                                <div class="text-[10px] font-mono text-gray-500">2025.txt</div>
                            </div>
                            <div class="font-mono text-gray-400 text-[10px] mb-2 uppercase tracking-tight">FROM: \${report.role||"USER"} @ \${report.organization||"UNKNOWN"}</div>
                            <p class="font-bold text-xl leading-snug mb-6 text-white/90">"\${report.message}"</p>
                            <div class="flex text-\${cVar}/60 gap-1 text-lg">
                                \${stars}
                            </div>
                        </div>\`;
                    });
                };

                // Print it twice to make it infinitely scroll seamlessly
                generateSet();
                generateSet();

                marquee.innerHTML = html;

            } catch (e) {
                console.error('Error fetching live reports:', e);
            }
        }`;

idxStr = idxStr.replace(/async function loadLiveReports\(\)[\s\S]*?}\s*(?=\/\/\s*Execute function)/, newLoadLiveReports + '\n        ');
fs.writeFileSync('index.html', idxStr);
console.log('Fixed index.html loadLiveReports to pre-inject demo data!');


// FIX ADMIN-SAMPLE4.HTML
let adminStr = fs.readFileSync('admin-sample4.html', 'utf8');

let adminStyles = `
.live-index-card {
    flex-shrink: 0;
    width: 450px;
    background-color: #1A1A1A;
    border: 4px solid rgba(255, 255, 255, 0.1);
    padding: 2rem;
    box-shadow: 4px 4px 0 var(--border-dark);
    transition: all 0.5s;
    position: relative;
    overflow: hidden;
    text-align: left;
    white-space: normal;
    font-family: inherit;
    color: white;
}
.live-index-card:hover {
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-8px);
}
.live-index-card .top-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
}
.live-index-card .corner-box {
    position: absolute;
    top: -16px;
    right: -16px;
    width: 48px;
    height: 48px;
    background: rgba(255, 255, 255, 0.05);
    transform: rotate(45deg);
}
.live-index-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
}
.live-index-card-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 0.1em;
    text-transform: uppercase;
}
.live-index-card-year {
    font-size: 10px;
    font-family: 'JetBrains Mono', monospace;
    color: #6b7280;
}
.live-index-card-from {
    font-family: 'JetBrains Mono', monospace;
    color: #9ca3af;
    font-size: 10px;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: -0.025em;
}
.live-index-card-msg {
    font-size: 20px;
    font-weight: bold;
    line-height: 1.375;
    margin-bottom: 24px;
    color: rgba(255, 255, 255, 0.9);
}
.live-index-card-stars {
    display: flex;
    gap: 4px;
    font-size: 18px;
}
.live-index-btn {
    display: inline-block;
    margin-top: 16px;
    padding: 8px 16px;
    background: transparent;
    border: 2px solid var(--accent-pink);
    color: var(--accent-pink);
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    text-transform: uppercase;
    transition: 0.2s;
}
.live-index-btn:hover {
    background: var(--accent-pink);
    color: black;
}
`;

adminStr = adminStr.replace('</style>', adminStyles + '\n</style>');

let newRenderLiveFeed = `function renderLiveFeed() {
        const container = document.getElementById('live-marquee-container');
        
        let liveData = [
            { id: '001', timestamp: Date.now(), role: 'Student', organization: 'Innovation Lab', message: 'Built an intelligent AI system under tight deadlines and delivered a complete full stack product with excellent quality.', rating: 5, status: 'approved' },
            { id: '002', timestamp: Date.now(), role: 'CEO', organization: 'Digital Consultancy', message: 'The AI and ML architecture is highly reliable, and the full stack execution is fast, stable, and production-ready.', rating: 5, status: 'approved' },
            { id: '003', timestamp: Date.now(), role: 'Research Team', organization: 'ML Center', message: 'Exceptional code quality across AI pipelines and full stack modules, with strong handling of complex data and state flows.', rating: 5, status: 'approved' },
            { id: '004', timestamp: Date.now(), role: 'Engineering', organization: 'Product Studio', message: 'A great blend of intelligent AI features, ML-driven logic, and a polished full stack user experience.', rating: 5, status: 'approved' },
            { id: '005', timestamp: Date.now(), role: 'Design Team', organization: 'TechFlow', message: 'Delivered an intuitive full stack experience powered by smart AI insights and practical machine learning outcomes.', rating: 5, status: 'approved' }
        ];
        
        const dbApproved = allReports.filter(r => r.status === 'approved');
        liveData = liveData.concat(dbApproved);

        let html = '';
        const colorVars = ['var(--accent-green)', 'var(--accent-blue)', 'var(--accent-pink)', 'var(--accent-yellow)', 'var(--accent-orange)', '#a855f7'];

        const generateSet = () => {
             liveData.forEach((report, index) => {
                 let cVar = colorVars[index % colorVars.length];
                 let stars = '★'.repeat(report.rating || 5);
                 let dispId = report.id.length > 10 ? report.id.substring(0,6) : report.id;
                 
                 let revokeBtn = report.id.length > 10 ? \`
                    <button class="live-index-btn" onclick="updateReportStatus('\${report.id}', 'rejected')">REVOKE APPROVAL</button>\` : '';

                 html += \`
                 <div class="live-index-card">
                     <div class="top-line" style="background: \${cVar};"></div>
                     <div class="corner-box"></div>
                     <div class="live-index-card-header">
                         <div class="live-index-card-title" style="color: \${cVar};">REPORT_\${dispId}.log</div>
                         <div class="live-index-card-year">2025.txt</div>
                     </div>
                     <div class="live-index-card-from">FROM: \${report.role||'USER'} @ \${report.organization||'UNKNOWN'}</div>
                     <p class="live-index-card-msg">"\${report.message}"</p>
                     <div class="live-index-card-stars" style="color: \${cVar}; opacity: 0.7;">
                         \${stars}
                     </div>
                     \${revokeBtn}
                 </div>\`;
             });
        };

        generateSet();
        generateSet();

        container.innerHTML = html;
      }`;

adminStr = adminStr.replace(/function renderLiveFeed\(\)[\s\S]*?}\s*(?=function renderDictionary)/, newRenderLiveFeed + '\n\n      ');
fs.writeFileSync('admin-sample4.html', adminStr);
console.log('Fixed admin-sample4.html renderLiveFeed to match frontend UI and include demo data!');

const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        // Replace exact string matches
        const newContent = content.replace(/ABV-IIITM Gwalior/g, 'ABV-IIITM, Gwalior');
        // Let's also replace potential hyphenated or different spaced? No, user specifically asked for "ABV-IIITM Gwalior"
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
    } catch (err) {
        console.error(`Error reading ${filePath}:`, err);
    }
}

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('.next') && !file.includes('dist')) {
                walk(file);
            }
        } else {
            if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.html')) {
                replaceInFile(file);
            }
        }
    });
}

const srcDir = path.join('c:', 'Github', 'ICGST-2026', 'src');
const indexHtml = path.join('c:', 'Github', 'ICGST-2026', 'index.html');

replaceInFile(indexHtml);
walk(srcDir);
console.log('Replacement complete.');

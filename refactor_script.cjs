const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const homeDir = path.join(srcDir, 'components', 'home');
const sectionsDir = path.join(srcDir, 'components', 'sections');

// Files to move
const filesToMove = [
    'HeroSection.jsx',
    'IntroSection.jsx',
    'AboutInstitute.jsx'
];

filesToMove.forEach(file => {
    const oldPath = path.join(homeDir, file);
    const newPath = path.join(sectionsDir, file);
    if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(`Moved ${file}`);
    }
});

// Update imports in all pages
const pagesDir = path.join(srcDir, 'pages');
const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

pages.forEach(page => {
    const filePath = path.join(pagesDir, page);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace old imports
    content = content.replace(/..\/components\/home\/HeroSection/g, '../components/sections/HeroSection');
    content = content.replace(/..\/components\/home\/IntroSection/g, '../components/sections/IntroSection');
    content = content.replace(/..\/components\/home\/AboutInstitute/g, '../components/sections/AboutInstitute');
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated imports in ${page}`);
});

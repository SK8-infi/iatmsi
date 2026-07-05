const fs = require('fs');
const path = require('path');

const replaceStyles = (dir) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceStyles(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;
            
            // HeroSection
            content = content.replace(/style=\{\{\s*color:\s*'#ffffff'\s*\}\}\s*className="/g, 'className="text-white ');
            content = content.replace(/style=\{\{\s*color:\s*'#ffffff',\s*borderColor:\s*'#ffffff'\s*\}\}\s*className="/g, 'className="text-white border-white ');
            content = content.replace(/style=\{\{\s*color:\s*'#002855',\s*backgroundColor:\s*'#ffffff'\s*\}\}\s*className="/g, 'className="text-primary-900 bg-white ');
            content = content.replace(/style=\{\{\s*backgroundColor:\s*'#002855'\s*\}\}\s*className="/g, 'className="bg-primary-900 ');
            
            // Navbar
            content = content.replace(/style=\{\{\s*backgroundColor:\s*'#002855',\s*borderColor:\s*'#001a3a'\s*\}\}\s*className="/g, 'className="bg-primary-900 border-primary-950 ');
            
            // AboutInstitute
            content = content.replace(/style=\{\{\s*backgroundColor:\s*'#e6f0fa'\s*\}\}\s*className="/g, 'className="bg-primary-50 ');
            
            // RegistrationFeeTable
            content = content.replace(/style=\{\{\s*backgroundColor:\s*'#002855',\s*color:\s*'#ffffff'\s*\}\}/g, 'className="bg-primary-900 text-white"');
            content = content.replace(/style=\{\{\s*backgroundColor:\s*'#003366',\s*color:\s*'#ffffff'\s*\}\}/g, 'className="bg-primary-800 text-white"');
            content = content.replace(/style=\{\{\s*backgroundColor:\s*'#004c99',\s*color:\s*'#ffffff'\s*\}\}/g, 'className="bg-primary-700 text-white"');
            
            // MemberCard
            content = content.replace(/style=\{\{\s*backgroundColor:\s*'#003366'\s*\}\}/g, 'className="bg-primary-800"');
            
            // ImportantDatesTimeline
            content = content.replace(/style=\{\{\s*\n*\s*backgroundImage:\s*'radial-gradient\(#002855 1px, transparent 1px\)',\s*backgroundSize:\s*'40px 40px'\s*\}\}/g, 'className="bg-[radial-gradient(var(--color-primary-900)_1px,transparent_1px)] bg-[size:40px_40px]"');
            
            // TravelVisa & VenueDirections
            content = content.replace(/style=\{\{\s*backgroundColor:\s*'#002855'\s*\}\}/g, 'className="bg-primary-900"');

            if (content !== original) {
                // For tables that had className already, combine them
                content = content.replace(/className="([^"]+)"\s*className="([^"]+)"/g, 'className="$1 $2"');
                fs.writeFileSync(fullPath, content);
                console.log('Fixed styles in ' + fullPath);
            }
        }
    }
};
replaceStyles(path.join(__dirname, 'src', 'components'));

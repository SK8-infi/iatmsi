const fs = require('fs');
const path = require('path');

const fixSizes = (dir) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixSizes(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;

            // Fix h1
            content = content.replace(/(<h1[^>]*className="[^"]*)text-base/g, '$1text-3xl md:text-4xl');
            
            // Fix h2
            content = content.replace(/(<h2[^>]*className="[^"]*)text-base/g, '$1text-2xl md:text-3xl');
            
            // Fix h3
            content = content.replace(/(<h3[^>]*className="[^"]*)text-base/g, '$1text-xl font-bold');
            
            // Fix h4
            content = content.replace(/(<h4[^>]*className="[^"]*)text-base/g, '$1text-lg font-bold');

            // Fix SectionHeader sizes in SectionContainer (since it might have been hit)
            // Wait, SectionContainer was already perfect, let me make sure it's right.
            if (file === 'SectionContainer.jsx') {
                content = content.replace(/text-2xl md:text-3xl font-bold/, 'text-2xl md:text-3xl font-bold'); // keep
                content = content.replace(/text-sm md:text-base text-neutral-600/, 'text-sm md:text-base text-neutral-600'); // keep
            }

            // Fix HeroSection specifically
            if (file === 'HeroSection.jsx') {
                content = content.replace(/text-base md:text-base lg:text-base/g, 'text-2xl md:text-3xl lg:text-4xl');
                content = content.replace(/text-base md:text-base/g, 'text-xl md:text-2xl');
                content = content.replace(/text-sm md:text-base/g, 'text-sm md:text-base');
            }

            // Fix AboutRationaleSection specifically
            if (file === 'AboutRationaleSection.jsx') {
                content = content.replace(/text-base md:text-base/g, 'text-lg md:text-xl');
            }

            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log('Fixed sizes in ' + fullPath);
            }
        }
    }
};

fixSizes(path.join(__dirname, 'src', 'components'));

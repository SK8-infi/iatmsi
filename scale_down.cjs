const fs = require('fs');
const path = require('path');

const scaleDown = (dir) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            scaleDown(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;
            
            // Text sizing downscales
            content = content.replace(/text-6xl/g, 'text-5xl');
            content = content.replace(/text-5xl/g, 'text-4xl');
            content = content.replace(/text-4xl/g, 'text-3xl');
            content = content.replace(/text-3xl/g, 'text-2xl');
            content = content.replace(/text-2xl/g, 'text-xl');
            content = content.replace(/text-xl/g, 'text-lg');
            content = content.replace(/text-lg/g, 'text-base');
            content = content.replace(/prose-lg/g, 'prose');

            // Replace size="lg" with size="md" for Buttons
            content = content.replace(/size="lg"/g, 'size="md"');

            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log('Scaled down ' + fullPath);
            }
        }
    }
};

scaleDown(path.join(__dirname, 'src', 'components'));
scaleDown(path.join(__dirname, 'src', 'pages'));

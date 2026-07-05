const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const sectionsDir = path.join(__dirname, 'src', 'components', 'sections');

const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('Page.jsx') && f !== 'HomePage.jsx' && f !== 'DynamicPage.jsx');

let pageRegistryEntries = [];
let sectionResolverImports = [];
let sectionResolverExports = [];

pages.forEach(page => {
    const filePath = path.join(pagesDir, page);
    let content = fs.readFileSync(filePath, 'utf8');

    const pageName = page.replace('Page.jsx', '');
    const sectionName = `${pageName}Section`;
    const sectionId = pageName.charAt(0).toLowerCase() + pageName.slice(1) + 'Section';
    const routeId = pageName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');

    // Extract HeroSection props
    let heroProps = {};
    const heroMatch = content.match(/<HeroSection([\s\S]*?)\/>/);
    if (heroMatch) {
        const titleMatch = heroMatch[1].match(/title="([^"]*)"/);
        const subtitleMatch = heroMatch[1].match(/subtitle=\{`([^`]*)`\}/) || heroMatch[1].match(/subtitle="([^"]*)"/);
        
        if (titleMatch) heroProps.title = titleMatch[1];
        if (subtitleMatch) heroProps.subtitle = subtitleMatch[1];
        
        // Remove HeroSection
        content = content.replace(heroMatch[0], '');
    }

    // Remove HeroSection import
    content = content.replace(/import HeroSection from '.*?HeroSection';?\n?/, '');

    // Rename the component
    content = content.replace(`export default function ${pageName}Page`, `export default function ${sectionName}`);
    content = content.replace(`function ${pageName}Page`, `function ${sectionName}`); // fallback

    // Write to sections
    fs.writeFileSync(path.join(sectionsDir, `${sectionName}.jsx`), content);
    console.log(`Created ${sectionName}.jsx`);

    // Prepare registry entry
    let pagePath = `/${routeId}`;
    if (pageName === 'Tracks') pagePath = '/call-for-papers/tracks';
    if (pageName === 'PaperSubmission') pagePath = '/call-for-papers/paper-submission';
    if (pageName === 'ImportantDates') pagePath = '/important-dates';
    if (pageName === 'CallForReviewers') pagePath = '/call-for-reviewers';
    if (pageName === 'Registration') pagePath = '/registration';
    if (pageName === 'TravelVisa') pagePath = '/travel/visa';
    if (pageName === 'VenueDirections') pagePath = '/travel/venue';
    if (pageName === 'ExploreGwalior') pagePath = '/travel/explore-gwalior';

    pageRegistryEntries.push(`
    {
        id: '${routeId}',
        title: '${heroProps.title || pageName}',
        path: '${pagePath}',
        sections: [
            ${heroProps.title ? `{ sectionId: 'hero', props: { title: "${heroProps.title}", subtitle: \`${heroProps.subtitle || ''}\` } },` : ''}
            { sectionId: '${sectionId}', props: {} }
        ]
    }`);

    sectionResolverImports.push(`import ${sectionName} from '../components/sections/${sectionName}';`);
    sectionResolverExports.push(`    ${sectionId}: ${sectionName},`);
});

// Update pageRegistry.js
let registryContent = fs.readFileSync(path.join(__dirname, 'src', 'data', 'pageRegistry.js'), 'utf8');
registryContent = registryContent.replace(/];\s*$/, ',' + pageRegistryEntries.join(',') + '\n];\n');
fs.writeFileSync(path.join(__dirname, 'src', 'data', 'pageRegistry.js'), registryContent);

// Update sectionResolver.jsx
let resolverContent = fs.readFileSync(path.join(__dirname, 'src', 'utils', 'sectionResolver.jsx'), 'utf8');
resolverContent = sectionResolverImports.join('\n') + '\n' + resolverContent;
resolverContent = resolverContent.replace(/};\s*$/, sectionResolverExports.join('\n') + '\n};\n');
fs.writeFileSync(path.join(__dirname, 'src', 'utils', 'sectionResolver.jsx'), resolverContent);

console.log("Done.");

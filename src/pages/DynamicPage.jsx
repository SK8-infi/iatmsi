import { pageRegistry } from '../data/pageRegistry';
import { sectionResolver } from '../utils/sectionResolver';
import NavigationMenu from '../components/layout/NavigationMenu';
import LatestUpdates from '../components/sections/LatestUpdates';
import Navbar from '../components/layout/Navbar';

export default function DynamicPage({ pageId }) {
    const pageConfig = pageRegistry.find(p => p.id === pageId);

    if (!pageConfig) {
        return <div className="p-8 text-center text-red-500 font-bold">Error: Page "{pageId}" not found in registry.</div>;
    }

    const heroSection = pageConfig.sections.find(s => s.sectionId === 'hero');
    const otherSections = pageConfig.sections.filter(s => s.sectionId !== 'hero');

    return (
        <>
            <div className="relative">
                <div className={`sticky top-0 z-50 ${heroSection ? 'h-0 overflow-visible w-full' : ''}`}>
                    <Navbar />
                </div>
                {heroSection && (
                    <SectionRenderer 
                        key="hero" 
                        section={heroSection} 
                    />
                )}
            </div>
            
            <LatestUpdates />
            <NavigationMenu />

            {otherSections.map((section, index) => (
                <SectionRenderer 
                    key={`${section.sectionId}-${index}`} 
                    section={section} 
                />
            ))}
        </>
    );
}

// Helper to render a section
function SectionRenderer({ section }) {
    const Component = sectionResolver[section.sectionId];
    if (!Component) {
        console.warn(`Component not found for sectionId: ${section.sectionId}`);
        return null;
    }
    return <Component {...section.props} />;
}

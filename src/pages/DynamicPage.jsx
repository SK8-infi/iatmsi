import { pageRegistry } from '../data/pageRegistry';
import { sectionResolver } from '../utils/sectionResolver';

export default function DynamicPage({ pageId }) {
    const pageConfig = pageRegistry.find(p => p.id === pageId);

    if (!pageConfig) {
        return <div className="p-8 text-center text-red-500 font-bold">Error: Page "{pageId}" not found in registry.</div>;
    }

    return (
        <>
            {pageConfig.sections.map((section, index) => {
                const Component = sectionResolver[section.sectionId];
                
                if (!Component) {
                    console.warn(`Component not found for sectionId: ${section.sectionId}`);
                    return null;
                }

                return <Component key={`${section.sectionId}-${index}`} {...section.props} />;
            })}
        </>
    );
}

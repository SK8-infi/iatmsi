import { useState, useEffect, useRef } from 'react';

const DESIGN_WIDTH = 1536; // Exact match to Tailwind 2xl breakpoint

export default function ScaleWrapper({ children }) {
    const [scale, setScale] = useState(1);
    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            // Only apply scaling for larger screens to maintain design proportions
            // For mobile and tablets (below 1024px), we disable scaling to keep text readable
            const currentWidth = document.documentElement.clientWidth || window.innerWidth;

            if (currentWidth < 1024) {
                setScale(1);
            } else {
                setScale(currentWidth / DESIGN_WIDTH);
            }

            if (contentRef.current) {
                setContentHeight(contentRef.current.offsetHeight);
            }
        };

        handleResize(); // Initial calculation
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Measure content height to adjust container height
    useEffect(() => {
        if (!contentRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setContentHeight(entry.contentRect.height);
            }
        });

        observer.observe(contentRef.current);
        return () => observer.disconnect();
    }, [children]); // Re-observe if children change significantly enough to potentially remount ref? (Unlikely but safe)

    const isMobile = scale === 1;

    return (
        <div
            style={isMobile ? { width: '100%' } : {
                width: '100%',
                height: `${contentHeight * scale}px`,
                overflow: 'hidden'
            }}
        >
            <div
                ref={contentRef}
                style={isMobile ? { width: '100%' } : {
                    width: `${DESIGN_WIDTH}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                }}
            >
                {children}
            </div>
        </div>
    );
}

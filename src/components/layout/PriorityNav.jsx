import { useState, useRef, useEffect, useCallback } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export default function PriorityNav({ items }) {
    const containerRef = useRef(null);
    const measureRef = useRef(null);
    const [visibleCount, setVisibleCount] = useState(items.length);
    const [openDropdowns, setOpenDropdowns] = useState({});
    const location = useLocation();

    const isDropdownActive = useCallback((item) => {
        return item.items?.some(subItem => location.pathname === subItem.path);
    }, [location.pathname]);

    // Handle recalculating how many items fit in the nav
    const updateVisibility = useCallback(() => {
        if (!containerRef.current || !measureRef.current) return;

        const containerWidth = containerRef.current.offsetWidth;
        const measureContainer = measureRef.current;
        const children = Array.from(measureContainer.children);
        
        if (children.length === 0) return;

        // The last child in the measure container is the "More" button
        const moreBtnWidth = children[children.length - 1].offsetWidth;
        
        let newVisibleCount = items.length;
        let currentWidth = 0;
        const GAP = 16; // 1rem (space-x-4)

        for (let i = 0; i < items.length; i++) {
            const itemWidth = children[i].offsetWidth;
            currentWidth += itemWidth;
            if (i > 0) currentWidth += GAP;

            // If we are at the last item, we don't need the More button.
            // If we are not at the last item, we MUST leave room for the More button.
            const requiredWidth = i === items.length - 1 
                ? currentWidth 
                : currentWidth + GAP + moreBtnWidth;

            if (requiredWidth > containerWidth) {
                newVisibleCount = Math.max(0, i);
                break;
            }
        }

        setVisibleCount(newVisibleCount);
    }, [items.length]);

    useEffect(() => {
        updateVisibility();
        
        // Debounce resize slightly for performance
        let timeoutId;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(updateVisibility, 20);
        };

        const resizeObserver = new ResizeObserver(handleResize);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            clearTimeout(timeoutId);
            resizeObserver.disconnect();
        };
    }, [updateVisibility]);

    // Render a single navigation item (visible part)
    const renderNavItem = (item, isActive) => {
        if (item.type === 'link') {
            return (
                <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive: isCurrent }) =>
                        `flex items-center px-1 py-1 xl:px-2 text-[10px] xl:text-xs font-medium tracking-wide uppercase transition-colors border-b-2
                        ${isCurrent ? 'text-primary-900 border-primary-900 font-bold' : 'text-slate-700 border-transparent hover:text-primary-700 hover:border-primary-700/30'}`
                    }
                >
                    {item.label}
                </NavLink>
            );
        }

        return (
            <div key={item.id} className="relative group flex">
                <button className={`flex items-center px-1 py-1 xl:px-2 text-[10px] xl:text-xs font-medium tracking-wide uppercase transition-colors border-b-2 ${isActive ? 'text-primary-900 border-primary-900 font-bold' : 'text-slate-700 border-transparent hover:text-primary-700 hover:border-primary-700/30'}`}>
                    {item.label}
                    <svg className="w-3 h-3 ml-0.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div className="absolute top-full left-0 w-full h-2 bg-transparent"></div>
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50 border border-slate-100 ring-1 ring-black ring-opacity-5">
                    <div className="py-2">
                        {item.items.map((subItem) => (
                            <Link
                                key={subItem.id}
                                to={subItem.path}
                                className="block px-4 py-2 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-700"
                            >
                                {subItem.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const visibleItems = items.slice(0, visibleCount);
    const hiddenItems = items.slice(visibleCount);
    
    // Check if the "More" dropdown should be active (if any of its hidden children are active)
    const isMoreActive = hiddenItems.some(item => 
        item.type === 'link' ? location.pathname === item.path : isDropdownActive(item)
    );

    return (
        <div className="relative w-full h-full flex items-center">
            {/* 1. HIDDEN MEASURING CONTAINER */}
            <div 
                ref={measureRef} 
                className="absolute top-0 left-0 w-max invisible pointer-events-none flex space-x-4 opacity-0 z-[-1]"
                aria-hidden="true"
            >
                {/* Render all items exactly as they would appear to measure them */}
                {items.map(item => (
                    <div key={`measure-${item.id}`} className="px-1 py-1 xl:px-2 text-[10px] xl:text-xs font-medium tracking-wide uppercase border-b-2">
                        {item.label}
                        {item.type === 'dropdown' && (
                            <svg className="w-3 h-3 ml-0.5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        )}
                    </div>
                ))}
                {/* Measure the "More" button */}
                <div className="px-1 py-1 xl:px-2 text-[10px] xl:text-xs font-medium tracking-wide uppercase border-b-2">
                    More
                    <svg className="w-3 h-3 ml-0.5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* 2. ACTUAL VISIBLE CONTAINER */}
            <div ref={containerRef} className="w-full flex items-center space-x-4 justify-start">
                {visibleItems.map(item => renderNavItem(item, item.type === 'dropdown' ? isDropdownActive(item) : location.pathname === item.path))}

                {/* MORE DROPDOWN */}
                {hiddenItems.length > 0 && (
                    <div className="relative group flex">
                        <button className={`flex items-center px-1 py-1 xl:px-2 text-[10px] xl:text-xs font-medium tracking-wide uppercase transition-colors border-b-2 ${isMoreActive ? 'text-primary-900 border-primary-900 font-bold' : 'text-slate-700 border-transparent hover:text-primary-700 hover:border-primary-700/30'}`}>
                            More
                            <svg className="w-3 h-3 ml-0.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className="absolute top-full left-0 w-full h-2 bg-transparent"></div>
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50 border border-slate-100 ring-1 ring-black ring-opacity-5">
                            <div className="py-2 max-h-[70vh] overflow-y-auto no-scrollbar">
                                {hiddenItems.map((item) => (
                                    <div key={`more-${item.id}`}>
                                        {item.type === 'link' ? (
                                            <Link
                                                to={item.path}
                                                className={`block px-4 py-2.5 text-sm hover:bg-primary-50 hover:text-primary-700 ${location.pathname === item.path ? 'text-primary-900 font-bold bg-primary-50/50' : 'text-slate-700'}`}
                                            >
                                                {item.label}
                                            </Link>
                                        ) : (
                                            <div className="border-t border-slate-100 mt-1 pt-1 first:border-0 first:mt-0 first:pt-0">
                                                <div className="px-4 py-2 text-xs font-bold text-slate-400 tracking-wider uppercase">
                                                    {item.label}
                                                </div>
                                                {item.items.map((subItem) => (
                                                    <Link
                                                        key={`more-sub-${subItem.id}`}
                                                        to={subItem.path}
                                                        className={`block px-4 py-2 pl-6 text-sm hover:bg-primary-50 hover:text-primary-700 ${location.pathname === subItem.path ? 'text-primary-900 font-medium' : 'text-slate-600'}`}
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

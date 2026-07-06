import { useState, useEffect } from 'react';
import { latestUpdates } from '../../data/latestUpdates';

export default function LatestUpdates() {
    const [updates, setUpdates] = useState([]);

    useEffect(() => {
        setUpdates(latestUpdates);
    }, []);

    if (!updates || updates.length === 0) return null;

    return (
        <div className="w-full bg-[#002855] text-white border-t border-blue-800 relative z-20 overflow-hidden flex h-12 sm:h-14 shadow-md">
            {/* Label */}
            <div className="bg-blue-600 px-4 sm:px-8 flex items-center justify-center relative z-20 shrink-0 shadow-lg">
                <span className="font-bold text-sm sm:text-base uppercase tracking-wider flex items-center gap-2">
                    <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="hidden sm:inline">Latest</span> Updates
                </span>
                {/* Arrow */}
                <div className="absolute top-0 right-0 transform translate-x-full h-full w-0 border-t-[24px] sm:border-t-[28px] border-t-transparent border-l-[12px] sm:border-l-[20px] border-l-blue-600 border-b-[24px] sm:border-b-[28px] border-b-transparent"></div>
            </div>

            {/* Scrolling Content */}
            <div className="flex-1 flex items-center overflow-hidden relative">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-12 px-6">
                    {/* Duplicate list for seamless loop */}
                    {[...updates, ...updates].map((update, index) => (
                        <div key={index} className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base">
                            <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0"></span>

                            {update.important && (
                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded shadow-sm animate-pulse-slow">
                                    NEW
                                </span>
                            )}

                            <span className="opacity-95 font-medium tracking-wide">{update.text}</span>

                            {update.link && (
                                <a
                                    href={update.link}
                                    className="text-blue-200 hover:text-white underline decoration-blue-400 hover:decoration-white underline-offset-2 transition-colors font-semibold flex items-center gap-1"
                                    target={update.link.startsWith('http') ? '_blank' : '_self'}
                                    rel={update.link.startsWith('http') ? 'noopener noreferrer' : ''}
                                >
                                    Click here
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Add styled-jsx or plain CSS for marquee if tailwind config doesn't have it
// Assuming we need to add the animation in index.css if not present

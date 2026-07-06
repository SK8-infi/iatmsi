import { useState, useEffect } from 'react';
import { latestUpdates } from '../../data/latestUpdates';

export default function LatestUpdates() {
    const [updates, setUpdates] = useState([]);

    useEffect(() => {
        setUpdates(latestUpdates);
    }, []);

    if (!updates || updates.length === 0) return null;

    return (
        <div className="w-full bg-white border-b border-neutral-200 relative z-20 flex h-10 sm:h-12 overflow-hidden group shadow-sm">
            {/* Flat Label Block */}
            <div className="bg-primary-900 px-4 sm:px-6 flex items-center justify-center z-30 shrink-0 border-r border-primary-950">
                <span className="font-bold tracking-wider uppercase flex items-center gap-2.5 text-xs sm:text-sm text-white">
                    <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                    <span className="hidden sm:inline">Latest</span> Updates
                </span>
            </div>

            {/* Scrolling Content */}
            <div className="flex-1 flex items-center bg-white text-slate-800">
                <div className="animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap flex items-center gap-8 pl-6">
                    {/* Duplicate list for seamless loop */}
                    {[...updates, ...updates, ...updates].map((update, index) => (
                        <div key={index} className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                            {update.important && (
                                <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide">
                                    NEW
                                </span>
                            )}
                            
                            <span className="font-medium tracking-wide">{update.text}</span>
                            
                            {update.link && (
                                <a
                                    href={update.link}
                                    className="text-primary-700 hover:text-primary-600 transition-colors font-semibold ml-2 flex items-center gap-1 underline underline-offset-2 decoration-primary-300"
                                    target={update.link.startsWith('http') ? '_blank' : '_self'}
                                    rel={update.link.startsWith('http') ? 'noopener noreferrer' : ''}
                                >
                                    Read more &rarr;
                                </a>
                            )}
                            
                            {/* Simple Separator */}
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-6 sm:ml-8"></span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Add styled-jsx or plain CSS for marquee if tailwind config doesn't have it
// Assuming we need to add the animation in index.css if not present

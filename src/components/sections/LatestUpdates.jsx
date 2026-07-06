import { useState, useEffect } from 'react';
import { latestUpdates } from '../../data/latestUpdates';

export default function LatestUpdates() {
    const [updates, setUpdates] = useState([]);

    useEffect(() => {
        setUpdates(latestUpdates);
    }, []);

    if (!updates || updates.length === 0) return null;

    return (
        <div className="w-full bg-slate-900 border-y border-white/5 relative z-20 flex h-10 sm:h-12 overflow-hidden group">
            {/* Solid Label Block */}
            <div className="bg-blue-600 px-4 sm:px-6 flex items-center justify-center z-30 shrink-0 shadow-[4px_0_12px_rgba(0,0,0,0.5)]">
                <span className="font-bold text-white tracking-widest uppercase flex items-center gap-2.5 text-xs sm:text-sm">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    <span className="hidden sm:inline">Latest</span> Updates
                </span>
            </div>

            {/* Scrolling Content */}
            <div className="flex-1 flex items-center bg-slate-900 text-slate-200">
                <div className="animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap flex items-center gap-8 pl-6">
                    {/* Duplicate list for seamless loop */}
                    {[...updates, ...updates, ...updates].map((update, index) => (
                        <div key={index} className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                            {update.important && (
                                <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide">
                                    NEW
                                </span>
                            )}
                            
                            <span className="font-medium tracking-wide">{update.text}</span>
                            
                            {update.link && (
                                <a
                                    href={update.link}
                                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium ml-1"
                                    target={update.link.startsWith('http') ? '_blank' : '_self'}
                                    rel={update.link.startsWith('http') ? 'noopener noreferrer' : ''}
                                >
                                    Read more &rarr;
                                </a>
                            )}
                            
                            {/* Separator dot */}
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-600 ml-4 sm:ml-6"></span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Add styled-jsx or plain CSS for marquee if tailwind config doesn't have it
// Assuming we need to add the animation in index.css if not present

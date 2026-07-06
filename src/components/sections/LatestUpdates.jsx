import { useState, useEffect } from 'react';
import { latestUpdates } from '../../data/latestUpdates';

export default function LatestUpdates() {
    const [updates, setUpdates] = useState([]);

    useEffect(() => {
        setUpdates(latestUpdates);
    }, []);

    if (!updates || updates.length === 0) return null;

    return (
        <div className="w-full bg-[#0B1121] border-y border-white/10 relative z-20 flex h-10 sm:h-12 overflow-hidden group">
            {/* Elegant Label Block */}
            <div className="bg-[#111827] px-4 sm:px-8 flex items-center justify-center z-30 shrink-0 shadow-[8px_0_20px_rgba(0,0,0,0.8)] border-r border-white/5">
                <span className="font-bold tracking-[0.15em] uppercase flex items-center gap-3 text-xs sm:text-sm">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.6)]"></span>
                    <span className="bg-gradient-to-r from-amber-200 to-amber-500 text-transparent bg-clip-text">
                        <span className="hidden sm:inline">Latest</span> Updates
                    </span>
                </span>
            </div>

            {/* Scrolling Content */}
            <div className="flex-1 flex items-center bg-[#0B1121] text-slate-200">
                <div className="animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap flex items-center gap-8 pl-8">
                    {/* Duplicate list for seamless loop */}
                    {[...updates, ...updates, ...updates].map((update, index) => (
                        <div key={index} className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                            {update.important && (
                                <span className="bg-red-500/15 text-red-400 border border-red-500/30 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                                    NEW
                                </span>
                            )}
                            
                            <span className="font-medium tracking-wide text-slate-200">{update.text}</span>
                            
                            {update.link && (
                                <a
                                    href={update.link}
                                    className="text-amber-400 hover:text-amber-300 transition-colors font-semibold ml-2 flex items-center gap-1"
                                    target={update.link.startsWith('http') ? '_blank' : '_self'}
                                    rel={update.link.startsWith('http') ? 'noopener noreferrer' : ''}
                                >
                                    Read more &rarr;
                                </a>
                            )}
                            
                            {/* Elegant Separator */}
                            <span className="w-1 h-1 rounded-full bg-slate-600 ml-6 sm:ml-8"></span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Add styled-jsx or plain CSS for marquee if tailwind config doesn't have it
// Assuming we need to add the animation in index.css if not present

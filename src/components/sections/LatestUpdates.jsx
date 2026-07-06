import { useState, useEffect } from 'react';
import { latestUpdates } from '../../data/latestUpdates';

export default function LatestUpdates() {
    const [updates, setUpdates] = useState([]);

    useEffect(() => {
        setUpdates(latestUpdates);
    }, []);

    if (!updates || updates.length === 0) return null;

    return (
        <div className="w-full bg-slate-950 border-y border-white/5 relative z-20 overflow-hidden flex h-12 sm:h-14 shadow-xl group">
            
            {/* Left fade mask to smoothly hide text as it scrolls behind the label */}
            <div className="absolute left-0 top-0 bottom-0 w-48 sm:w-64 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent z-10 pointer-events-none"></div>

            {/* Right fade mask */}
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>

            {/* Modern Floating Label */}
            <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex items-center">
                <div className="bg-blue-500/10 backdrop-blur-md border border-blue-500/20 text-blue-300 px-3 sm:px-5 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                    <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="font-bold text-xs sm:text-sm uppercase tracking-widest">
                        <span className="hidden sm:inline">Latest</span> Updates
                    </span>
                </div>
            </div>

            {/* Scrolling Content */}
            <div className="flex-1 flex items-center overflow-hidden">
                <div className="animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap flex items-center gap-12 sm:gap-20 px-6 pl-56 sm:pl-72">
                    {/* Duplicate list for seamless loop */}
                    {[...updates, ...updates, ...updates].map((update, index) => (
                        <div key={index} className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40 shrink-0"></span>

                            {update.important && (
                                <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse-slow">
                                    NEW
                                </span>
                            )}

                            <span className="text-slate-300 font-medium tracking-wide">{update.text}</span>

                            {update.link && (
                                <a
                                    href={update.link}
                                    className="text-blue-400 hover:text-blue-300 underline decoration-blue-500/30 hover:decoration-blue-400 underline-offset-4 transition-colors font-medium flex items-center gap-1.5"
                                    target={update.link.startsWith('http') ? '_blank' : '_self'}
                                    rel={update.link.startsWith('http') ? 'noopener noreferrer' : ''}
                                >
                                    Read more
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

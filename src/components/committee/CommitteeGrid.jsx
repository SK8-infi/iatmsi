import Card from '../ui/Card';

export default function CommitteeGrid({ title, members, layout = 'grid', variant = 'default', startIndex = 0, columns }) {
    const isLeadership = variant === 'leadership';

    // White Theme + Dark Text (Default) with conditional Logic
    const cardStyle = isLeadership
        ? "shadow-lg" // Base foundation, colors applied individually; no animation
        : "bg-white border border-primary-700 shadow-sm transition-shadow duration-300";

    if (layout === 'horizontal') {
        // Specifically for Patron: Centered content, wider card
        const member = members; // Should be single object
        return (
            <div className="mb-4 w-full flex flex-col items-center">
                {title && (
                    <h3 className="text-xl font-bold font-bold text-neutral-900 mb-6 text-center">
                        {title}
                    </h3>
                )}
                <div
                    className={`${cardStyle} rounded-3xl p-8 flex flex-col items-center gap-6 text-center max-w-3xl w-full ${isLeadership ? 'bg-gradient-to-br from-teal-600 to-teal-800 border-none shadow-[0_10px_30px_rgba(13,148,136,0.3)]' : 'border-primary-700'}`}
                    style={{ minHeight: '320px' }}
                >
                    {/* Centered Image - square for leadership */}
                    <div
                        className={`flex items-center justify-center font-bold overflow-hidden shadow-inner flex-shrink-0 ${isLeadership ? 'rounded-lg bg-white/20 text-white border-2 border-white/30' : 'rounded-full bg-primary-50 text-primary-300 border border-primary-100'}`}
                        style={{
                            width: '220px',
                            height: '220px',
                            fontSize: '3.5rem',
                        }}
                    >
                        {member.image ? (
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                            getInitials(member.name)
                        )}
                    </div>
                    {/* Centered Text */}
                    <div className="flex-grow flex flex-col items-center">
                        <h4 className={`font-bold mb-2 text-base md:text-base ${isLeadership ? '!text-white' : 'text-neutral-900'}`}>{member.name}</h4>
                        {member.designation && (
                            <p className={`font-bold mb-3 text-base md:text-base ${isLeadership ? '!text-white' : 'text-primary-700'}`}>{member.designation}</p>
                        )}
                        {member.affiliation && (
                            <p className={`text-base md:text-base leading-relaxed ${isLeadership ? '!text-white' : 'text-neutral-500'}`}>{member.affiliation}</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (layout === 'single') {
        const member = members;
        return (
            <div className="mb-0 w-full h-full flex flex-col">
                <h3 className="text-base md:text-xl font-bold font-semibold text-neutral-900 mb-2 md:mb-4 pb-1 md:pb-2 border-b border-primary-200 min-h-[4rem] md:min-h-[4.5rem] flex items-end justify-center text-center">
                    {title}
                </h3>

                {/* Responsive Width: Scales with grid container */}
                <div
                    className={`w-full overflow-hidden ${cardStyle} flex-grow flex flex-col justify-center`}
                    style={{
                        borderRadius: 'clamp(1rem, 3vw, 2rem)',
                        // No max-width restriction to fill the grid cell
                    }}
                >
                    <div
                        className="flex flex-col items-center text-center"
                        style={{
                            padding: 'clamp(1rem, 3vw, 2rem)',
                            gap: 'clamp(0.5rem, 2vw, 1rem)'
                        }}
                    >
                        {/* Round Image: Relative Size */}
                        <div
                            className="bg-primary-50 rounded-full flex items-center justify-center text-primary-300 font-bold overflow-hidden shadow-inner border border-primary-100"
                            style={{
                                width: 'clamp(5rem, 22vw, 10.5rem)',
                                height: 'clamp(5rem, 22vw, 10.5rem)',
                                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                                borderRadius: '50%'
                            }}
                        >
                            {member.image ? (
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                                getInitials(member.name)
                            )}
                        </div>
                        <div className="w-full">
                            <h4 className="font-bold text-neutral-900 mb-0.5" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)' }}>{member.name}</h4>
                            {member.designation && (
                                <p className="text-primary-700 font-semibold mb-0.5" style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}>{member.designation}</p>
                            )}
                            {member.affiliation && (
                                <p className="text-neutral-500 mb-1 leading-tight" style={{ fontSize: 'clamp(0.875rem, 1.8vw, 0.9rem)' }}>{member.affiliation}</p>
                            )}
                            {member.email && (
                                <a
                                    href={`mailto:${member.email}`}
                                    className="text-primary-600 hover:text-primary-800 inline-flex items-center gap-1 break-all justify-center"
                                    style={{ fontSize: 'clamp(0.875rem, 1.8vw, 0.9rem)' }}
                                >
                                    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    {member.email}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-4 w-full">
            {title && (
                <h3 className="text-xl font-bold font-bold text-neutral-900 mb-6 text-center">
                    {title}
                </h3>
            )}
            {/* Flex or grid container */}
            <div className="w-full">
                <div
                    className={columns === 2
                        ? 'grid grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto justify-items-center'
                        : columns === 3
                            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-items-center'
                            : 'flex flex-wrap justify-center'
                    }
                    style={{
                        contain: 'layout paint',
                        ...(columns !== 2 && columns !== 3 ? { gap: 'clamp(0.5rem, 2vw, 1.5rem)', width: '100%' } : {})
                    }}
                >
                    {members.map((member, i) => {
                        const index = startIndex + i;
                        // Leadership: static card colors, no hover animation
                        const leadershipColors = [
                            'from-teal-600 to-teal-800 border-teal-400/30',
                            'from-cyan-600 to-cyan-800 border-cyan-400/30',
                            'from-slate-600 to-slate-700 border-slate-400/30',
                            'from-emerald-600 to-emerald-800 border-emerald-400/30',
                        ];
                        const leadershipStyle = isLeadership ? leadershipColors[index % leadershipColors.length] : '';

                        return (
                            <div
                                key={i}
                                className={`flex flex-col items-center text-center min-w-0 overflow-hidden
                                ${columns === 2 ? 'w-full max-w-[280px]' : columns === 3 ? 'w-full max-w-[320px] justify-self-center' : 'w-full min-w-[260px] sm:w-[48%] lg:w-[300px] flex-shrink-0'}
                                ${isLeadership
                                        ? `rounded-2xl border-2 bg-gradient-to-br ${leadershipStyle} shadow-[0_8px_24px_rgba(0,0,0,0.12)]`
                                        : 'bg-white border border-primary-700 hover:shadow-md transition-shadow duration-300 rounded-2xl'
                                    }`}
                                style={{
                                    minHeight: isLeadership ? '280px' : '220px',
                                    ...(isLeadership ? {} : { padding: '1rem 0.25rem', gap: '0.5rem' })
                                }}
                            >
                                {isLeadership ? (
                                    <>
                                        {/* Top: gradient + square image + name */}
                                        <div className={`w-full bg-gradient-to-br ${leadershipStyle} pt-5 px-4 pb-4 flex flex-col items-center gap-3`}>
                                            <div
                                                className="rounded-lg flex items-center justify-center font-semibold shrink-0 overflow-hidden bg-white/10 border-2 border-white/20 shadow-inner"
                                                style={{
                                                    width: 'clamp(7rem, 18vw, 11rem)',
                                                    height: 'clamp(7rem, 18vw, 11rem)',
                                                    fontSize: '2rem',
                                                }}
                                            >
                                                {member.image ? (
                                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    getInitials(member.name)
                                                )}
                                            </div>
                                            <h4 className="font-bold text-base md:text-lg font-bold !text-white leading-tight">
                                                {member.name}
                                            </h4>
                                        </div>
                                        {/* Bottom: white strip for designation / affiliation */}
                                        <div className="w-full bg-white py-4 px-3 flex flex-col items-center gap-1 flex-grow">
                                            {member.designation && (
                                                <p className="font-bold text-neutral-900 text-sm md:text-base">
                                                    {member.designation}
                                                </p>
                                            )}
                                            {member.affiliation && (
                                                <p className="text-neutral-500 text-xs md:text-sm leading-snug line-clamp-2 text-center">
                                                    {member.affiliation}
                                                </p>
                                            )}
                                            {member.email && (
                                                <a href={`mailto:${member.email}`} className="truncate text-primary-600 hover:text-primary-800 text-xs font-medium mt-1">
                                                    {member.email}
                                                </a>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className="rounded-full flex items-center justify-center font-semibold shrink-0 overflow-hidden shadow-inner bg-primary-50 text-primary-300 border border-primary-100"
                                            style={{
                                                width: 'clamp(3rem, 12vw, 7rem)',
                                                height: 'clamp(3rem, 12vw, 7rem)',
                                                fontSize: 'clamp(0.875rem, 2vw, 1.5rem)',
                                                borderRadius: '50%'
                                            }}
                                        >
                                            {member.image ? (
                                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                            ) : (
                                                getInitials(member.name)
                                            )}
                                        </div>
                                        <div className="min-w-0 w-full flex flex-col items-center flex-grow">
                                            <h4 className="font-bold mb-1 leading-tight text-neutral-900 text-lg font-bold">
                                                {member.name}
                                            </h4>
                                            {member.affiliation && (
                                                <p className="leading-snug mb-2 line-clamp-2 text-neutral-500 text-sm">
                                                    {member.affiliation}
                                                </p>
                                            )}
                                            <div className="mt-auto">
                                                {member.email && (
                                                    <a href={`mailto:${member.email}`} className="truncate block hover:underline font-medium text-primary-600 hover:text-primary-800 text-sm">
                                                        {member.email}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function getInitials(name) {
    if (!name) return '';
    return name
        .split(' ')
        .filter(word => !['Dr.', 'Prof.', 'Mr.', 'Mrs.', 'Ms.'].includes(word))
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

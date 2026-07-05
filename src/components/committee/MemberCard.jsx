export default function MemberCard({ member }) {
    const initials = member.name === 'TBD'
        ? '?'
        : member.name
            .split(' ')
            .filter(n => !['Dr.', 'Prof.', 'Mr.', 'Ms.', 'Mrs.'].includes(n))
            .map(n => n.charAt(0))
            .join('')
            .slice(0, 2);

    return (
        <div className="flex-1 w-full min-w-[240px] max-w-[260px] bg-white rounded-xl shadow-sm border border-neutral-100 p-4 xl:p-5 text-center hover:shadow-md transition-shadow flex flex-col items-center justify-start">
            {/* Avatar */}
            {member.profileUrl ? (
                <a href={member.profileUrl} target="_blank" rel="noopener noreferrer" className="block relative group flex-shrink-0">
                    <div
                        className="w-20 h-20 xl:w-24 xl:h-24 rounded-2xl mb-3 mx-auto flex items-center justify-center text-base xl:text-base font-bold text-white shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105 bg-primary-800"
                    >
                        {member.image ? (
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            initials
                        )}
                    </div>
                </a>
            ) : (
                <div
                    className="w-20 h-20 xl:w-24 xl:h-24 rounded-2xl mb-3 mx-auto flex items-center justify-center text-base xl:text-base font-bold text-white shadow-md overflow-hidden flex-shrink-0 bg-primary-800"
                >
                    {member.image ? (
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        initials
                    )}
                </div>
            )}

            {/* Details */}
            <div className="flex flex-col flex-grow items-center justify-start w-full">
                <h3 className="text-base xl:text-xl font-bold font-bold text-neutral-900 leading-snug mb-1 text-center w-full">
                    {member.profileUrl ? (
                        <a href={member.profileUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary-700 transition-colors">
                            {member.name}
                        </a>
                    ) : (
                        member.name
                    )}
                </h3>

                {member.designation && (
                    <p className="text-primary-700 text-xs xl:text-sm font-semibold mb-1 text-center w-full">
                        {member.designation}
                    </p>
                )}

                {member.affiliation && (
                    <p className="text-neutral-500 text-xs xl:text-sm leading-tight text-center w-full">
                        {member.affiliation}
                    </p>
                )}

                {member.email && (
                    <a
                        href={`mailto:${member.email}`}
                        className="mt-2 text-primary-600 hover:text-primary-800 text-xs inline-flex items-center gap-1 transition-colors"
                    >
                        <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="truncate">{member.email}</span>
                    </a>
                )}
            </div>
        </div>
    );
}

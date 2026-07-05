import Card from '../ui/Card';

export default function TrackCard({ track, variant = 'default', index }) {
    // Generate a formatted ID based on variant and index
    const prefix = variant === 'functional' ? 'F' : variant === 'specialized' ? 'S' : 'T';
    const formattedId = `${prefix}-${String(index + 1).padStart(2, '0')}`;

    const accents = {
        default: 'border-primary-500',
        functional: 'border-blue-600',
        specialized: 'border-indigo-500',
    };

    // Icon container colors
    const iconColors = {
        default: 'bg-primary-50 text-primary-600',
        functional: 'bg-blue-50 text-blue-700',
        specialized: 'bg-indigo-50 text-indigo-700',
    };

    return (
        <Card className={`relative h-full transition-all duration-300 hover:shadow-lg hover:border-primary-300 border-b-4 ${accents[variant]} border-t-0 border-x-0 rounded-lg bg-white group overflow-hidden`}>
            <div className="p-3">
                {/* Header: Icon */}
                <div className="mb-2">
                    {/* Unique Icon */}
                    <div className={`inline-block p-1 rounded-xl ${iconColors[variant]} transition-colors duration-300 flex-shrink-0`}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={track.icon || "M13 10V3L4 14h7v7l9-11h-7z"} />
                        </svg>
                    </div>
                </div>

                {/* Content */}
                <div className="w-full pl-[5px]">
                    <h3 className={`text-base sm:text-base font-bold text-gray-900 mb-2 leading-tight group-hover:text-primary-800 transition-colors ${track.id === 'innovation' ? 'break-words' : ''
                        }`}>
                        Track-{track.number || index + 1}: {track.title}
                    </h3>
                    <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {Array.isArray(track.description) ? (
                            <ul className="list-disc pl-5 mt-2 space-y-1.5">
                                {track.description.map((point, idx) => (
                                    <li key={idx} className="pl-1 text-gray-700">{point}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>{track.description}</p>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}

import Card from '../ui/Card';

export default function JournalCard({ journal }) {
    return (
        <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary-400 border border-gray-100 rounded-2xl bg-white p-6 group h-full">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Visual Accent - Icon */}
                <div className="shrink-0">
                    <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-700 transition-transform duration-500 group-hover:rotate-6">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={journal.icon || "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"} />
                        </svg>
                    </div>
                </div>

                {/* Details */}
                <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-primary-600 uppercase tracking-[0.2em]">
                            {journal.publisher} Publisher
                        </span>
                    </div>

                    <h3 className="text-xl font-bold font-bold text-gray-900 leading-snug group-hover:text-primary-800 transition-colors">
                        {journal.name}
                    </h3>

                    {/* Indexing badges */}
                    {journal.indexing && journal.indexing.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                            {journal.indexing.map((idx, i) => (
                                <span
                                    key={i}
                                    className="px-2.5 py-1 bg-gray-50 text-gray-600 text-[9px] font-bold rounded-md border border-gray-200 uppercase tracking-wider"
                                >
                                    {idx}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}

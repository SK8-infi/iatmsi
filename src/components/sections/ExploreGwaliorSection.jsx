import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { attractions } from '../../data/travelData';

export default function ExploreGwaliorSection() {
    return (
        <>
            

            <SectionContainer background="white">
                <div className="max-w-5xl mx-auto space-y-12">
                    {/* Intro */}
                    <div className="prose prose max-w-none text-slate-600 text-center">
                        <p className="text-base leading-relaxed max-w-3xl mx-auto">
                            Gwalior, known as the <strong className="text-blue-700">City of Music</strong> and one of the most historic cities in central India, offers conference attendees a chance to explore centuries of royal heritage, stunning architecture, and vibrant culture - all within easy reach of the ABV-IIITM campus.
                        </p>
                    </div>

                    {/* Attractions Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {attractions.map((attraction, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                            >
                                {/* Attraction Image */}
                                <div className="h-52 overflow-hidden">
                                    <img
                                        src={attraction.image}
                                        alt={attraction.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-3">
                                    <div>
                                        <h3 className="text-xl font-bold font-black text-slate-900 mb-1">{attraction.name}</h3>
                                        <p className="text-blue-600 text-sm font-semibold italic">{attraction.tagline}</p>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed">{attraction.description}</p>
                                    <div className="pt-2">
                                        <span className="inline-block px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-xs font-bold text-blue-700">
                                            {attraction.highlight}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Travel Tip */}
                    <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100 text-center">
                        <h3 className="font-bold text-blue-900 text-xl font-bold mb-2">Need help planning your visit?</h3>
                        <p className="text-blue-800 text-sm max-w-2xl mx-auto">
                            The conference organizing committee will be happy to assist you with local travel recommendations during the event. An information desk will be available at the registration counter.
                        </p>
                    </div>
                </div>
            </SectionContainer>
        </>
    );
}

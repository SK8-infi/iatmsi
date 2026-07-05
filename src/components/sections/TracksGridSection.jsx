import { tracks } from '../../data/tracksData';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import TrackCard from '../tracks/TrackCard';

export default function TracksGridSection() {
    return (
        <SectionContainer background="white" className="border-b border-gray-100">
            <SectionHeader
                title="Technical Tracks"
                subtitle="The conference is organized across multiple technical tracks and parallel sessions"
                centered={true}
            />
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {tracks.map((track, index) => (
                        <TrackCard key={track.id} track={track} variant="functional" index={index} />
                    ))}
                </div>
            </div>
        </SectionContainer>
    );
}

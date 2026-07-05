import AboutRationaleSection from '../components/sections/AboutRationaleSection';
import AboutObjectivesSection from '../components/sections/AboutObjectivesSection';
import TracksGridSection from '../components/sections/TracksGridSection';
import SubmissionCtaSection from '../components/sections/SubmissionCtaSection';
import CallForReviewersSection from '../components/sections/CallForReviewersSection';
import CommitteeSection from '../components/sections/CommitteeSection';
import ContactSection from '../components/sections/ContactSection';
import ExploreGwaliorSection from '../components/sections/ExploreGwaliorSection';
import ImportantDatesSection from '../components/sections/ImportantDatesSection';
import PaperSubmissionSection from '../components/sections/PaperSubmissionSection';
import RegistrationSection from '../components/sections/RegistrationSection';
import TravelVisaSection from '../components/sections/TravelVisaSection';
import VenueDirectionsSection from '../components/sections/VenueDirectionsSection';
import HeroSection from '../components/sections/HeroSection';
import IntroSection from '../components/sections/IntroSection';
import AboutInstitute from '../components/sections/AboutInstitute';

// Temporary inline component for Divider
function Divider() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <hr className="border-t-2 border-neutral-200" />
        </div>
    );
}

export const sectionResolver = {
    hero: HeroSection,
    intro: IntroSection,
    aboutInstitute: AboutInstitute,
    divider: Divider,
    aboutRationaleSection: AboutRationaleSection,
    aboutObjectivesSection: AboutObjectivesSection,
    callForReviewersSection: CallForReviewersSection,
    committeeSection: CommitteeSection,
    contactSection: ContactSection,
    exploreGwaliorSection: ExploreGwaliorSection,
    importantDatesSection: ImportantDatesSection,
    paperSubmissionSection: PaperSubmissionSection,
    registrationSection: RegistrationSection,
    tracksGridSection: TracksGridSection,
    submissionCtaSection: SubmissionCtaSection,
    travelVisaSection: TravelVisaSection,
    venueDirectionsSection: VenueDirectionsSection,
};

// Page Registry — IATMSI-2027

export const sectionManifest = [
    { id: 'hero', component: 'HeroSection', requiresData: ['heroData'] },
    { id: 'intro', component: 'IntroSection', requiresData: ['conferenceData'] },
    { id: 'aboutInstitute', component: 'AboutInstitute', requiresData: ['conferenceData'] },
    { id: 'divider', component: 'Divider', requiresData: [] },
];

export const pageRegistry = [
    {
        id: 'home',
        title: 'Home',
        path: '/',
        sections: [
            { sectionId: 'hero', props: { isHomePage: true } },
            { sectionId: 'intro', props: {} },
            { sectionId: 'divider', props: {} },
            { sectionId: 'aboutInstitute', props: {} },
        ]
    }
,
    {
        id: 'about',
        title: 'About the Conference',
        path: '/about',
        sections: [
            { sectionId: 'hero', props: { title: "About the Conference", subtitle: `Learn more about IATMSI-2027 and our vision for green and sustainable technologies.` } },
            { sectionId: 'aboutRationaleSection', props: {} },
            { sectionId: 'aboutObjectivesSection', props: {} }
        ]
    },
    {
        id: 'call-for-reviewers',
        title: 'Call for Reviewers',
        path: '/call-for-reviewers',
        sections: [
            { sectionId: 'hero', props: { title: "Call for Reviewers", subtitle: `` } },
            { sectionId: 'callForReviewersSection', props: {} }
        ]
    },
    {
        id: 'committee',
        title: 'Organizing Committee',
        path: '/committee',
        sections: [
            { sectionId: 'hero', props: { title: "Organizing Committee", subtitle: `Meet the distinguished organizing committee of IATMSI-2027.` } },
            { sectionId: 'committeeSection', props: {} }
        ]
    },
    {
        id: 'contact',
        title: 'Contact Us',
        path: '/contact',
        sections: [
            { sectionId: 'hero', props: { title: "Contact Us", subtitle: `Get in touch with the IATMSI-2027 organizing committee.` } },
            { sectionId: 'contactSection', props: {} }
        ]
    },
    {
        id: 'explore-gwalior',
        title: 'Explore Gwalior',
        path: '/travel/explore-gwalior',
        sections: [
            { sectionId: 'hero', props: { title: "Explore Gwalior", subtitle: `Discover the rich heritage and culture of the City of Music` } },
            { sectionId: 'exploreGwaliorSection', props: {} }
        ]
    },
    {
        id: 'important-dates',
        title: 'Important Dates',
        path: '/important-dates',
        sections: [
            { sectionId: 'hero', props: { title: "Important Dates", subtitle: `Mark your calendar with these key deadlines and dates for IATMSI-2027.` } },
            { sectionId: 'importantDatesSection', props: {} }
        ]
    },
    {
        id: 'paper-submission',
        title: 'Paper Submission & Camera-Ready',
        path: '/call-for-papers/paper-submission',
        sections: [
            { sectionId: 'hero', props: { title: "Paper Submission & Camera-Ready", subtitle: `Everything you need from initial submission to final upload` } },
            { sectionId: 'paperSubmissionSection', props: {} }
        ]
    },
    {
        id: 'registration',
        title: 'Registration',
        path: '/registration',
        sections: [
            { sectionId: 'hero', props: { title: "Registration", subtitle: `Register for IATMSI-2027 and secure your participation in this premier international conference.` } },
            { sectionId: 'registrationSection', props: {} }
        ]
    },
    {
        id: 'tracks',
        title: 'Call for Papers',
        path: '/call-for-papers/tracks',
        sections: [
            { sectionId: 'hero', props: { title: "Call for Papers", subtitle: `Submit your research across our technical tracks covering green and sustainable technologies.` } },
            { sectionId: 'tracksGridSection', props: {} },
            { sectionId: 'submissionCtaSection', props: {} }
        ]
    },
    {
        id: 'travel-visa',
        title: 'Travel Visa Information',
        path: '/travel/visa',
        sections: [
            { sectionId: 'hero', props: { title: "Travel Visa Information", subtitle: `Complete visa guidance for IATMSI-2027 international attendees` } },
            { sectionId: 'travelVisaSection', props: {} }
        ]
    },
    {
        id: 'venue-directions',
        title: 'Venue & Directions',
        path: '/travel/venue',
        sections: [
            { sectionId: 'hero', props: { title: "Venue & Directions", subtitle: `How to reach ABV-IIITM, Gwalior for IATMSI-2027` } },
            { sectionId: 'venueDirectionsSection', props: {} }
        ]
    }
];

// Route constants for the application
export const ROUTES = {
    HOME: '/',
    ABOUT: '/about',
    TRACKS: '/call-for-papers/tracks',
    IMPORTANT_DATES: '/important-dates',
    CALL_FOR_REVIEWERS: '/call-for-reviewers',
    REGISTRATION: '/registration',
    TRAVEL_VISA: '/travel/visa',
    TRAVEL_VENUE: '/travel/venue',
    TRAVEL_EXPLORE: '/travel/explore-gwalior',
    // Single source of truth for author submission instructions (submission + camera-ready)
    PAPER_SUBMISSION: '/call-for-papers/paper-submission',
    COMMITTEE: '/committee',
    CONTACT: '/contact',
};

// Navigation items in required order
export const NAV_ITEMS = [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'About', path: ROUTES.ABOUT },
    { label: 'Paper Submission', path: ROUTES.PAPER_SUBMISSION },
    { label: 'Registration', path: ROUTES.REGISTRATION },
    { label: 'Committee', path: ROUTES.COMMITTEE },
    { label: 'Contact Us', path: ROUTES.CONTACT },
];

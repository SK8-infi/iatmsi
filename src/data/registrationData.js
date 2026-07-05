// Registration data - ICGST-2026

export const feeStructure = [
    {
        category: 'Student (UG/PG/PhD)',
        earlyBirdIndian: '₹ 5,000',
        earlyBirdForeign: '$100',
        regularIndian: '₹ 7,000',
        regularForeign: '$125',
    },
    {
        category: 'Post-Doc/Faculty/Academician',
        earlyBirdIndian: '₹ 6,000',
        earlyBirdForeign: '$125',
        regularIndian: '₹ 8,000',
        regularForeign: '$150',
    },
    {
        category: 'Industry Professional',
        earlyBirdIndian: '₹ 7,000',
        earlyBirdForeign: '$150',
        regularIndian: '₹ 9,000',
        regularForeign: '$175',
    },
    {
        category: 'Additional Page Charges',
        earlyBirdIndian: '₹ 1,000',
        earlyBirdForeign: '$20',
        regularIndian: '₹ 1,000',
        regularForeign: '$20',
    },
];

export const registrationNotes = [
    'Registration charges are inclusive of GST and exclusive of transaction/foreign remittance charges.',
];

export const registrationProcess = [
    {
        step: 1,
        title: "Paper Submission",
        description: "Submit your research paper through the conference portal.",
        icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    },
    {
        step: 2,
        title: "Peer Review",
        description: "Your paper will undergo peer review by domain experts.",
        icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
        step: 3,
        title: "Registration & Payment",
        description: "Upon acceptance, complete registration and fee payment.",
        icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    },
    {
        step: 4,
        title: "Confirmation",
        description: "Receive your official registration confirmation and receipt.",
        icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
    }
];

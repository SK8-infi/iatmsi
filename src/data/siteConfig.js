// Site configuration — ICGST-2026

export const siteConfig = {
  // SEO & HTML <head>
  seo: {
    title: 'ICGST-2026 | International Conference on Green and Sustainable Technologies',
    description: 'ICGST-2026 - International Conference on Green and Sustainable Technologies. 23-25 October 2026 at ABV-IIITM, Gwalior, India.',
    keywords: 'ICGST-2026, green technology, sustainable technology, academic conference, ABV-IIITM, Gwalior, green manufacturing, electric vehicles, clean energy, circular economy',
    author: 'ABV-IIITM, Gwalior',
    favicon: '/favicon.svg',
  },

  // Branding
  branding: {
    conferenceLogo: 'https://lh3.googleusercontent.com/d/1jeOsrAKIcerD_kLKSwFJ6JAWT_OfBEgG',
    instituteLogo: 'https://lh3.googleusercontent.com/d/1LNtqXOXfvsyYZaclWSc2QM-yzpxov1vw',
    instituteName: 'Atal Bihari Vajpayee Indian Institute of Information Technology and Management, Gwalior',
    instituteUrl: 'https://iiitm.ac.in',
  },

  // External service links
  externalLinks: {
    submissionPortal: {
      name: 'Microsoft CMT',
      url: 'https://cmt3.research.microsoft.com/ICGST2026/Submission/Index',
    },
    reviewerForm: {
      name: 'Google Forms',
      url: 'https://forms.gle/MncU6Pxa2GuY5bpP8',
    },
    paperTemplate: {
      name: 'IEEE Manuscript Template',
      url: 'https://www.ieee.org/conferences/publishing/templates.html',
    },
    pdfExpress: {
      name: 'IEEE PDF eXpress',
      url: 'https://ieee-pdf-express.org/',
    },
  },

  // Footer acknowledgments (e.g., CMT disclaimer)
  acknowledgments: [
    'The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.'
  ],
};

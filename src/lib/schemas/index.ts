export const WEBSITE_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Dhaifallah Alfarawi Portfolio",
    "url": "https://devdhaif.vercel.app/",
    "author": {
        "@type": "Person",
        "name": "Dhaifallah Alfarawi",
        "alternateName": ["ضيف الله الفروي", "Devdhaif"],
        "sameAs": [
            "https://github.com/DevDhaif",
            "https://linkedin.com/in/devdhaif"
        ]
    }
} as const;

export const PERSON_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dhaifallah Alfarawi",
    "alternateName": [
        "ضيف الله الفروي",
        "ضيف الله أحمد الفروي",
        "Dhaifallah Ahmed Alfarawi",
        "Devdhaif"
    ],
    "givenName": "Dhaifallah",
    "familyName": "Alfarawi",
    "jobTitle": "Front End Developer",
    "description": "Front End Developer specializing in React, Next.js, TypeScript, and Laravel. Based in Riyadh, Saudi Arabia.",
    "url": "https://devdhaif.vercel.app/",
    "image": "https://devdhaif.vercel.app/og-image.png",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Riyadh",
        "addressCountry": "SA"
    },
    "sameAs": [
        "https://github.com/DevDhaif",
        "https://linkedin.com/in/devdhaif"
    ],
    "knowsLanguage": ["en", "ar"],
    "knowsAbout": [
        "Web Development",
        "React",
        "Next.js",
        "TypeScript",
        "Laravel",
        "Tailwind CSS",
        "Full Stack Development",
        "Frontend Architecture",
        "SEO"
    ]
} as const;
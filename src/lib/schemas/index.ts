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
    "alternateName": ["ضيف الله الفروي", "Devdhaif"],
    "jobTitle": "Full Stack Developer",
    "url": "https://devdhaif.vercel.app/",
    "sameAs": [
        "https://github.com/DevDhaif",
        "https://linkedin.com/in/devdhaif"
    ],
    "knowsAbout": [
        "Web Development",
        "React",
        "Next.js",
        "TypeScript",
        "Laravel",
        "Full Stack Development"
    ]
} as const;
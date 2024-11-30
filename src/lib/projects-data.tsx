// src/lib/projects-data.ts
import { Project } from './types';

export const projectsData: Project[] = [
    {
        id: "neelaincom",
        name: "NeelainCom",
        description: "A Q&A platform similar to StackOverflow for college community knowledge sharing.",
        longDescription: `
      Developed a comprehensive Q&A platform for my college community, facilitating knowledge sharing
      among approximately 1000 users. The platform features a sophisticated voting system and
      multi-level user roles for effective community management.
    `,
        mainImage: "/images/projects/neelaincom/main.jpg", // You'll need to add actual images
        images: [
            {
                url: "/images/projects/neelaincom/voting.jpg",
                alt: "Voting system interface"
            },
            {
                url: "/images/projects/neelaincom/dashboard.jpg",
                alt: "Admin dashboard"
            }
        ],
        skills: ["Laravel", "Vue.js", "MySQL", "Tailwind CSS"],
        highlights: [
            "Developed a scalable voting system handling 90 votes per minute",
            "Implemented 2-level user role system (admin, user)",
            "Built for a community of 1000+ users",
            "Created an intuitive interface for asking and answering questions"
        ],
        githubUrl: "https://github.com/yourusername/neelaincom"
    },
    {
        id: "sadagaat-dashboard",
        name: "Sadagaat Dashboard",
        description: "A comprehensive admin dashboard for a UK-based charitable organization, enabling complete website management and content control.",
        longDescription: `
          Developed a feature-rich administrative dashboard for managing all aspects of the organization's 
          web presence. The system includes multiple pages for managing programs, users, events, news, 
          and transactions, with advanced features like multi-step forms, data filtering, and media handling.
        `,
        mainImage: "/images/projects/sadagaat/main.jpg",
        images: [
            {
                url: "/images/projects/sadagaat/dashboard.jpg",
                alt: "Main dashboard interface"
            },
            {
                url: "/images/projects/sadagaat/programs.jpg",
                alt: "Programs management"
            },
            {
                url: "/images/projects/sadagaat/media.jpg",
                alt: "Media management"
            }
        ],
        skills: ["React.js", "TypeScript", "Material UI", "Redux", "React Query", "React Hook Form"],
        highlights: [
            "Built 10+ administrative pages for complete website management",
            "Implemented multi-step forms with validation for complex data entry",
            "Created reusable components and custom hooks for consistent functionality",
            "Developed advanced filtering and search functionality",
            "Integrated maps and media handling capabilities"
        ],
        githubUrl: "https://github.com/devdhaif/sadagaat-dashboard"
    },
    {
        id: "sadagaat-dashboard2",
        name: "Sadagaat Dashboard",
        description: "A comprehensive admin dashboard with multiple user roles and functionalities.",
        longDescription: `
      Developed a fully functional dashboard for website administrators and various user roles,
      focusing on reusable components and efficient state management.
    `,
        mainImage: "/images/projects/sadagaat/main.jpg",
        images: [
            {
                url: "/images/projects/sadagaat/dashboard.jpg",
                alt: "Main dashboard view"
            },
            {
                url: "/images/projects/sadagaat/users.jpg",
                alt: "User management interface"
            }
        ],
        skills: ["React.js", "TypeScript", "Material UI", "Redux"],
        highlights: [
            "Created reusable components for consistent UI",
            "Implemented role-based access control",
            "Built responsive admin interface",
            "Integrated real-time data updates"
        ]
    },
    {
        id: "house-marketplace",
        name: "House Marketplace",
        description: "A real estate web application for property listings with interactive maps.",
        mainImage: "/images/projects/house-marketplace/main.jpg",
        images: [
            {
                url: "/images/projects/house-marketplace/listings.jpg",
                alt: "Property listings page"
            },
            {
                url: "/images/projects/house-marketplace/map.jpg",
                alt: "Interactive map view"
            }
        ],
        skills: ["React.js", "Firebase", "Leaflet", "Tailwind CSS"],
        highlights: [
            "Implemented user authentication with email and Google sign-in",
            "Integrated interactive maps using Leaflet",
            "Created filtering system for properties",
            "Built responsive property listing pages"
        ],
        githubUrl: "https://github.com/yourusername/house-marketplace"
    },
    {
        id: "food-menu",
        name: "Food Menu App",
        description: "A scalable restaurant menu application with admin dashboard.",
        mainImage: "/images/projects/food-menu/main.jpg",
        images: [
            {
                url: "/images/projects/food-menu/menu.jpg",
                alt: "Menu interface"
            },
            {
                url: "/images/projects/food-menu/admin.jpg",
                alt: "Admin dashboard"
            }
        ],
        skills: ["Next.js", "Firebase", "Tailwind CSS"],
        highlights: [
            "Built responsive menu interface",
            "Created admin dashboard for menu management",
            "Implemented review system",
            "Optimized for fast performance"
        ],
        githubUrl: "https://github.com/yourusername/food-menu"
    },
    {
        id: "chat-app",
        name: "Real-time Chat App",
        description: "A WhatsApp-like chat application with real-time messaging.",
        mainImage: "/images/projects/chat/main.jpg",
        images: [
            {
                url: "/images/projects/chat/chat.jpg",
                alt: "Chat interface"
            },
            {
                url: "/images/projects/chat/profile.jpg",
                alt: "User profile"
            }
        ],
        skills: ["Vue.js", "Firebase", "Tailwind CSS"],
        highlights: [
            "Implemented real-time messaging",
            "Created intuitive chat interface",
            "Built user authentication system",
            "Added message status indicators"
        ],
        githubUrl: "https://github.com/yourusername/chat-app"
    },
    {
        id: "ecommerce-store",
        name: "E-commerce Store",
        description: "A full-featured e-commerce web application with shopping cart functionality.",
        mainImage: "/images/projects/ecommerce/main.jpg",
        images: [
            {
                url: "/images/projects/ecommerce/products.jpg",
                alt: "Products page"
            },
            {
                url: "/images/projects/ecommerce/cart.jpg",
                alt: "Shopping cart"
            }
        ],
        skills: ["React.js", "Redux", "Node.js", "MongoDB"],
        highlights: [
            "Implemented shopping cart functionality",
            "Created efficient state management system",
            "Built responsive product catalog",
            "Integrated secure payment processing"
        ],
        githubUrl: "https://github.com/yourusername/ecommerce-store"
    }
];
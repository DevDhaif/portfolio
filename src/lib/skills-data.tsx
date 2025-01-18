import { Backpack, Camera, ChartBarDecreasing, Code, CodeXml, Database, Pen, RectangleVertical, ScreenShare, Wrench } from "lucide-react";
import { SkillCategory } from "./types";
import type { ReactElement } from 'react';

export const skillsData: SkillCategory[] = [
    {
        title: "Frontend Development",
        subtitle: "Building modern, responsive web interfaces",
        items: [
            {
                name: "HTML",
                level: "essential" as const,
                icon: "/icons/html.svg"  // String path to icon
            },
            {
                name: "Javascript",
                level: "essential" as const,
                icon: "/icons/js.svg"  // String path to icon
            },
            {
                name: "CSS",
                level: "essential" as const,
                icon: "/icons/css.svg"  // String path to icon
            },
            {
                name: "React.js",
                level: "essential" as const,
                icon: "/icons/react.svg"  // String path to icon
            },
            {
                name: "Next.js",
                level: "essential" as const,
                icon: "/icons/next.svg"
            },
            {
                name: "Vue.js",
                level: "essential" as const,
                icon: "/icons/vue.svg"
            },
            {
                name: "TypeScript",
                level: "advanced" as const,
                icon: "/icons/typescript.svg"
            },
            {
                name: "Tailwind CSS",
                level: "essential" as const,
                icon: "/icons/tailwind.svg"
            },
            {
                name: "Redux",
                level: "advanced" as const,
                icon: "/icons/redux.svg"
            }
        ],
        icon: (
            <CodeXml className="text-white" size={40} />
        ) as ReactElement
    },
    {
        title: "Backend Development",
        subtitle: "Creating robust server-side solutions",
        items: [
            {
                name: "PHP",
                level: "essential" as const,
                icon: "/icons/php.svg"
            },
            {
                name: "Laravel",
                level: "essential" as const,
                icon: "/icons/laravel.svg"
            },
            {
                name: "MySQL",
                level: "essential" as const,
                icon: "/icons/sql.svg"
            },
            {
                name: "Firebase",
                level: "advanced" as const,
                icon: "/icons/firebase.svg"
            },
            {
                name: "Supabase",
                level: "essential" as const,
                icon: "/icons/supabase.svg"
            }
        ],
        icon: (
            <Database className="text-white" size={40} />
        ) as ReactElement
    },
    {
        title: "Development Tools",
        subtitle: "Utilizing modern development workflows",
        items: [
            {
                name: "Git",
                level: "essential" as const,
                icon: "/icons/git.svg"
            },
            {
                name: "Github",
                level: "essential" as const,
                icon: "/icons/github.svg"
            },
            {
                name: "Ubuntu",
                level: "essential" as const,
                icon: "/icons/ubuntu.svg"
            },
            {
                name: "VS Code",
                level: "essential" as const,
                icon: "/icons/vscode.svg"
            },
            {
                name: "Trello",
                level: "advanced" as const,
                icon: "/icons/trello.svg"
            },
            {
                name: "Vercel",
                level: "advanced" as const,
                icon: "/icons/vercel.svg"
            },
            {
                name: "npm",
                level: "essential" as const,
                icon: "/icons/npm.svg"
            },
            {
                name: "Vite",
                level: "advanced" as const,
                icon: "/icons/vite.svg"
            },
            {
                name: "Jira",
                level: "advanced" as const,
                icon: "/icons/jira.svg"
            }
        ],
        icon: (
            <Wrench className="text-white" size={40} />
        ) as ReactElement
    }
];
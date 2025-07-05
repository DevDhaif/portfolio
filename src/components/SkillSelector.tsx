// components/SkillSelector.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SkillSelectorProps {
    selectedSkills: string[];
    onChange: (skills: string[]) => void;
    className?: string;
}

// Organized skills by category for better UX
const SKILL_CATEGORIES = {
    "Frontend": [
        "React.js", "Next.js", "Vue.js", "Angular", "JavaScript", "TypeScript",
        "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Material UI", "Shadcn UI",
        "Redux", "Vuex", "State Management", "Responsive Design"
    ],
    "Backend": [
        "Laravel", "PHP", "Node.js", "Python", "Express.js", "FastAPI",
        "RESTful APIs", "GraphQL", "Authentication", "JWT"
    ],
    "Database": [
        "MySQL", "PostgreSQL", "MongoDB", "Firebase", "Supabase",
        "Database Design", "SQL"
    ],
    "Tools & DevOps": [
        "Git", "GitHub", "Docker", "Vercel", "Netlify", "AWS",
        "Vite", "Webpack", "npm", "Deployment"
    ],
    "Design & UX": [
        "UI/UX", "Figma", "Sketch", "Adobe XD", "Prototyping",
        "Design Systems", "Accessibility", "SEO"
    ],
    "Other": [
        "Performance", "Testing", "Agile", "Scrum", "CI/CD",
        "Progressive Web Apps", "Mobile Development"
    ]
};

export function SkillSelector({ selectedSkills, onChange, className }: SkillSelectorProps) {
    const [expandedCategories, setExpandedCategories] = useState<string[]>(["Frontend"]);
    const [showAll, setShowAll] = useState(false);

    const toggleCategory = (category: string) => {
        setExpandedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const toggleSkill = (skill: string) => {
        if (selectedSkills.includes(skill)) {
            onChange(selectedSkills.filter(s => s !== skill));
        } else {
            onChange([...selectedSkills, skill]);
        }
    };

    const toggleExpandAll = () => {
        if (showAll) {
            setExpandedCategories(["Frontend"]);
        } else {
            setExpandedCategories(Object.keys(SKILL_CATEGORIES));
        }
        setShowAll(!showAll);
    };

    return (
        <div className={cn("space-y-4", className)}>
            {/* Header with expand/collapse all */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                    Click to select skills ({selectedSkills.length} selected)
                </p>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={toggleExpandAll}
                    className="text-xs"
                >
                    {showAll ? (
                        <>
                            <ChevronUp className="w-3 h-3 mr-1" />
                            Collapse All
                        </>
                    ) : (
                        <>
                            <ChevronDown className="w-3 h-3 mr-1" />
                            Expand All
                        </>
                    )}
                </Button>
            </div>

            {/* Selected skills preview */}
            {selectedSkills.length > 0 && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800 font-medium mb-2">Selected Skills:</p>
                    <div className="flex flex-wrap gap-1">
                        {selectedSkills.map(skill => (
                            <span
                                key={skill}
                                className="inline-flex items-center px-2 py-1 bg-blue-500 text-white text-xs rounded-full"
                            >
                                {skill}
                                <button
                                    type="button"
                                    onClick={() => toggleSkill(skill)}
                                    className="ml-1 hover:bg-blue-600 rounded-full p-0.5"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Skill categories */}
            <div className="space-y-3">
                {Object.entries(SKILL_CATEGORIES).map(([category, skills]) => (
                    <div key={category} className="border border-gray-200 rounded-lg">
                        {/* Category header */}
                        <button
                            type="button"
                            onClick={() => toggleCategory(category)}
                            className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-t-lg"
                        >
                            <span className="font-medium text-gray-700">{category}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">
                                    {skills.filter(skill => selectedSkills.includes(skill)).length}/{skills.length}
                                </span>
                                {expandedCategories.includes(category) ? (
                                    <ChevronUp className="w-4 h-4 text-gray-400" />
                                ) : (
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                )}
                            </div>
                        </button>

                        {/* Category skills */}
                        {expandedCategories.includes(category) && (
                            <div className="p-3 pt-0">
                                <div className="flex flex-wrap gap-2">
                                    {skills.map(skill => (
                                        <Button
                                            key={skill}
                                            type="button"
                                            size="sm"
                                            variant={selectedSkills.includes(skill) ? "default" : "outline"}
                                            onClick={() => toggleSkill(skill)}
                                            className={cn(
                                                "text-xs transition-all",
                                                selectedSkills.includes(skill)
                                                    ? "bg-blue-500 text-white hover:bg-blue-600"
                                                    : "hover:border-blue-500 bg-gray-500 hover:text-blue-500"
                                            )}
                                        >
                                            {skill}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
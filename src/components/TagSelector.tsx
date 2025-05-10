import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TagSelectorProps } from "@/types";

// Common tags for web development
const PREDEFINED_TAGS = [
    "React.js", "Next.js", "Vue.js", "TypeScript", "JavaScript",
    "Tailwind CSS", "CSS", "HTML", "Laravel", "PHP",
    "MySQL", "API", "Firebase", "Supabase", "Performance",
    "Frontend", "Backend", "Full Stack", "UI/UX", "Responsive",
    "Deployment", "Git", "GitHub", "Bootstrap", "Material UI",
    "Redux", "State Management", "Authentication", "SEO", "Accessibility"
];


export function TagSelector({ selectedTags, onChange, className }: TagSelectorProps) {
    // Toggle tag selection
    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            onChange(selectedTags.filter(t => t !== tag));
        } else {
            onChange([...selectedTags, tag]);
        }
    };

    return (
        <div className={cn("flex flex-wrap gap-2", className)}>
            {PREDEFINED_TAGS.map(tag => (
                <Button
                    key={tag}
                    type="button"
                    size="sm"
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    onClick={() => toggleTag(tag)}
                    className={cn(
                        "text-sm transition-all border-accent-primary/50",
                        selectedTags.includes(tag)
                            ? "bg-accent-primary text-background"
                            : "hover:border-accent-primary/90"
                    )}
                >
                    #{tag}
                </Button>
            ))}
        </div>
    );
}
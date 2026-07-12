import Image from "next/image";

// Core stack, shown as a single kinetic strip. Breadth at a glance.
const stack: { name: string; icon: string }[] = [
    { name: "React", icon: "/icons/react.svg" },
    { name: "Next.js", icon: "/icons/next.svg" },
    { name: "TypeScript", icon: "/icons/typescript.svg" },
    { name: "JavaScript", icon: "/icons/js.svg" },
    { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
    { name: "Vue.js", icon: "/icons/vue.svg" },
    { name: "React Query", icon: "/icons/react-query.svg" },
    { name: "Zustand", icon: "/icons/zustand.svg" },
    { name: "Redux", icon: "/icons/redux.svg" },
    { name: "Laravel", icon: "/icons/laravel.svg" },
    { name: "PHP", icon: "/icons/php.svg" },
    { name: "MySQL", icon: "/icons/sql.svg" },
    { name: "Supabase", icon: "/icons/supabase.svg" },
    { name: "Firebase", icon: "/icons/firebase.svg" },
    { name: "Git", icon: "/icons/git.svg" },
    { name: "Vercel", icon: "/icons/vercel.svg" },
    { name: "Vite", icon: "/icons/vite.svg" },
];

function Item({ name, icon }: { name: string; icon: string }) {
    return (
        <span className="flex shrink-0 items-center gap-2.5 px-8">
            <Image
                src={icon}
                alt=""
                width={22}
                height={22}
                className="h-[22px] w-[22px] object-contain"
            />
            <span className="font-mono text-sm text-ink-muted">{name}</span>
            <span aria-hidden className="ml-8 h-1 w-1 shrink-0 bg-accent" />
        </span>
    );
}

export function TechMarquee() {
    // Render the set twice so the -50% loop is seamless.
    const doubled = [...stack, ...stack];

    return (
        <section
            aria-label="Technology stack"
            className="overflow-hidden border-y border-rule-strong bg-paper-sunken py-6"
        >
            <div className="marquee-track" aria-hidden>
                {doubled.map((s, i) => (
                    <Item key={`${s.name}-${i}`} {...s} />
                ))}
            </div>
            {/* Accessible, static text for screen readers / reduced motion. */}
            <span className="sr-only">
                Core stack: {stack.map((s) => s.name).join(", ")}.
            </span>
        </section>
    );
}

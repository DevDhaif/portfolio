export default function ProjectLoading() {
    return (
        <section className="relative py-24 md:py-32">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40" />
            <div className="container-dev relative max-w-5xl">
                <div className="h-4 w-28 animate-pulse rounded bg-rule" />
                <div className="mt-6 h-12 w-2/3 animate-pulse rounded-lg bg-rule" />
                <div className="mt-4 flex flex-wrap gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-6 w-20 animate-pulse rounded-md bg-rule" />
                    ))}
                </div>
                <div className="mt-10 aspect-[16/9] w-full animate-pulse rounded-xl bg-rule" />
                <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="space-y-3 lg:col-span-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-4 w-full animate-pulse rounded bg-rule" />
                        ))}
                    </div>
                    <div className="space-y-3">
                        <div className="h-24 w-full animate-pulse rounded-lg bg-rule" />
                        <div className="h-24 w-full animate-pulse rounded-lg bg-rule" />
                    </div>
                </div>
            </div>
        </section>
    );
}

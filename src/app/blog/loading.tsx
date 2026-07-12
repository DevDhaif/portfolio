export default function BlogLoading() {
    return (
        <section className="relative py-24 md:py-32">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40" />
            <div className="container-dev relative">
                <div className="h-4 w-40 animate-pulse rounded bg-rule" />
                <div className="mt-6 h-14 w-2/3 max-w-xl animate-pulse rounded-lg bg-rule" />
                <div className="mt-4 h-5 w-1/2 max-w-md animate-pulse rounded bg-rule" />

                <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="overflow-hidden rounded-lg border border-rule bg-paper-raised">
                            <div className="aspect-video animate-pulse bg-rule" />
                            <div className="space-y-3 p-5">
                                <div className="h-3 w-24 animate-pulse rounded bg-rule" />
                                <div className="h-5 w-3/4 animate-pulse rounded bg-rule" />
                                <div className="h-4 w-full animate-pulse rounded bg-rule" />
                                <div className="h-4 w-5/6 animate-pulse rounded bg-rule" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

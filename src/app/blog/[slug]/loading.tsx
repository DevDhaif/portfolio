export default function BlogPostLoading() {
    return (
        <article className="relative py-24 md:py-32">
            <div className="container-dev max-w-3xl">
                <div className="h-4 w-32 animate-pulse rounded bg-rule" />
                <div className="mt-6 h-12 w-full animate-pulse rounded-lg bg-rule" />
                <div className="mt-3 h-12 w-3/4 animate-pulse rounded-lg bg-rule" />
                <div className="mt-8 flex gap-4">
                    <div className="h-4 w-24 animate-pulse rounded bg-rule" />
                    <div className="h-4 w-24 animate-pulse rounded bg-rule" />
                </div>
                <div className="mt-10 aspect-video w-full animate-pulse rounded-lg bg-rule" />
                <div className="mt-10 space-y-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-4 animate-pulse rounded bg-rule"
                            style={{ width: `${[100, 96, 88, 92, 70, 100, 84, 60][i]}%` }}
                        />
                    ))}
                </div>
            </div>
        </article>
    );
}

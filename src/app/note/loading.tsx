export default function NoteLoading() {
    const pale = 'rgba(29, 42, 107, 0.10)';
    return (
        <div className="relative overflow-hidden" style={{ minHeight: '100dvh', background: '#fbf6e8' }}>
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage:
                        'repeating-linear-gradient(180deg, transparent 0 27px, #b9d2ea 27px 28px)',
                    opacity: 0.5,
                }}
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0"
                style={{ left: 64, width: 1, background: '#b91c1c', opacity: 0.5 }}
            />
            <div className="relative mx-auto max-w-[1560px] px-[44px] pt-28 md:px-[72px]">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    <div>
                        <div className="h-6 w-40 animate-pulse rounded" style={{ background: pale }} />
                        <div className="mt-6 h-20 w-11/12 animate-pulse rounded-lg" style={{ background: pale }} />
                        <div className="mt-3 h-20 w-3/4 animate-pulse rounded-lg" style={{ background: pale }} />
                        <div className="mt-8 h-5 w-2/3 animate-pulse rounded" style={{ background: pale }} />
                        <div className="mt-6 space-y-3">
                            <div className="h-4 w-full animate-pulse rounded" style={{ background: pale }} />
                            <div className="h-4 w-5/6 animate-pulse rounded" style={{ background: pale }} />
                        </div>
                    </div>
                    <div
                        className="mx-auto aspect-[3/4] w-full max-w-[440px] animate-pulse rounded-sm"
                        style={{ background: 'linear-gradient(135deg, #11161a, #1d3a30)', opacity: 0.85 }}
                    />
                </div>
            </div>
        </div>
    );
}

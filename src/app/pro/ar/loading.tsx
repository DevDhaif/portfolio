export default function ProArLoading() {
    return (
        <div dir="rtl" className="min-h-screen bg-paper text-ink">
            <div className="relative overflow-hidden pt-28 pb-20 md:pt-36">
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-dev-fade" />
                <div className="container-dev relative">
                    <div className="ms-auto h-4 w-40 animate-pulse rounded bg-rule" />
                    <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                            <div className="ms-auto h-16 w-11/12 animate-pulse rounded-lg bg-rule" />
                            <div className="ms-auto mt-4 h-16 w-3/4 animate-pulse rounded-lg bg-rule" />
                            <div className="ms-auto mt-8 h-5 w-2/3 animate-pulse rounded bg-rule" />
                            <div className="mt-10 flex flex-row-reverse gap-3">
                                <div className="h-11 w-32 animate-pulse rounded-md bg-rule" />
                                <div className="h-11 w-32 animate-pulse rounded-md bg-rule" />
                            </div>
                        </div>
                        <div className="lg:col-span-5">
                            <div className="h-[280px] w-full animate-pulse rounded-lg bg-rule" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

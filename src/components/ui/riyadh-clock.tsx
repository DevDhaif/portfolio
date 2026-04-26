"use client";

import { useEffect, useState } from "react";

export function RiyadhClock() {
    const [now, setNow] = useState<string>("");
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        const tick = () => {
            const fmtTime = new Intl.DateTimeFormat("en-GB", {
                timeZone: "Asia/Riyadh",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            }).format(new Date());
            const fmtDate = new Intl.DateTimeFormat("en-GB", {
                timeZone: "Asia/Riyadh",
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric",
            }).format(new Date());
            setNow(fmtTime);
            setDate(fmtDate);
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="flex h-full flex-col justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                {`// local time`}
            </p>
            <div>
                <p className="font-display text-3xl font-bold tracking-tight text-ink tabular-nums md:text-4xl">
                    {now || "—"}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    {date}
                </p>
            </div>
        </div>
    );
}

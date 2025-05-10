// src/components/JsonLd/JsonLd.tsx
import { JsonLdProps } from "@/types";

export function JsonLd({ schema }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema)
            }}
        />
    );
}
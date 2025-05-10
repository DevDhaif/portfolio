// src/components/JsonLd/JsonLd.tsx
export interface JsonLdProps {
    schema: Record<string, any>;
}

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
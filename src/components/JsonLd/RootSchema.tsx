// components/JsonLd/RootSchema.tsx
import { WEBSITE_SCHEMA, PERSON_SCHEMA } from '@/lib/schemas'

export function RootSchema() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(WEBSITE_SCHEMA)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PERSON_SCHEMA)
        }}
      />
    </>
  )
}
# SERVICES Content Generation — BATCH 01  Items 1 to 8

## Your Mission
Generate SEO optimized content for 8 services in Denver, CO. The site prioritizes nationwide replacement property identification and compliant guidance.

**Critical**
- Technical accuracy, plain language, no tax, legal, or investment advice
- DO NOT MAKE UP INFORMATION WITHOUT VERIFYING IT TO BE TRUE, ESPECIALLY FOR OUR LOCATIONS!
- Rank and rent compliant language only
- No testimonials, no unverifiable claims
- Follow Hobo Technical SEO 2025 best practices
- Use the assigned layout key for each item

## Services In This Batch  8 total
1) replacement-property-identification — Replacement Property Identification  Layout: classic
2) multifamily-replacement-sourcing — Multifamily Replacement Sourcing  Layout: detailed
3) industrial-property-identification — Industrial Property Identification  Layout: focused
4) nnn-stnl-property-sourcing — NNN and STNL Property Sourcing  Layout: comparison
5) medical-office-replacement — Medical Office Replacement Sourcing  Layout: process
6) self-storage-replacement — Self Storage Replacement Sourcing  Layout: minimal
7) retail-replacement-sourcing — Retail Replacement Sourcing  Layout: classic
8) land-replacement-identification — Land Replacement Identification  Layout: detailed

## Content Requirements  for EACH Service
### 1. Main Description  220 to 300 words
- Who it is for, what is included, forty five day and one hundred eighty day timing
- Mention Qualified Intermediary and qualified escrow at a high level
- Mention Denver, CO once
- Follow the assigned layout sections

### 2. FAQs  4 to 6
- Include Denver, CO in every answer
- Include at least one identification rules question and one boot question

### 3. What We Include
- 5 to 8 bullet points

### 4. Common Situations
- 3 short examples framed as examples we can handle

### 5. Compliance and Limits
- Educational content only. Not tax, legal, or investment advice.
- 1031 defers income tax on qualifying real property and does not remove transfer or documentary taxes.

### 6. Example Capability
{ "disclaimer":"Example of the type of engagement we can handle", "serviceType":"[Service Name]", "location":"Denver, CO", "scope":"...", "clientSituation":"...", "ourApproach":"...", "expectedOutcome":"...", "contactCTA":"Contact us to discuss your situation in Denver, CO. We can share references upon request." }

## Output Format  TypeScript  write to /data/batches/services/batch-01.ts
export const servicesBatch01 = {
  "[slug]": {
    layoutKey:"[layout-key]",
    mainDescription:"<p>...</p>",
    faqs:[{question:"...",answer:"..."}],
    inclusions:["..."],
    commonSituations:["..."],
    complianceNote:"Educational content only. Not tax, legal, or investment advice.",
    exampleCapability:{ ... }
  }
}


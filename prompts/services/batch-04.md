# SERVICES Content Generation — BATCH 04  Items 25 to 30

## Your Mission
Generate SEO optimized content for 6 services in Denver, CO. The site prioritizes nationwide replacement property identification and compliant guidance.

**Critical**
- Technical accuracy, plain language, no tax, legal, or investment advice
- DO NOT MAKE UP INFORMATION WITHOUT VERIFYING IT TO BE TRUE, ESPECIALLY FOR OUR LOCATIONS!
- Rank and rent compliant language only
- No testimonials, no unverifiable claims
- Follow Hobo Technical SEO 2025 best practices
- Use the assigned layout key for each item

## Services In This Batch  6 total
1) capex-planning — Capital Expenditure Planning  Layout: focused
2) market-comp-analysis — Market Comparable Analysis  Layout: comparison
3) lender-preflight-coordination — Lender Preflight Coordination  Layout: process
4) boot-calculation-analysis — Boot Calculation Analysis  Layout: minimal
5) basis-calculation-support — Basis Calculation Support  Layout: classic
6) form-8824-preparation — Form 8824 Preparation  Layout: detailed

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

## Output Format  TypeScript  write to /data/batches/services/batch-04.ts
export const servicesBatch04 = {
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


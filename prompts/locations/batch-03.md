# LOCATIONS Content Generation — BATCH 03  Items 15 to 16

## Your Mission
Generate SEO optimized content for 2 locations near Denver, CO that help users find replacement properties nationwide.

**Critical**
- No boilerplate
- Include Denver, CO once in each body
- Rank and rent compliant language only
- Emphasize nationwide property identification support
- Use the assigned layout key

## Research Requirements
1) Search "[Location] CO population 2024 2025"
2) Search "[Location] CO major employers industries"
3) Search "[Location] CO neighborhoods business districts"
4) Confirm map location and radius

## Locations In This Batch  2 total
1) aurora — Aurora, CO  Layout: map-first
2) remote — Remote  Layout: overview

## Content Requirements  for EACH Location
### 1. Main Description  180 to 260 words
- Local exchange drivers, asset types, any transfer or documentary tax notes
- One reference to Denver, CO
- Mention national identification support
- Follow the assigned layout sections

### 2. Popular Paths  rank 1 to 6
- Order services or property types with 2 to 3 sentence rationale each

### 3. FAQs  4 items
- Include the location and state abbreviation in each answer

### 4. Example Capability
{ "disclaimer":"Example of the type of engagement we can handle", "location":"[Location, CO]", "situation":"...", "ourApproach":"...", "expectedOutcome":"..." }

## Output Format  TypeScript  write to /data/batches/locations/batch-03.ts
export const locationsBatch03 = {
  "[slug]": {
    layoutKey:"[layout-key]",
    mainDescription:"<p>...</p>",
    popularPaths:[{rank:1,type:"service or propertyType",slug:"...",name:"...",whyPopular:"..."}],
    faqs:[{question:"...",answer:"..."}],
    exampleCapability:{ ... }
  }
}


# LOCATIONS Content Generation — BATCH 01  Items 1 to 7

## Your Mission
Generate SEO optimized content for 7 locations near Denver, CO that help users find replacement properties nationwide.

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

## Locations In This Batch  7 total
1) denver — Denver, CO  Layout: map-first
2) cherry-creek — Cherry Creek, CO  Layout: overview
3) downtown-denver — Downtown Denver, CO  Layout: focused
4) tech-center — Denver Tech Center, CO  Layout: market
5) highlands — Highlands, CO  Layout: guide
6) boulder — Boulder, CO  Layout: compact
7) colorado-springs — Colorado Springs, CO  Layout: map-first

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

## Output Format  TypeScript  write to /data/batches/locations/batch-01.ts
export const locationsBatch01 = {
  "[slug]": {
    layoutKey:"[layout-key]",
    mainDescription:"<p>...</p>",
    popularPaths:[{rank:1,type:"service or propertyType",slug:"...",name:"...",whyPopular:"..."}],
    faqs:[{question:"...",answer:"..."}],
    exampleCapability:{ ... }
  }
}


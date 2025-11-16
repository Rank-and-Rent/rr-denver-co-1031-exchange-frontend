import type {
  PageLayoutVariant,
  LayoutAssignments,
} from "./types";
import { servicesData } from "./services";
import { locationsData } from "./locations";

export const serviceVariants: PageLayoutVariant[] = [
  {
    key: "classic",
    label: "Classic",
    description: "Standard layout with hero, description, FAQs, and CTA.",
    sections: ["hero", "description", "inclusions", "faqs", "cta"],
    features: {
      heroStyle: "gradient",
      stickyCta: true,
      schema: ["Service", "FAQPage"],
    },
  },
  {
    key: "detailed",
    label: "Detailed",
    description: "Comprehensive layout with table of contents and sidebar.",
    sections: ["hero", "toc", "description", "inclusions", "commonSituations", "faqs", "cta"],
    features: {
      toc: true,
      sidebar: true,
      heroStyle: "image",
      schema: ["Service", "FAQPage"],
    },
  },
  {
    key: "focused",
    label: "Focused",
    description: "Streamlined layout emphasizing key information.",
    sections: ["hero", "description", "inclusions", "faqs"],
    features: {
      heroStyle: "abstract",
      stickyCta: false,
      schema: ["Service"],
    },
  },
  {
    key: "comparison",
    label: "Comparison",
    description: "Layout highlighting service differences and use cases.",
    sections: ["hero", "description", "commonSituations", "inclusions", "faqs", "cta"],
    features: {
      heroStyle: "gradient",
      stickyCta: true,
      schema: ["Service", "FAQPage"],
    },
  },
  {
    key: "process",
    label: "Process",
    description: "Step by step layout showing service workflow.",
    sections: ["hero", "description", "processSteps", "inclusions", "faqs", "cta"],
    features: {
      heroStyle: "abstract",
      stickyCta: true,
      schema: ["Service", "HowTo"],
    },
  },
  {
    key: "minimal",
    label: "Minimal",
    description: "Clean layout with essential information only.",
    sections: ["hero", "description", "faqs"],
    features: {
      heroStyle: "gradient",
      stickyCta: false,
      schema: ["Service"],
    },
  },
];

export const locationVariants: PageLayoutVariant[] = [
  {
    key: "map-first",
    label: "Map First",
    description: "Layout starting with map visualization and location context.",
    sections: ["hero", "map", "description", "popularPaths", "faqs", "cta"],
    features: {
      heroStyle: "map",
      stickyCta: true,
      schema: ["Place", "FAQPage"],
    },
  },
  {
    key: "overview",
    label: "Overview",
    description: "Comprehensive location overview with market context.",
    sections: ["hero", "description", "popularPaths", "faqs", "cta"],
    features: {
      heroStyle: "image",
      stickyCta: true,
      schema: ["Place", "FAQPage"],
    },
  },
  {
    key: "focused",
    label: "Focused",
    description: "Streamlined location page with key details.",
    sections: ["hero", "description", "popularPaths", "faqs"],
    features: {
      heroStyle: "gradient",
      stickyCta: false,
      schema: ["Place"],
    },
  },
  {
    key: "market",
    label: "Market",
    description: "Market focused layout with property type emphasis.",
    sections: ["hero", "description", "popularPaths", "marketData", "faqs", "cta"],
    features: {
      heroStyle: "abstract",
      stickyCta: true,
      schema: ["Place", "FAQPage"],
    },
  },
  {
    key: "guide",
    label: "Guide",
    description: "Guide style layout with detailed location information.",
    sections: ["hero", "description", "locationDetails", "popularPaths", "faqs", "cta"],
    features: {
      heroStyle: "image",
      sidebar: true,
      stickyCta: true,
      schema: ["Place", "FAQPage"],
    },
  },
  {
    key: "compact",
    label: "Compact",
    description: "Compact layout for quick location reference.",
    sections: ["hero", "description", "popularPaths", "faqs"],
    features: {
      heroStyle: "gradient",
      stickyCta: false,
      schema: ["Place"],
    },
  },
];

function assignLayouts<T extends { slug: string }>(
  items: T[],
  variants: PageLayoutVariant[]
): Record<string, string> {
  const assignments: Record<string, string> = {};
  let variantIndex = 0;

  items.forEach((item) => {
    assignments[item.slug] = variants[variantIndex % variants.length].key;
    variantIndex++;
  });

  return assignments;
}

export const assignments: LayoutAssignments = {
  services: assignLayouts(servicesData, serviceVariants),
  locations: assignLayouts(locationsData, locationVariants),
};


import type { InventoryCategory } from "./types";

export const inventoryCategories: InventoryCategory[] = [
  {
    slug: "multifamily",
    name: "Multifamily Properties",
    route: "multifamily",
    note: "Apartment buildings and multifamily assets nationwide.",
  },
  {
    slug: "industrial",
    name: "Industrial Properties",
    route: "industrial",
    note: "Warehouse, distribution, and flex space facilities.",
  },
  {
    slug: "retail",
    name: "Retail Properties",
    route: "retail",
    note: "Shopping centers, strip malls, and retail plazas.",
  },
  {
    slug: "medical-office",
    name: "Medical Office Buildings",
    route: "medical-office",
    note: "Healthcare facilities and medical office properties.",
  },
  {
    slug: "self-storage",
    name: "Self Storage Facilities",
    route: "self-storage",
    note: "Self storage properties with climate controlled and standard units.",
  },
  {
    slug: "nnn",
    name: "NNN Properties",
    route: "nnn",
    note: "Triple net lease properties with credit tenants. DST or TIC may be securities. We do not sell securities. We provide introductions to licensed providers only.",
  },
  {
    slug: "stnl",
    name: "STNL Properties",
    route: "stnl",
    note: "Single tenant net lease properties. DST or TIC may be securities. We do not sell securities. We provide introductions to licensed providers only.",
  },
  {
    slug: "flex",
    name: "Flex Properties",
    route: "flex",
    note: "Flex space combining office and warehouse components.",
  },
  {
    slug: "hospitality",
    name: "Hospitality Properties",
    route: "hospitality",
    note: "Hotels and resort properties compliant with Rev Proc 2008-16.",
  },
  {
    slug: "land",
    name: "Land",
    route: "land",
    note: "Raw land and development sites for long term appreciation.",
  },
  {
    slug: "mixed-use",
    name: "Mixed Use Properties",
    route: "mixed-use",
    note: "Properties combining residential, retail, and office components.",
  },
];


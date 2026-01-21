import type { ServiceBatchItem, LocationBatchItem } from "@/data/types";
import { servicesBatch01 } from "@/data/batches/services/batch-01";
import { servicesBatch02 } from "@/data/batches/services/batch-02";
import { servicesBatch03 } from "@/data/batches/services/batch-03";
import { servicesBatch04 } from "@/data/batches/services/batch-04";
import { servicesBatch05 } from "@/data/batches/services/batch-05";
import { locationsBatch01 } from "@/data/batches/locations/batch-01";
import { locationsBatch02 } from "@/data/batches/locations/batch-02";
import { locationsBatch03 } from "@/data/batches/locations/batch-03";

// Merge all service batches
export const allServiceBatches: Record<string, ServiceBatchItem> = {
  ...servicesBatch01,
  ...servicesBatch02,
  ...servicesBatch03,
  ...servicesBatch04,
  ...servicesBatch05,
};

// Merge all location batches
export const allLocationBatches: Record<string, LocationBatchItem> = {
  ...locationsBatch01,
  ...locationsBatch02,
  ...locationsBatch03,
};

// Helper function to get service batch content
export function getServiceBatch(slug: string): ServiceBatchItem | null {
  return allServiceBatches[slug] || null;
}

// Helper function to get location batch content
export function getLocationBatch(slug: string): LocationBatchItem | null {
  return allLocationBatches[slug] || null;
}

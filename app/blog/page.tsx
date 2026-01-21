import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogGrid } from "@/components/blog/BlogGrid";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "1031 Exchange Blog | 1031 Exchange Denver",
  description: "Educational articles and insights about 1031 exchanges in Colorado",
  alternates: {
    canonical: "https://www.1031exchangedenver.com/blog",
  },
};

async function getPosts() {
  const query = `*[_type == "article" && published == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    featuredImage,
    author->{name, image}
  }`;
  
  try {
    const { createClient } = await import("@sanity/client");
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      useCdn: true,
      apiVersion: "2024-01-01",
    });
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-warm-brown py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog" },
            ]}
            className="mb-8 text-sm"
          />
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
              Insights & Education
            </p>
            <h1 className={`mt-4 text-3xl tracking-wide text-white sm:text-4xl md:text-5xl ${playfair.className}`}>
              1031 exchange insights
            </h1>
            <p className="mt-6 text-lg font-light leading-relaxed text-white/80">
              Educational updates about timelines, underwriting, and Denver market
              dynamics. Pagination shows six posts on desktop and three on mobile.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <BlogGrid posts={posts} />
        </div>
      </section>
    </div>
  );
}


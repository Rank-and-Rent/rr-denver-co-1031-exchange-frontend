import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import BottomCTA from "@/components/BottomCTA";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

async function getPost(slug: string) {
  const query = `*[_type == "article" && slug.current == $slug && published == true][0] {
    _id,
    title,
    slug,
    publishedAt,
    content,
    featuredImage,
    excerpt,
    author->{name, image, bio}
  }`;
  
  try {
    const { createClient } = await import("@sanity/client");
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      useCdn: true,
      apiVersion: "2024-01-01",
    });
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateStaticParams() {
  const query = `*[_type == "article" && published == true] {
    "slug": slug.current
  }`;
  
  try {
    const { createClient } = await import("@sanity/client");
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      useCdn: true,
      apiVersion: "2024-01-01",
    });
    const posts = await client.fetch(query);
    return posts.map((post: { slug: string }) => ({
      slug: post.slug,
    }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found | 1031 Exchange Denver",
    };
  }

  return {
    title: `${post.title} | 1031 Exchange Denver Blog`,
    description: post.excerpt || `Read about ${post.title} on the 1031 Exchange Denver blog`,
    alternates: {
      canonical: `https://www.1031exchangedenver.com/blog/${post.slug.current}`,
    },
  };
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      const builder = imageUrlBuilder({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      });
      return (
        <img
          src={builder.image(value).width(800).url()}
          alt={value.alt || ""}
          className="my-8"
        />
      );
    },
  },
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const builder = imageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "",
    image: post.featuredImage?.image
      ? builder.image(post.featuredImage.image).url()
      : undefined,
    datePublished: post.publishedAt,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
        }
      : undefined,
  };

  return (
    <>
      <Script
        id="jsonld-blog-post"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-warm-brown py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6 md:px-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
              className="mb-8 text-sm"
            />
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-white/70">
              {post.publishedAt ? (
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              ) : null}
              {post.author?.name && (
                <>
                  <span className="text-white/40">·</span>
                  <span>{post.author.name}</span>
                </>
              )}
            </div>
            <h1 className={`mt-4 text-3xl tracking-wide text-white sm:text-4xl ${playfair.className}`}>
              {post.title}
            </h1>
          </div>
        </section>

        {/* Featured Image */}
        {post.featuredImage?.image && (
          <div className="mx-auto max-w-4xl px-6 md:px-8 -mt-8 relative z-10">
            <div className="aspect-video w-full overflow-hidden shadow-luxury-lg">
              <img
                src={builder.image(post.featuredImage.image).width(1200).height(675).url()}
                alt={post.featuredImage.alt || post.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-6 md:px-8">
            <div className="prose prose-lg max-w-none prose-headings:font-normal prose-headings:tracking-wide prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-warm-brown prose-a:underline-offset-4 hover:prose-a:text-dark-brown prose-strong:text-gray-900 prose-li:text-gray-600">
              {post.content && (
                <PortableText value={post.content} components={portableTextComponents} />
              )}
            </div>
          </div>
        </article>

        {/* Back to Blog */}
        <section className="border-t border-warm-brown/20 py-12">
          <div className="mx-auto max-w-3xl px-6 md:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-warm-brown hover:text-dark-brown"
            >
              <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              Back to all articles
            </Link>
          </div>
        </section>
      </div>
      <BottomCTA />
    </>
  );
}


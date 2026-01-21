"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type BlogCard = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  featuredImage?: { image?: any; alt?: string };
};

type BlogGridProps = {
  posts: BlogCard[];
};

export function BlogGrid({ posts }: BlogGridProps) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);

  useEffect(() => {
    const handler = () => {
      setPageSize(window.matchMedia("(min-width: 768px)").matches ? 6 : 3);
    };
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const clampedPage = Math.min(page, totalPages - 1);

  const visible = useMemo(() => {
    const start = clampedPage * pageSize;
    return posts.slice(start, start + pageSize);
  }, [clampedPage, pageSize, posts]);

  if (!posts.length) {
    return (
      <div className="border border-warm-brown/20 bg-cream p-8 text-gray-600">
        No published posts yet. Check back soon.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="group flex h-full flex-col bg-cream transition-all hover:shadow-luxury"
          >
            <div className="flex flex-1 flex-col p-6 gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Draft"}
              </p>
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-warm-brown">
                {post.title}
              </h3>
              {post.excerpt ? (
                <p className="text-sm text-gray-600">{post.excerpt}</p>
              ) : null}
              <span className="mt-auto flex items-center gap-2 pt-2 text-xs font-medium uppercase tracking-[0.15em] text-warm-brown">
                Read post
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
      {totalPages > 1 ? (
        <div className="flex items-center justify-between text-sm text-gray-600">
          <button
            type="button"
            disabled={clampedPage === 0}
            onClick={() => setPage((current) => Math.max(0, current - 1))}
            className="border border-warm-brown/30 px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-warm-brown transition hover:bg-warm-brown hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-warm-brown"
          >
            Prev
          </button>
          <p className="text-gray-500">
            Page {clampedPage + 1} of {totalPages}
          </p>
          <button
            type="button"
            disabled={clampedPage >= totalPages - 1}
            onClick={() =>
              setPage((current) => Math.min(totalPages - 1, current + 1))
            }
            className="border border-warm-brown/30 px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-warm-brown transition hover:bg-warm-brown hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-warm-brown"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}


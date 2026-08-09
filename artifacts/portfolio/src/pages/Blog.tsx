import React, { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useGetBlogPosts } from '@workspace/api-client-react';
import { Clock, ArrowRight } from 'lucide-react';

import blog1 from '@assets/generated_images/blog-1.jpg';
import blog2 from '@assets/generated_images/blog-2.jpg';
import blog3 from '@assets/generated_images/blog-3.jpg';
import blog4 from '@assets/generated_images/blog-4.jpg';

const ALL_IMAGES = [blog1, blog2, blog3, blog4];

const CATEGORIES = [
  { label: 'All Posts', value: 'All' },
  { label: 'AI Search', value: 'AI Search' },
  { label: 'Business', value: 'Business' },
  { label: 'Company', value: 'Company' },
  { label: 'Development', value: 'Development' },
  { label: 'E-Commerce', value: 'E-Commerce' },
  { label: 'WordPress', value: 'WordPress' },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

export function Blog() {
  const { data: posts } = useGetBlogPosts();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = posts?.filter(p =>
    activeCategory === 'All'
      ? true
      : p.tags.some(t => t.toLowerCase().includes(activeCategory.toLowerCase()))
  ) ?? [];

  // Count per category
  const counts: Record<string, number> = { All: posts?.length ?? 0 };
  CATEGORIES.slice(1).forEach(cat => {
    counts[cat.value] =
      posts?.filter(p =>
        p.tags.some(t => t.toLowerCase().includes(cat.value.toLowerCase()))
      ).length ?? 0;
  });

  return (
    <div className="w-full bg-[#080E14]">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-20 relative overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            {/* SIG label */}
            <div className="flex items-center gap-2 font-mono text-xs text-dever-teal uppercase tracking-widest mb-8">
              <span className="w-6 h-px bg-dever-teal" />
              SIG.13 / BLOG
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-display font-bold leading-[1.05] mb-6">
              <span className="block text-white">Insights on AI,</span>
              <span className="block">
                <span className="text-dever-teal underline decoration-dever-teal/40 underline-offset-4">Web</span>
                <span className="text-white"> and </span>
                <span className="text-dever-orange">Search.</span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-dever-muted leading-relaxed">
              <span className="text-white underline decoration-white/20 underline-offset-2 cursor-pointer hover:decoration-dever-teal/60 hover:text-dever-teal transition-colors">
                Expert guides on AEO
              </span>
              , AI optimisation, Shopify, WordPress and{' '}
              <span className="text-white underline decoration-white/20 underline-offset-2 cursor-pointer hover:decoration-dever-teal/60 hover:text-dever-teal transition-colors">
                everything that shapes the modern web
              </span>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Body: article grid + sidebar ─────────────────────────────── */}
      <section className="py-14 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex gap-10 items-start">

            {/* ── Main: article grid ──────────────────────────────────── */}
            <div className="flex-1 min-w-0">
              {filtered.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-dever-muted mb-4">No articles in this category yet.</p>
                  <button
                    onClick={() => setActiveCategory('All')}
                    className="text-dever-teal text-sm hover:underline"
                  >
                    Show all articles
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filtered.map((post, idx) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                    >
                      <Link href={`/blog/${post.slug}`} className="block group h-full">
                        <article className="bg-[#0A1220] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors h-full flex flex-col">

                          {/* Thumbnail */}
                          <div className="aspect-[16/9] overflow-hidden relative bg-[#0c1525]">
                            <img
                              src={ALL_IMAGES[idx % ALL_IMAGES.length]}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            {/* Category badge overlaid on image */}
                            <div className="absolute top-3 left-3">
                              <span className="font-mono text-[10px] uppercase tracking-widest text-dever-teal bg-[#080E14]/80 border border-dever-teal/20 px-2.5 py-1 rounded backdrop-blur-sm">
                                {post.tags[0] ?? 'General'}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6 flex flex-col flex-1">
                            {/* Category mono label */}
                            <div className="font-mono text-[10px] uppercase tracking-widest text-dever-teal mb-3">
                              {post.tags[0] ?? 'General'}
                            </div>

                            {/* Title */}
                            <h2 className="text-base md:text-lg font-display font-bold text-white leading-snug mb-3 group-hover:text-dever-teal transition-colors line-clamp-3">
                              {post.title}
                            </h2>

                            {/* Excerpt */}
                            <p className="text-sm text-dever-muted leading-relaxed line-clamp-3 flex-1 mb-5">
                              {post.excerpt}
                            </p>

                            {/* Footer row */}
                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-dever-orange group-hover:gap-2.5 transition-all">
                                Read More <ArrowRight size={11} />
                              </span>
                              <div className="flex items-center gap-2 font-mono text-[10px] text-dever-muted uppercase tracking-wider">
                                <span>{formatDate(post.publishedAt)}</span>
                                <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
                                <span className="flex items-center gap-1">
                                  <Clock size={9} /> {post.readingTime} min read
                                </span>
                              </div>
                            </div>
                          </div>
                        </article>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Sidebar ─────────────────────────────────────────────── */}
            <aside className="hidden lg:block w-64 shrink-0">

              {/* Categories */}
              <div className="mb-10">
                <div className="font-mono text-[10px] uppercase tracking-widest text-dever-muted mb-4">
                  Categories
                </div>
                <ul className="space-y-0.5">
                  {CATEGORIES.map(cat => {
                    const count = counts[cat.value] ?? 0;
                    const isActive = activeCategory === cat.value;
                    return (
                      <li key={cat.value}>
                        <button
                          onClick={() => setActiveCategory(cat.value)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded text-sm transition-all ${
                            isActive
                              ? 'bg-dever-teal/10 text-dever-teal border-l-2 border-dever-teal'
                              : 'text-dever-muted hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                          }`}
                        >
                          <span>{cat.label}</span>
                          <span className={`font-mono text-xs ${isActive ? 'text-dever-teal' : 'text-white/30'}`}>
                            {count}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Recent Posts */}
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-dever-muted mb-4">
                  Recent Posts
                </div>
                <ul className="space-y-4">
                  {(posts ?? []).slice(0, 4).map((post, idx) => (
                    <li key={post.id}>
                      <Link href={`/blog/${post.slug}`} className="flex gap-3 group">
                        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[#0A1220]">
                          <img
                            src={ALL_IMAGES[idx % ALL_IMAGES.length]}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-white group-hover:text-dever-teal transition-colors line-clamp-2 leading-snug mb-1">
                            {post.title}
                          </p>
                          <p className="font-mono text-[10px] text-dever-muted uppercase tracking-wider">
                            {formatDate(post.publishedAt)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

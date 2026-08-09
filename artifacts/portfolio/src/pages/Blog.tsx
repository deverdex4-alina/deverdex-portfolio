import React, { useState, useRef } from 'react';
import { Link } from 'wouter';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useGetBlogPosts } from '@workspace/api-client-react';
import { Clock, ArrowRight } from 'lucide-react';

import blog1 from '@assets/generated_images/blog-1.jpg';
import blog2 from '@assets/generated_images/blog-2.jpg';
import blog3 from '@assets/generated_images/blog-3.jpg';
import blog4 from '@assets/generated_images/blog-4.jpg';

const ALL_IMAGES = [blog1, blog2, blog3, blog4];

const CATEGORIES = [
  { label: 'All Posts',   value: 'All' },
  { label: 'AI Search',   value: 'AI Search' },
  { label: 'Business',    value: 'Business' },
  { label: 'Company',     value: 'Company' },
  { label: 'Development', value: 'Development' },
  { label: 'E-Commerce',  value: 'E-Commerce' },
  { label: 'WordPress',   value: 'WordPress' },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/* word-reveal helper */
function WordReveal({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* card stagger variants */
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

const sidebarVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};
const sidebarItem = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as any } },
};

export function Blog() {
  const { data: posts } = useGetBlogPosts();
  const [activeCategory, setActiveCategory] = useState('All');

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY      = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const filtered = posts?.filter(p =>
    activeCategory === 'All'
      ? true
      : p.tags.some(t => t.toLowerCase().includes(activeCategory.toLowerCase()))
  ) ?? [];

  const counts: Record<string, number> = { All: posts?.length ?? 0 };
  CATEGORIES.slice(1).forEach(cat => {
    counts[cat.value] =
      posts?.filter(p =>
        p.tags.some(t => t.toLowerCase().includes(cat.value.toLowerCase()))
      ).length ?? 0;
  });

  return (
    <div className="w-full bg-[#080E14]">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="pt-28 pb-24 relative overflow-hidden border-b border-white/5">

        {/* ambient glow */}
        <motion.div
          className="absolute top-0 left-0 w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse,rgba(0,220,185,0.07) 0%,transparent 70%)' }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse,rgba(255,107,53,0.05) 0%,transparent 70%)' }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto px-6 md:px-12 relative z-10"
        >
          {/* SIG label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 font-mono text-xs text-dever-teal uppercase tracking-widest mb-8"
          >
            <motion.span
              className="block h-px bg-dever-teal"
              initial={{ width: 0 }}
              animate={{ width: 24 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            />
            SIG.13 / BLOG
          </motion.div>

          {/* Headline */}
          <h1 className="font-display font-bold leading-[1.05] mb-6 max-w-2xl">
            <span className="block text-white text-5xl md:text-6xl">
              <WordReveal text="Insights on AI," delay={0.1} />
            </span>
            <span className="block text-5xl md:text-6xl mt-1">
              <motion.span
                className="inline-block text-dever-teal underline decoration-dever-teal/40 underline-offset-4"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.38 }}
              >
                Web
              </motion.span>
              <motion.span
                className="inline-block text-white mx-2"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.44 }}
              >
                and
              </motion.span>
              <motion.span
                className="inline-block text-dever-orange"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.50 }}
              >
                Search.
              </motion.span>
            </span>
          </h1>

          {/* animated underline */}
          <motion.div
            className="h-px bg-gradient-to-r from-dever-teal/50 via-dever-teal/15 to-transparent max-w-2xl mb-7"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.65 }}
          />

          {/* Subheading */}
          <motion.p
            className="text-lg text-dever-muted leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            <span className="text-white underline decoration-white/20 underline-offset-2 hover:decoration-dever-teal/60 hover:text-dever-teal transition-colors cursor-pointer">
              Expert guides on AEO
            </span>
            , AI optimisation, Shopify, WordPress and{' '}
            <span className="text-white underline decoration-white/20 underline-offset-2 hover:decoration-dever-teal/60 hover:text-dever-teal transition-colors cursor-pointer">
              everything that shapes the modern web
            </span>
            .
          </motion.p>
        </motion.div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex gap-12 items-start">

            {/* ── Article grid ─────────────────────────────────────────── */}
            <div className="flex-1 min-w-0">
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-20 text-center"
                >
                  <p className="text-dever-muted mb-4">No articles in this category yet.</p>
                  <button
                    onClick={() => setActiveCategory('All')}
                    className="text-dever-teal text-sm hover:underline"
                  >
                    Show all articles
                  </button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filtered.map((post, idx) => (
                    <motion.div
                      key={post.id}
                      custom={idx}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: '-50px' }}
                      whileHover={{ y: -5, transition: { duration: 0.25 } }}
                    >
                      <Link href={`/blog/${post.slug}`} className="block group h-full">
                        <article className="bg-[#0A1220] border border-white/5 rounded-xl overflow-hidden group-hover:border-white/12 group-hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.6)] transition-all duration-400 h-full flex flex-col">

                          {/* Thumbnail */}
                          <div className="aspect-[16/9] overflow-hidden relative bg-[#0c1525]">
                            <img
                              src={ALL_IMAGES[idx % ALL_IMAGES.length]}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            {/* subtle dark overlay that lifts on hover */}
                            <div className="absolute inset-0 bg-[#080E14]/20 group-hover:bg-[#080E14]/0 transition-colors duration-500" />
                          </div>

                          {/* Content */}
                          <div className="p-6 flex flex-col flex-1">
                            {/* Category */}
                            <div className="font-mono text-[10px] uppercase tracking-widest text-dever-teal mb-3">
                              {post.tags[0] ?? 'General'}
                            </div>

                            {/* Title */}
                            <h2 className="text-base md:text-[1.05rem] font-display font-bold text-white leading-snug mb-3 group-hover:text-dever-teal transition-colors duration-300 line-clamp-3">
                              {post.title}
                            </h2>

                            {/* Excerpt */}
                            <p className="text-sm text-dever-muted leading-relaxed line-clamp-3 flex-1 mb-5">
                              {post.excerpt}
                            </p>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                              <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-dever-orange">
                                Read More
                                <motion.span
                                  className="inline-block"
                                  initial={{ x: 0 }}
                                  whileHover={{ x: 3 }}
                                >
                                  <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-200" />
                                </motion.span>
                              </span>
                              <div className="flex items-center gap-2 font-mono text-[10px] text-dever-muted uppercase tracking-wider">
                                <span>{formatDate(post.publishedAt)}</span>
                                <span className="w-0.5 h-0.5 rounded-full bg-white/25" />
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

            {/* ── Sidebar ──────────────────────────────────────────────── */}
            <motion.aside
              className="hidden lg:block w-60 shrink-0 sticky top-24"
              variants={sidebarVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
            >
              {/* Categories */}
              <div className="mb-10">
                <motion.div
                  variants={sidebarItem}
                  className="font-mono text-[10px] uppercase tracking-widest text-dever-muted mb-3 pb-2 border-b border-white/5"
                >
                  Categories
                </motion.div>
                <ul className="space-y-px">
                  {CATEGORIES.map(cat => {
                    const count = counts[cat.value] ?? 0;
                    const isActive = activeCategory === cat.value;
                    return (
                      <motion.li key={cat.value} variants={sidebarItem}>
                        <button
                          onClick={() => setActiveCategory(cat.value)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                            isActive
                              ? 'bg-dever-teal/10 text-dever-teal border-l-2 border-dever-teal pl-[10px]'
                              : 'text-dever-muted hover:text-white hover:bg-white/4 border-l-2 border-transparent pl-[10px]'
                          }`}
                        >
                          <span>{cat.label}</span>
                          <span className={`font-mono text-xs tabular-nums ${isActive ? 'text-dever-teal' : 'text-white/25'}`}>
                            {count}
                          </span>
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>

              {/* Recent Posts */}
              <div>
                <motion.div
                  variants={sidebarItem}
                  className="font-mono text-[10px] uppercase tracking-widest text-dever-muted mb-3 pb-2 border-b border-white/5"
                >
                  Recent Posts
                </motion.div>
                <ul className="space-y-4">
                  {(posts ?? []).slice(0, 4).map((post, idx) => (
                    <motion.li key={post.id} variants={sidebarItem}>
                      <Link href={`/blog/${post.slug}`} className="flex gap-3 group">
                        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[#0A1220] border border-white/5">
                          <img
                            src={ALL_IMAGES[idx % ALL_IMAGES.length]}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-white group-hover:text-dever-teal transition-colors duration-200 line-clamp-2 leading-snug mb-1">
                            {post.title}
                          </p>
                          <p className="font-mono text-[10px] text-dever-muted uppercase tracking-wider">
                            {formatDate(post.publishedAt)}
                          </p>
                        </div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.aside>

          </div>
        </div>
      </section>
    </div>
  );
}

import React, { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useGetBlogPosts } from '@workspace/api-client-react';
import { Clock, ArrowRight, Tag } from 'lucide-react';

import blog1 from '@assets/generated_images/blog-1.jpg';
import blog2 from '@assets/generated_images/blog-2.jpg';
import blog3 from '@assets/generated_images/blog-3.jpg';
import blog4 from '@assets/generated_images/blog-4.jpg';

const ALL_IMAGES = [blog1, blog2, blog3, blog4];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const AUTHORS = [
  { name: 'Sheeraz Afzal', role: 'CEO & Co-Founder' },
  { name: 'Alina', role: 'CTO' },
  { name: 'Tahira', role: 'Full Stack Developer' },
];

const ALL_TAGS = ['All', 'AI Search', 'Web Design', 'Development', 'Shopify', 'SEO'];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function Blog() {
  const { data: posts } = useGetBlogPosts();
  const [activeTag, setActiveTag] = useState('All');

  const filteredPosts = posts?.filter(p =>
    activeTag === 'All' ? true : p.tags.some(t => t.toLowerCase().includes(activeTag.toLowerCase()))
  );

  const featuredPost = filteredPosts?.[0];
  const restPosts = filteredPosts?.slice(1) ?? [];

  return (
    <div className="w-full">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-28 pb-20 relative overflow-hidden bg-[#080E14] border-b border-white/5">
        <div className="absolute top-0 right-1/3 w-[600px] h-[400px] rounded-full bg-dever-orange/6 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-dever-teal/5 blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-3xl"
          >
            <div className="font-mono text-xs text-dever-teal uppercase tracking-widest mb-6">
              SIG.15 / BLOG
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-6">
              <span className="block text-white">Insights.</span>
              <span className="block text-gradient-orange">Build better.</span>
            </h1>
            <p className="text-xl text-dever-muted leading-relaxed mb-10">
              Thoughts on design, development, AI search optimization, and building digital
              products that perform.
            </p>

            {/* Tag filters */}
            <div className="flex flex-wrap gap-3">
              {ALL_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                    activeTag === tag
                      ? 'bg-white/10 border border-dever-orange text-white shadow-[0_0_15px_-5px_rgba(255,107,53,0.3)]'
                      : 'border border-white/10 text-dever-muted hover:border-white/25 hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured post ─────────────────────────────────────────── */}
      {featuredPost && (
        <section className="py-16 bg-[#0A1220]">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div {...fadeInUp} className="mb-8">
              <span className="font-mono text-xs text-dever-orange uppercase tracking-widest">Featured Article</span>
            </motion.div>
            <motion.div {...fadeInUp}>
              <Link href={`/blog/${featuredPost.slug}`} className="block group">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-[#080E14] border border-white/5 rounded-2xl overflow-hidden hover:border-dever-orange/30 hover:shadow-[0_0_50px_-15px_rgba(255,107,53,0.2)] transition-all">
                  {/* Image */}
                  <div className="aspect-[16/10] lg:aspect-auto lg:h-full relative overflow-hidden bg-[#0A1220] min-h-[280px]">
                    <div className="absolute inset-0 bg-dever-orange/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <img
                      src={ALL_IMAGES[0]}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#080E14]/60" />
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-5">
                      {featuredPost.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono uppercase tracking-wider text-dever-teal bg-dever-teal/10 border border-dever-teal/20 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 leading-tight group-hover:text-dever-orange transition-colors">
                      {featuredPost.title}
                    </h2>

                    <p className="text-dever-muted leading-relaxed mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-mono text-dever-muted uppercase tracking-wider mb-6">
                      <span>{formatDate(featuredPost.publishedAt)}</span>
                      <span className="w-1 h-1 rounded-full bg-dever-muted/50" />
                      <span className="flex items-center gap-1.5">
                        <Clock size={11} /> {featuredPost.readingTime} min read
                      </span>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                      <div className="w-8 h-8 rounded-full bg-dever-teal/20 border border-dever-teal/30 flex items-center justify-center text-dever-teal font-mono text-xs font-bold">
                        {AUTHORS[0].name[0]}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">{AUTHORS[0].name}</div>
                        <div className="text-[10px] text-dever-muted font-mono uppercase tracking-wider">{AUTHORS[0].role}</div>
                      </div>
                      <span className="ml-auto inline-flex items-center gap-1.5 text-dever-orange text-xs font-semibold group-hover:gap-2.5 transition-all">
                        Read Article <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Article grid ─────────────────────────────────────────── */}
      {restPosts.length > 0 && (
        <section className="py-12 pb-24 bg-[#0A1220]">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {restPosts.map((post, idx) => {
                const author = AUTHORS[idx % AUTHORS.length];
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: idx * 0.06 }}
                  >
                    <Link href={`/blog/${post.slug}`} className="block group h-full">
                      <article className="bg-[#080E14] border border-white/5 rounded-2xl overflow-hidden hover:border-dever-orange/25 hover:shadow-[0_0_30px_-10px_rgba(255,107,53,0.15)] transition-all h-full flex flex-col">
                        {/* Thumbnail */}
                        <div className="aspect-[16/10] overflow-hidden relative bg-[#0A1220]">
                          <div className="absolute inset-0 bg-dever-orange/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                          <img
                            src={ALL_IMAGES[(idx + 1) % ALL_IMAGES.length]}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1">
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {post.tags.slice(0, 2).map(tag => (
                              <span
                                key={tag}
                                className="text-[9px] font-mono uppercase tracking-wider text-dever-teal bg-dever-teal/8 border border-dever-teal/15 px-2 py-1 rounded flex items-center gap-1"
                              >
                                <Tag size={8} /> {tag}
                              </span>
                            ))}
                          </div>

                          <h2 className="text-lg font-display font-bold text-white mb-3 group-hover:text-dever-orange transition-colors line-clamp-2 leading-tight">
                            {post.title}
                          </h2>

                          <p className="text-dever-muted text-sm line-clamp-2 mb-4 leading-relaxed flex-1">
                            {post.excerpt}
                          </p>

                          {/* Meta */}
                          <div className="flex items-center gap-3 text-[10px] font-mono text-dever-muted uppercase tracking-wider mb-4">
                            <span>{formatDate(post.publishedAt)}</span>
                            <span className="w-0.5 h-0.5 rounded-full bg-dever-muted/50" />
                            <span className="flex items-center gap-1">
                              <Clock size={9} /> {post.readingTime} min
                            </span>
                          </div>

                          {/* Author */}
                          <div className="flex items-center gap-2.5 pt-4 border-t border-white/5">
                            <div className="w-7 h-7 rounded-full bg-dever-teal/15 border border-dever-teal/25 flex items-center justify-center text-dever-teal font-mono text-[10px] font-bold">
                              {author.name[0]}
                            </div>
                            <div>
                              <div className="text-[10px] font-semibold text-white leading-none mb-0.5">{author.name}</div>
                              <div className="text-[9px] text-dever-muted font-mono uppercase tracking-wider">{author.role}</div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── No posts fallback ─────────────────────────────────────── */}
      {filteredPosts?.length === 0 && (
        <section className="py-32 bg-[#0A1220]">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <p className="text-dever-muted text-lg mb-4">No articles match this filter yet.</p>
            <button
              onClick={() => setActiveTag('All')}
              className="text-dever-teal text-sm hover:underline"
            >
              Show all articles
            </button>
          </div>
        </section>
      )}

      {/* ── Newsletter / CTA ─────────────────────────────────────── */}
      <section className="py-24 bg-[#080E14] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[400px] rounded-full bg-dever-orange/5 blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div {...fadeInUp}>
            <div className="font-mono text-xs text-dever-orange uppercase tracking-widest mb-6">
              STAY SHARP
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Get the latest insights.
            </h2>
            <p className="text-dever-muted text-lg mb-10 max-w-md mx-auto">
              Design, dev, and AI search tips — straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-xl bg-[#0A1220] border border-white/10 text-white placeholder:text-dever-muted text-sm focus:outline-none focus:border-dever-orange/50 transition-colors"
              />
              <button className="px-6 py-3.5 rounded-xl bg-dever-orange text-white font-semibold text-sm hover:brightness-110 transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

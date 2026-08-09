import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useGetBlogPosts } from '@workspace/api-client-react';

import blog1 from '@assets/generated_images/blog-1.jpg';
import blog2 from '@assets/generated_images/blog-2.jpg';
import blog3 from '@assets/generated_images/blog-3.jpg';
import blog4 from '@assets/generated_images/blog-4.jpg';

const ALL_IMAGES = [blog1, blog2, blog3, blog4];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { staggerChildren: 0.1 }
};

export function Blog() {
  const { data: posts } = useGetBlogPosts();

  return (
    <div className="w-full pb-32">
      {/* Header */}
      <section className="pt-24 pb-16 relative z-10 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <div className="font-mono text-xs text-dever-teal uppercase tracking-widest mb-6">SIG.15 / BLOG</div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6">
              <span className="block text-white">Insights.</span>
              <span className="block text-gradient-orange">Build better.</span>
            </h1>
            <p className="text-lg text-dever-muted leading-relaxed">
              Thoughts on design, development, AI search optimization, and building digital products that perform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          >
            {posts?.map((post, idx) => (
              <motion.div key={post.id} variants={fadeInUp}>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <div className="aspect-[16/10] overflow-hidden rounded-2xl mb-6 relative border border-white/5 bg-[#0A1220]">
                    <div className="absolute inset-0 bg-dever-orange/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <img 
                      src={ALL_IMAGES[idx % ALL_IMAGES.length]} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] font-mono uppercase tracking-wider text-dever-teal bg-dever-teal/10 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h2 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-dever-teal transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h2>
                  
                  <p className="text-dever-muted text-sm line-clamp-2 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs font-mono text-dever-muted uppercase tracking-wider">
                    <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="w-1 h-1 rounded-full bg-dever-muted/50" />
                    <span>{post.readingTime} min read</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

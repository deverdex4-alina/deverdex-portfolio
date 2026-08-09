import React from 'react';
import { useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { useGetBlogPost } from '@workspace/api-client-react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

import blog1 from '@assets/generated_images/blog-1.jpg';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export function BlogPost() {
  const [, params] = useRoute('/blog/:slug');
  const slug = params?.slug || '';
  
  const { data: post, isLoading } = useGetBlogPost(slug, { 
    query: { 
      enabled: !!slug,
      queryKey: ['blog', slug] // Orval generated hook needs correct query key but we just pass array
    } 
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-dever-teal">Loading...</div>;
  }

  if (!post) {
    return <div className="min-h-screen flex items-center justify-center text-white">Post not found</div>;
  }

  return (
    <div className="w-full pb-32">
      <article className="pt-24 relative z-10">
        <div className="max-w-3xl mx-auto px-6 md:px-0">
          
          <motion.div {...fadeInUp}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-mono text-dever-muted hover:text-white transition-colors mb-12 uppercase tracking-wider">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
              {post.tags.map(tag => (
                <span key={tag} className="text-[10px] font-mono uppercase tracking-wider text-dever-teal bg-dever-teal/10 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-[1.1]">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-xs font-mono text-dever-muted uppercase tracking-wider mb-12">
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className="w-1 h-1 rounded-full bg-dever-muted/50" />
              <span>{post.readingTime} min read</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="aspect-video w-full rounded-2xl overflow-hidden mb-16 border border-white/10"
          >
            <img src={blog1} alt={post.title} className="w-full h-full object-cover" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-dever-teal prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
        </div>
      </article>
    </div>
  );
}

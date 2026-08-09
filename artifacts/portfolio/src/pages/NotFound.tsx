import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

export function NotFound() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center pb-32">
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-mono text-sm text-dever-teal uppercase tracking-widest mb-4">ERROR 404</div>
          <h1 className="text-6xl md:text-9xl font-display font-bold text-white mb-6 tracking-tighter">
            <span className="text-gradient-orange">Lost</span> in Space.
          </h1>
          <p className="text-xl text-dever-muted max-w-lg mx-auto mb-10">
            The page you're looking for doesn't exist, has been moved, or is currently adrift in the digital void.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-full transition-all"
          >
            Return to Base
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

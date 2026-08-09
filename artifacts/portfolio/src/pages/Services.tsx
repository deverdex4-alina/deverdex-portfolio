import React from 'react';
import { motion } from 'framer-motion';
import { useGetServices } from '@workspace/api-client-react';
import { Check } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export function Services() {
  const { data: services } = useGetServices();

  return (
    <div className="w-full pb-32">
      {/* Header */}
      <section className="pt-24 pb-20 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="font-mono text-xs text-dever-teal uppercase tracking-widest mb-6">SIG.02 / SERVICES</div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-8">
              <span className="block text-white">Every Platform.</span>
              <span className="block text-gradient-teal">Built to Perform.</span>
            </h1>
            <p className="text-lg text-dever-muted leading-relaxed">
              Whatever you need built, we do it right — fast delivery, beautiful design, AI search visibility, and real support after launch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col gap-32 relative z-10">
          {services?.map((service, idx) => (
            <motion.section 
              key={service.id}
              id={service.slug}
              {...fadeInUp}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 pt-16 border-t border-white/5"
            >
              {/* Info Side */}
              <div>
                <div className="font-mono text-xs text-dever-muted uppercase tracking-widest mb-6">SIG.02{String.fromCharCode(97 + idx)} / {service.category}</div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                  {service.name.split(' ')[0]} <span className="text-dever-teal">{service.name.split(' ').slice(1).join(' ')}</span>
                </h2>
                <p className="text-dever-muted leading-relaxed mb-10 text-lg">
                  {service.description}
                </p>
                
                <ul className="space-y-4">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-sm text-white">
                      <Check className="text-dever-teal shrink-0 mt-0.5" size={16} />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing Side */}
              <div className="bg-[#0A1220] border border-[#1A2639] rounded-2xl overflow-hidden h-fit">
                <div className="bg-[#0D1726] border-b border-[#1A2639] px-8 py-5">
                  <span className="font-mono text-xs text-dever-teal uppercase tracking-widest">PACKAGES</span>
                </div>
                
                <div className="divide-y divide-[#1A2639]">
                  {service.packages.map((pkg, pIdx) => (
                    <div key={pIdx} className="flex items-center justify-between p-8 hover:bg-white/5 transition-colors">
                      <span className="font-mono text-sm text-dever-muted uppercase tracking-wider">{pkg.name}</span>
                      <div className="text-right">
                        <div className="font-display font-bold text-white">{pkg.price}</div>
                        {pkg.delivery && <div className="text-xs text-dever-muted mt-1">{pkg.delivery}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}

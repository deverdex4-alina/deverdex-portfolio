import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSubmitContact } from '@workspace/api-client-react';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin, Phone } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(10, 'Message is required'),
});

type FormValues = z.infer<typeof formSchema>;

export function Contact() {
  const { toast } = useToast();
  const submitContact = useSubmitContact();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  function onSubmit(data: FormValues) {
    submitContact.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: 'Message sent!',
            description: "We'll get back to you as soon as possible.",
          });
          form.reset();
        },
        onError: () => {
          toast({
            title: 'Error',
            description: 'Failed to send message. Please try again.',
            variant: 'destructive',
          });
        },
      }
    );
  }

  return (
    <div className="w-full pb-32">
      <section className="pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <div className="font-mono text-xs text-dever-teal uppercase tracking-widest mb-6">SIG.98 / CONTACT</div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6">
              <span className="text-white">Get in </span>
              <span className="text-gradient-orange">touch.</span>
            </h1>
            <p className="text-lg text-dever-muted leading-relaxed">
              Have a general inquiry or just want to say hi? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-4 space-y-8"
            >
              <div className="bg-[#0A1220] border border-[#1A2639] rounded-2xl p-8">
                <div className="w-12 h-12 bg-dever-teal/10 rounded-xl flex items-center justify-center text-dever-teal mb-6">
                  <Mail />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">Email us</h3>
                <p className="text-dever-muted text-sm mb-4">For general inquiries and support.</p>
                <a href="mailto:hello@deverdex.com" className="text-dever-teal hover:underline font-mono text-sm">hello@deverdex.com</a>
              </div>

              <div className="bg-[#0A1220] border border-[#1A2639] rounded-2xl p-8">
                <div className="w-12 h-12 bg-dever-orange/10 rounded-xl flex items-center justify-center text-dever-orange mb-6">
                  <MapPin />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">Visit us</h3>
                <p className="text-dever-muted text-sm mb-4">Our global HQ.</p>
                <address className="text-white/80 not-italic text-sm leading-relaxed">
                  100 Tech Hub Blvd<br />
                  Suite 400<br />
                  San Francisco, CA 94107
                </address>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-8 bg-[#0A1220] border border-[#1A2639] rounded-3xl p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-dever-orange/5 rounded-full blur-[100px] pointer-events-none" />
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70">Name</FormLabel>
                          <FormControl>
                            <input 
                              {...field} 
                              className="w-full bg-[#080E14] border border-[#1A2639] rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-dever-teal transition-colors"
                              placeholder="John Doe"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/70">Email</FormLabel>
                          <FormControl>
                            <input 
                              {...field} 
                              type="email"
                              className="w-full bg-[#080E14] border border-[#1A2639] rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-dever-teal transition-colors"
                              placeholder="john@company.com"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70">Subject</FormLabel>
                        <FormControl>
                          <input 
                            {...field} 
                            className="w-full bg-[#080E14] border border-[#1A2639] rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-dever-teal transition-colors"
                            placeholder="How can we help?"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70">Message</FormLabel>
                        <FormControl>
                          <textarea 
                            {...field} 
                            rows={6}
                            className="w-full bg-[#080E14] border border-[#1A2639] rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-dever-teal transition-colors resize-none"
                            placeholder="Your message here..."
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />

                  <button 
                    type="submit"
                    disabled={submitContact.isPending}
                    className="bg-white text-[#080E14] hover:bg-white/90 font-bold px-10 py-4 rounded-lg transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                  >
                    {submitContact.isPending ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </Form>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}

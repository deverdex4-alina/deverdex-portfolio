import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSubmitQuote } from '@workspace/api-client-react';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2 } from 'lucide-react';

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
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Please tell us a bit more about your project'),
});

type FormValues = z.infer<typeof formSchema>;

const SERVICES = ['Web Design', 'Web Development', 'E-commerce', 'Mobile App', 'SEO / AEO', 'Other'];
const BUDGETS = ['Under $5k', '$5k - $10k', '$10k - $25k', '$25k - $50k', '$50k+'];

export function GetAQuote() {
  const { toast } = useToast();
  const submitQuote = useSubmitQuote();
  const [isSuccess, setIsSuccess] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      service: '',
      budget: '',
      message: '',
    },
  });

  function onSubmit(data: FormValues) {
    submitQuote.mutate(
      { data },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
        onError: () => {
          toast({
            title: 'Something went wrong',
            description: 'Please try again later or email us directly.',
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Info Side */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="font-mono text-xs text-dever-teal uppercase tracking-widest mb-6">SIG.99 / GET A QUOTE</div>
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6">
                <span className="block text-white">Let's build</span>
                <span className="block text-gradient-teal">something great.</span>
              </h1>
              <p className="text-lg text-dever-muted leading-relaxed mb-12 max-w-md">
                Tell us about your project, timeline, and goals. We'll get back to you within 24 hours with a tailored proposal.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-mono text-white uppercase tracking-wider mb-2">What happens next?</h3>
                  <ol className="space-y-4 text-dever-muted text-sm mt-4">
                    <li className="flex gap-3">
                      <span className="font-mono text-dever-teal">01.</span>
                      <span>We review your requirements and assess fit.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-mono text-dever-teal">02.</span>
                      <span>We jump on a quick discovery call.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-mono text-dever-teal">03.</span>
                      <span>You receive a detailed proposal and timeline.</span>
                    </li>
                  </ol>
                </div>
              </div>
            </motion.div>

            {/* Form Side */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#0A1220] border border-[#1A2639] rounded-3xl p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-dever-teal/5 rounded-full blur-[80px] pointer-events-none" />
              
              {isSuccess ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center relative z-10">
                  <div className="w-20 h-20 bg-dever-teal/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-dever-teal" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">Request Sent!</h3>
                  <p className="text-dever-muted mb-8 max-w-sm">
                    Thank you for reaching out. We've received your project details and will be in touch within 24 hours.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="text-sm font-semibold text-white border border-white/20 px-6 py-3 rounded-full hover:bg-white/5 transition-colors"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <div className="relative z-10">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/70">Company (Optional)</FormLabel>
                            <FormControl>
                              <input 
                                {...field} 
                                className="w-full bg-[#080E14] border border-[#1A2639] rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-dever-teal transition-colors"
                                placeholder="Acme Inc."
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="service"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/70">Service Needed</FormLabel>
                              <FormControl>
                                <select 
                                  {...field}
                                  className="w-full bg-[#080E14] border border-[#1A2639] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-dever-teal transition-colors appearance-none"
                                >
                                  <option value="" disabled>Select a service</option>
                                  {SERVICES.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                  ))}
                                </select>
                              </FormControl>
                              <FormMessage className="text-red-400 text-xs" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/70">Estimated Budget</FormLabel>
                              <FormControl>
                                <select 
                                  {...field}
                                  className="w-full bg-[#080E14] border border-[#1A2639] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-dever-teal transition-colors appearance-none"
                                >
                                  <option value="" disabled>Select a range</option>
                                  {BUDGETS.map(b => (
                                    <option key={b} value={b}>{b}</option>
                                  ))}
                                </select>
                              </FormControl>
                              <FormMessage className="text-red-400 text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/70">Project Details</FormLabel>
                            <FormControl>
                              <textarea 
                                {...field} 
                                rows={5}
                                className="w-full bg-[#080E14] border border-[#1A2639] rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-dever-teal transition-colors resize-none"
                                placeholder="Tell us about your goals, timeline, and any specific requirements..."
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )}
                      />

                      <button 
                        type="submit"
                        disabled={submitQuote.isPending}
                        className="w-full bg-[#00DCB9] hover:bg-[#00A88D] text-[#080E14] font-bold py-4 rounded-lg transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitQuote.isPending ? 'Submitting...' : 'Submit Request'}
                      </button>
                    </form>
                  </Form>
                </div>
              )}
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}

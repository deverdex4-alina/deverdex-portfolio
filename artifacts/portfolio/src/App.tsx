import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

// Layout
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Pages
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Services } from '@/pages/Services';
import { Portfolio } from '@/pages/Portfolio';
import { Experiments } from '@/pages/Experiments';
import { Blog } from '@/pages/Blog';
import { BlogPost } from '@/pages/BlogPost';
import { GetAQuote } from '@/pages/GetAQuote';
import { Contact } from '@/pages/Contact';
import { NotFound } from '@/pages/NotFound';

const queryClient = new QueryClient();

// Page transition wrapper
function PageWrapper({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <motion.div
      key={location}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex-grow pt-24 min-h-[100dvh]"
    >
      {children}
    </motion.div>
  );
}

function AppRouter() {
  const [location] = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen selection:bg-dever-teal/30 selection:text-white relative bg-[#080E14] text-[#F0F4FF]">
      <Navbar />
      <AnimatePresence mode="wait">
        <PageWrapper>
          <Switch location={location} key={location}>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/services" component={Services} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/experiments" component={Experiments} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/:slug" component={BlogPost} />
            <Route path="/get-a-quote" component={GetAQuote} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </PageWrapper>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <AppRouter />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

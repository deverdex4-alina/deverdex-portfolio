import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';

// Layout
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Pages
import { Home } from '@/pages/Home';
import { Services } from '@/pages/Services';
import { WebDesign } from '@/pages/WebDesign';
import { WebDevelopment } from '@/pages/WebDevelopment';
import { MobileApps } from '@/pages/MobileApps';
import { Branding } from '@/pages/Branding';
import { Work } from '@/pages/Work';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { NotFound } from '@/pages/NotFound';

const queryClient = new QueryClient();

function AppRouter() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <main className="flex-grow pt-24">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/services/web-design" component={WebDesign} />
          <Route path="/services/web-development" component={WebDevelopment} />
          <Route path="/services/mobile-apps" component={MobileApps} />
          <Route path="/services/branding" component={Branding} />
          <Route path="/work" component={Work} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
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

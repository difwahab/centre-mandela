import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import DoctorLogin from "@/pages/DoctorLogin";
import DoctorDashboard from "@/pages/DoctorDashboard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/BackToTop";
import { useAuth, AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ComponentType } from "react";

type ProtectedRouteProps = {
  component: ComponentType;
};

function ProtectedRoute({ component: Component }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return user ? <Component /> : <DoctorLogin />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/espace-medecins/login" component={DoctorLogin} />
      <Route path="/espace-medecins/dashboard">
        <ProtectedRoute component={DoctorDashboard} />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  return (
    <TooltipProvider>
      <Header />
      <main>
        <Router />
      </main>
      <Footer />
      <BackToTop />
      <Toaster />
    </TooltipProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;

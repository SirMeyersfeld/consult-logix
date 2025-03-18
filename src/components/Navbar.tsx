
import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { LogIn, LogOut, Menu, X, User, Calendar, Activity, LayoutDashboard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const email = localStorage.getItem('userEmail') || '';
    
    setIsAuthenticated(authStatus);
    setUserEmail(email);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserEmail('');
    toast.success('You have been signed out');
    navigate('/');
  };

  const navItems = [
    { path: '/', label: 'Home' },
  ];

  const authenticatedNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { path: '/consultation', label: 'Consultation', icon: <User className="h-4 w-4" /> },
    { path: '/prescription', label: 'Prescription', icon: <FileText className="h-4 w-4" /> },
    { path: '/appointments', label: 'Appointments', icon: <Calendar className="h-4 w-4" /> },
    { path: '/activity', label: 'Activity', icon: <Activity className="h-4 w-4" /> },
    { path: '/mediport', label: 'MediPort', icon: <MedicalBag className="h-4 w-4" /> },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out px-6 md:px-10 py-4",
        scrolled 
          ? "bg-white bg-opacity-90 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <NavLink 
          to="/" 
          className="flex items-center gap-2"
        >
          <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-primary/10">
            <div className="absolute w-3 h-3 rounded-full bg-primary animate-pulse-subtle" />
          </div>
          <span className="text-xl font-semibold">MediLog</span>
        </NavLink>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "relative text-sm font-medium transition-all duration-200 hover:text-primary",
                isActive ? "text-primary" : "text-foreground/80"
              )}
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          
          {isAuthenticated && authenticatedNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "relative text-sm font-medium transition-all duration-200 hover:text-primary",
                isActive ? "text-primary" : "text-foreground/80"
              )}
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId={`nav-indicator-${item.path}`}
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{userEmail}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => navigate('/sign-in')}
              className="bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-1"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </Button>
          )}
        </div>

        <button 
          className="block md:hidden" 
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg p-6 z-50"
        >
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "text-base py-2 font-medium transition-all duration-200 hover:text-primary",
                  isActive ? "text-primary" : "text-foreground/80"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            
            {isAuthenticated && authenticatedNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "text-base py-2 font-medium transition-all duration-200 hover:text-primary flex items-center gap-2",
                  isActive ? "text-primary" : "text-foreground/80"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
            
            <div className="pt-4 border-t border-gray-100">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">{userEmail}</div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => {
                    navigate('/sign-in');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-center"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

// FileText icon component
const FileText = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
);

// MedicalBag icon component
const MedicalBag = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="8" width="16" height="12" rx="2"/>
    <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="16"/>
    <line x1="10" y1="14" x2="14" y2="14"/>
  </svg>
);

export default Navbar;

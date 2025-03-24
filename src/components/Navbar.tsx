
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from '@/lib/utils';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const navigationGroups = [
    {
      title: "Home",
      links: [{ href: "/", title: "Home Page" }]
    },
    {
      title: "Dashboard",
      links: [
        { href: "/dashboard", title: "User Dashboard" },
        { href: "/health-dashboard", title: "Health Dashboard" },
      ]
    },
    {
      title: "Health Records",
      links: [
        { href: "/medical-records", title: "Medical Records" },
        { href: "/family-health-records", title: "Family Health Records" },
        { href: "/treatment-timeline", title: "Treatment Timeline" },
        { href: "/medical-history-timeline", title: "Medical History" },
        { href: "/lab-results", title: "Lab Results" },
        { href: "/vaccinations", title: "Vaccinations" },
        { href: "/documents", title: "Documents" }
      ]
    },
    {
      title: "Medications",
      links: [
        { href: "/medications", title: "My Medications" },
        { href: "/medication-reminders", title: "Medication Reminders" },
        { href: "/add-medication", title: "Add Medication" },
        { href: "/medication-interactions", title: "Medication Interactions" },
        { href: "/prescription", title: "Prescription" }
      ]
    },
    {
      title: "Care",
      links: [
        { href: "/appointments", title: "Appointments" },
        { href: "/appointment-scheduler", title: "Appointment Scheduler" },
        { href: "/specialist-referrals", title: "Specialist Referrals" },
        { href: "/telemedicine", title: "Telemedicine" },
        { href: "/consultation", title: "Consultation" },
        { href: "/doctor-finder", title: "Doctor Finder" },
        { href: "/health-checkup-reminders", title: "Checkup Reminders" }
      ]
    },
    {
      title: "Wellness",
      links: [
        { href: "/health-tracker", title: "Health Tracker" },
        { href: "/activity", title: "Activity" },
        { href: "/health-goals", title: "Health Goals" },
        { href: "/exercise-logging", title: "Exercise Logging" },
        { href: "/nutrition-exercise", title: "Nutrition & Exercise" },
        { href: "/symptom-checker", title: "Symptom Checker" },
        { href: "/wearable-integration", title: "Wearable Integration" }
      ]
    },
    {
      title: "Resources",
      links: [
        { href: "/health-tips", title: "Health Tips" },
        { href: "/health-news", title: "Health News" },
        { href: "/emergency-contacts", title: "Emergency Contacts" },
        { href: "/patient-community", title: "Patient Community" },
        { href: "/blog", title: "Blog" },
        { href: "/medical-expense-tracker", title: "Expense Tracker" }
      ]
    },
    {
      title: "Tools",
      links: [
        { href: "/mediport", title: "MediPort" },
        { href: "/profile", title: "My Profile" }
      ]
    },
    {
      title: "About",
      links: [
        { href: "/about", title: "About Us" },
        { href: "/how-it-works", title: "How It Works" },
        { href: "/features", title: "Features" },
        { href: "/faq", title: "FAQ" },
        { href: "/testimonials", title: "Testimonials" },
        { href: "/contact-form", title: "Contact Us" }
      ]
    },
    {
      title: "Subscription",
      links: [
        { href: "/subscription", title: "Subscription Plans" },
        { href: "/plan-comparison", title: "Plan Comparison" }
      ]
    }
  ];

  // Handle navigation and close mobile menu if open
  const handleNavigation = (path) => {
    navigate(path);
    // Close mobile menu if it's open (by clicking outside, handled by Sheet component)
  };

  // Check if a link is active
  const isActiveLink = (href) => {
    return location.pathname === href;
  };

  return (
    <div className="bg-background/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container py-4 px-4 mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-primary/10">
            <div className="absolute w-3 h-3 rounded-full bg-primary" />
          </div>
          <span className="text-xl font-semibold">MediLog</span>
        </Link>

        <div className="hidden md:flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-wrap justify-center gap-1">
                {navigationGroups.map((group) => (
                  <NavigationMenuItem key={group.title}>
                    {group.links.length === 1 ? (
                      <Link 
                        to={group.links[0].href} 
                        className={cn(
                          "text-sm font-medium transition-colors px-3 py-2",
                          isActiveLink(group.links[0].href) 
                            ? "text-primary font-semibold" 
                            : "text-gray-700 hover:text-primary"
                        )}
                      >
                        {group.title}
                      </Link>
                    ) : (
                      <>
                        <NavigationMenuTrigger 
                          className={cn(
                            "h-9 px-3",
                            group.links.some(link => isActiveLink(link.href)) && "text-primary font-semibold"
                          )}
                        >
                          {group.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[200px] gap-2 p-4 bg-background">
                            {group.links.map((link) => (
                              <li key={link.title}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={link.href}
                                    className={cn(
                                      "block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
                                      isActiveLink(link.href) && "bg-primary/10 text-primary font-medium"
                                    )}
                                  >
                                    {link.title}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {!isAuthenticated ? (
            <>
              <Button variant="outline" size="sm" onClick={() => navigate('/sign-in')}>Sign In</Button>
              <Button size="sm" onClick={() => navigate('/sign-up')}>Sign Up</Button>
            </>
          ) : (
            <Button size="sm" onClick={() => {
              localStorage.removeItem('isAuthenticated');
              localStorage.removeItem('userEmail');
              localStorage.removeItem('userName');
              navigate('/sign-in');
            }}>Sign Out</Button>
          )}
        </div>

        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="sm:w-2/3 md:w-1/2 bg-background">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Explore MediLog and manage your health.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col space-y-4 mt-6">
              <Command className="rounded-lg border shadow-md bg-background">
                <CommandInput placeholder="Search..." />
                <CommandList>
                  {navigationGroups.map((group) => (
                    <CommandGroup key={group.title} heading={group.title}>
                      {group.links.map((link) => (
                        <CommandItem 
                          key={link.title}
                          onSelect={() => handleNavigation(link.href)}
                          className="cursor-pointer"
                        >
                          <span className={cn(
                            isActiveLink(link.href) && "text-primary font-medium"
                          )}>{link.title}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                </CommandList>
              </Command>
              
              {!isAuthenticated ? (
                <>
                  <Button variant="outline" onClick={() => navigate('/sign-in')} className="w-full">Sign In</Button>
                  <Button onClick={() => navigate('/sign-up')} className="w-full">Sign Up</Button>
                </>
              ) : (
                <Button onClick={() => {
                  localStorage.removeItem('isAuthenticated');
                  localStorage.removeItem('userEmail');
                  localStorage.removeItem('userName');
                  navigate('/sign-in');
                }} className="w-full">Sign Out</Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

// Helper component for navigation menu items
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default Navbar;

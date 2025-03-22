
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { Menu } from "lucide-react";
import { cn } from '@/lib/utils';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

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
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors px-3 py-2">
                  Home
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/5 p-6 no-underline outline-none focus:shadow-md"
                          href="/features"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Features Overview
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Discover all the powerful features that MediLog offers for patients and doctors.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/health-dashboard" title="Health Dashboard">
                      Track your health metrics and see trends over time
                    </ListItem>
                    <ListItem href="/medication-reminders" title="Medication Reminders">
                      Never miss a dose with custom reminders
                    </ListItem>
                    <ListItem href="/telemedicine" title="Telemedicine">
                      Connect with doctors virtually from anywhere
                    </ListItem>
                    <ListItem href="/mediport" title="MediPort">
                      Your digital health passport for emergencies
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                    <ListItem href="/how-it-works" title="How It Works">
                      Step-by-step guide to using MediLog
                    </ListItem>
                    <ListItem href="/faq" title="FAQ">
                      Answers to common questions
                    </ListItem>
                    <ListItem href="/blog" title="Blog">
                      Health insights and articles
                    </ListItem>
                    <ListItem href="/health-tips" title="Health Tips">
                      Expert advice for better health
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Plans</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                    <ListItem href="/subscription" title="Subscription Plans">
                      Choose the right plan for you
                    </ListItem>
                    <ListItem href="/plan-comparison" title="Plan Comparison">
                      See detailed feature comparison
                    </ListItem>
                    <ListItem href="/testimonials" title="Testimonials">
                      What our users are saying
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors px-3 py-2">
                  About
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/contact-form" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors px-3 py-2">
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          {!isAuthenticated ? (
            <>
              <Button variant="outline" size="sm" onClick={() => navigate('/sign-in')}>Sign In</Button>
              <Button size="sm" onClick={() => navigate('/sign-up')}>Sign Up</Button>
            </>
          ) : (
            <Button size="sm" onClick={() => {
              localStorage.removeItem('isAuthenticated');
              navigate('/sign-in');
            }}>Sign Out</Button>
          )}
        </div>

        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="sm:w-2/3 md:w-1/2">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Explore MediLog and manage your health.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col space-y-4 mt-6">
              <Link to="/" className="text-lg font-medium text-gray-700 hover:text-primary transition-colors block py-2">Home</Link>
              <Link to="/features" className="text-lg font-medium text-gray-700 hover:text-primary transition-colors block py-2">Features</Link>
              <Link to="/how-it-works" className="text-lg font-medium text-gray-700 hover:text-primary transition-colors block py-2">How It Works</Link>
              <Link to="/plan-comparison" className="text-lg font-medium text-gray-700 hover:text-primary transition-colors block py-2">Plan Comparison</Link>
              <Link to="/blog" className="text-lg font-medium text-gray-700 hover:text-primary transition-colors block py-2">Blog</Link>
              <Link to="/testimonials" className="text-lg font-medium text-gray-700 hover:text-primary transition-colors block py-2">Testimonials</Link>
              <Link to="/faq" className="text-lg font-medium text-gray-700 hover:text-primary transition-colors block py-2">FAQ</Link>
              <Link to="/about" className="text-lg font-medium text-gray-700 hover:text-primary transition-colors block py-2">About</Link>
              <Link to="/contact-form" className="text-lg font-medium text-gray-700 hover:text-primary transition-colors block py-2">Contact</Link>
              <Link to="/dashboard" className="text-lg font-medium text-gray-700 hover:text-primary transition-colors block py-2">Dashboard</Link>
              
              {!isAuthenticated ? (
                <>
                  <Button variant="outline" onClick={() => navigate('/sign-in')} className="w-full">Sign In</Button>
                  <Button onClick={() => navigate('/sign-up')} className="w-full">Sign Up</Button>
                </>
              ) : (
                <Button onClick={() => {
                  localStorage.removeItem('isAuthenticated');
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

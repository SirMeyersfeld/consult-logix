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
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Health Dashboard", href: "/health-dashboard" },
    { name: "Health Tips", href: "/health-tips" },
    { name: "Medication Reminders", href: "/medication-reminders" },
    { name: "About", href: "/about" },
  ];

  return (
    <div className="bg-background/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container py-4 px-4 mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-primary/10">
            <div className="absolute w-3 h-3 rounded-full bg-primary" />
          </div>
          <span className="text-xl font-semibold">MediLog</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navigationLinks.map((link) => (
            <Link key={link.name} to={link.href} className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">{link.name}</Link>
          ))}
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
              {navigationLinks.map((link) => (
                <Link key={link.name} to={link.href} className="text-lg font-medium text-gray-700 hover:text-primary transition-colors block py-2">{link.name}</Link>
              ))}
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

export default Navbar;

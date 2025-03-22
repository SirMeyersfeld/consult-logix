
import React from 'react';
import { Link } from 'react-router-dom';

const FooterLinks = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      <div>
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-primary/10">
            <div className="absolute w-3 h-3 rounded-full bg-primary" />
          </div>
          <span className="text-xl font-semibold">MediLog</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">Modernizing healthcare, one consultation at a time.</p>
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Product</h3>
        <ul className="space-y-2">
          <li><Link to="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
          <li><Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">How It Works</Link></li>
          <li><Link to="/mediport" className="text-sm text-muted-foreground hover:text-primary transition-colors">MediPort</Link></li>
          <li><Link to="/consultation" className="text-sm text-muted-foreground hover:text-primary transition-colors">Consultation</Link></li>
          <li><Link to="/plan-comparison" className="text-sm text-muted-foreground hover:text-primary transition-colors">Plan Comparison</Link></li>
          <li><Link to="/subscription" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
        </ul>
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Resources</h3>
        <ul className="space-y-2">
          <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
          <li><Link to="/testimonials" className="text-sm text-muted-foreground hover:text-primary transition-colors">Testimonials</Link></li>
          <li><Link to="/health-tips" className="text-sm text-muted-foreground hover:text-primary transition-colors">Health Tips</Link></li>
          <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
          <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
          <li><Link to="/contact-form" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
        </ul>
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Legal</h3>
        <ul className="space-y-2">
          <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
          <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Compliance</a></li>
          <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Data Security</a></li>
        </ul>
      </div>
    </div>
  );
};

export default FooterLinks;

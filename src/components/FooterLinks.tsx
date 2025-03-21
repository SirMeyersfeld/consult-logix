
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
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Founded by Liam Meyersfeld</p>
          <p>Co-founded by Dylan Friedman</p>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Product</h3>
        <ul className="space-y-2">
          <li><Link to="/mediport" className="text-sm text-muted-foreground hover:text-primary transition-colors">MediPort</Link></li>
          <li><Link to="/consultation" className="text-sm text-muted-foreground hover:text-primary transition-colors">Consultation</Link></li>
          <li><Link to="/subscription" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
          <li><Link to="/health-tips" className="text-sm text-muted-foreground hover:text-primary transition-colors">Health Tips</Link></li>
        </ul>
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Company</h3>
        <ul className="space-y-2">
          <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
          <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
          <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
          <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Partners</a></li>
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

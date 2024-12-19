// import { UserCircle2, Menu } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import { NavLinks } from './NavLinks';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white border-b z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary">
              Service<span className="text-blue-600">Connect</span>
            </h1>
          </div>
          
          <NavLinks className="hidden md:flex" />
          <MobileMenu className="md:hidden" />
        </div>
      </div>
    </nav>
  );
}
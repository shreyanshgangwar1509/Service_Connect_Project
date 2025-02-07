import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { NavLinks } from './NavLinks';

interface MobileMenuProps {
  className?: string;
}

export function MobileMenu({ className = '' }: MobileMenuProps) {
  
  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <div className="flex flex-col space-y-4 mt-8">
            <NavLinks className="flex flex-col space-y-4" />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
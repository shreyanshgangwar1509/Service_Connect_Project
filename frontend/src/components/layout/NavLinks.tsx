import { Button } from '@/components/ui/button';

interface NavLinksProps {
  className?: string;
}

export function NavLinks({ className = '' }: NavLinksProps) {
  return (
    <div className={`items-center space-x-6 ${className}`}>
      <Button variant="ghost">Services</Button>
      <Button variant="ghost">Bookings</Button>
      <Button variant="ghost">Become a Provider</Button>
      <Button variant="ghost">Inventory</Button>
      <Button variant="default">Login/Register</Button>
    </div>
  );
}
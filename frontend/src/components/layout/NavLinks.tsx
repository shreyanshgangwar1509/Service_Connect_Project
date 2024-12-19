import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface NavLinksProps {
  className?: string;
}

export function NavLinks({ className = '' }: NavLinksProps) {
  const navigate = useNavigate();
  return (
    <div className={`items-center space-x-6 ${className}`}>
      <Button variant="ghost">Services</Button>
      <Button variant="ghost">Bookings</Button>
      <Button variant="ghost">Become a Provider</Button>
      <Button variant="ghost">Inventory</Button>
      <Button variant="default" onClick={() => {
        navigate('/login');
      }}>Login/Register</Button>
    </div>
  );
}
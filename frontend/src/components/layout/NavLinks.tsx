import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface NavLinksProps {
  className?: string;
}

export function NavLinks({ className = '' }: NavLinksProps) {
  const navigate = useNavigate();
  return (
    <div className={`items-center space-x-6 ${className}`}>
      <Button variant="ghost" onClick={()=>navigate('/services')}>Services</Button>
      <Button variant="ghost" onClick={()=>navigate('/bookings')}>Bookings</Button>
      <Button variant="ghost" onClick={()=>navigate('/become-provider')}>Become a Provider</Button>
      <Button variant="ghost" onClick={()=>navigate('/inventory')}>Inventory</Button>
      <Button variant="default" onClick={() => {
        navigate('/login');
      }}>Login/Register</Button>
    </div>
  );
}
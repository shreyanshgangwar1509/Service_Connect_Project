import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavLinksProps {
  className?: string;
}

export function NavLinks({ className = '' }: NavLinksProps) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [logged, setlogged] = useState(false);
  useEffect(() => {
    if (token) {
      setlogged(true);
    }
    
  }, [token, logged])
  const logout = async() => {
    const reponse = await axios.get('/api/auth/logout');
    localStorage.removeItem('token');
    if (reponse) {
      setlogged(false);
      navigate('/login');
    }
  }
  return (
    <div className={`items-center space-x-6 ${className}`}>
      <Button variant="ghost" onClick={()=>navigate('/services')}>Services</Button>
      <Button variant="ghost" onClick={()=>navigate('/bookings')}>Bookings</Button>
      <Button variant="ghost" onClick={()=>navigate('/become-provider')}>Become a Provider</Button>
      <Button variant="ghost" onClick={() => navigate('/inventory')}>Inventory</Button>
      {/* <Button variant='ghost' onClick={()=>navigate('/HomeWorker')}>Worker</Button> */}
      {logged ? (
        <>
          <Button variant="ghost" onClick={()=>navigate('/profile')}>
          Profile
          </Button>
        <Button variant="ghost" onClick={logout}>
          Logout
          </Button>
          </>
      ) : (
        <Button variant="ghost" onClick={() => navigate('/login')}>
          Login
        </Button>
      )}
      
    </div>
  );
}
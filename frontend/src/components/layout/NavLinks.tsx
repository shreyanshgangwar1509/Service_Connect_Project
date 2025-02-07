import { Button } from '@/components/ui/button';
import { setIsverified, userNotExist } from '@/redux/reducers/auth';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface NavLinksProps {
  className?: string;
}

export function NavLinks({ className = '' }: NavLinksProps) {
  const navigate = useNavigate();
  const [logged, setlogged] = useState(false);
  const dispatch = useDispatch();
  const { isVerified,user } = useSelector((state) => state.auth);
  useEffect(() => {
    
    if (isVerified) {
      setlogged(true);
    }
    
  }, [isVerified,user,logged])
  const logout = async() => {
    
    dispatch(userNotExist(true));
    dispatch(setIsverified(false));
    const reponse = await axios.get('/api/auth/logout');
      setlogged(false);
      navigate('/login');
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
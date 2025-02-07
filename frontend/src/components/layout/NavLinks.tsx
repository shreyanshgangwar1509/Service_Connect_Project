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
  const [logged, setLogged] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const { isVerified, user } = useSelector((state) => state.auth);
   const defaultAvatar = 'https://via.placeholder.com/40';

  useEffect(() => {
    
    if (isVerified) {
      setLogged(true);
    }
    
  }, [isVerified,user,logged])
  const logout = async() => {
    
    dispatch(userNotExist(true));
    dispatch(setIsverified(false));
    const reponse = await axios.get('/api/auth/logout');
      setLogged(false);
      navigate('/login');
  }
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative flex items-center space-x-6 ${className}`}>
      <Button variant="ghost" onClick={() => navigate('/services')}>
        Services
      </Button>
      <Button variant="ghost" onClick={() => navigate('/bookings')}>
        Bookings
      </Button>
      <Button variant="ghost" onClick={() => navigate('/become-provider')}>
        Become a Provider
      </Button>
      <Button variant="ghost" onClick={() => navigate('/inventory')}>
        Inventory
      </Button>

      {logged ? (
        // Show profile picture with dropdown.
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border border-gray-300"
          >
            <img
              src={profilePic ? profilePic : defaultAvatar}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40  border border-gray-200 rounded shadow-lg z-10 gap-1 space-y-1">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  navigate('/profile');
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-black rounded"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  logout();
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-black rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Button variant="ghost" onClick={() => navigate('/login')}>
          Login
        </Button>
      )}
    </div>
  );
}

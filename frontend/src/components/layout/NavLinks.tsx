import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavLinksProps {
  className?: string;
}

export function NavLinks({ className = '' }: NavLinksProps) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [logged, setLogged] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Use a default avatar if no profile picture is available.
  const defaultAvatar = 'https://via.placeholder.com/40';

  // Fetch profile data (e.g. profilePic) if token exists.
  useEffect(() => {
    if (token) {
      setLogged(true);
      axios
        .get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // Expecting the response to include a profilePic field.
          setProfilePic(res.data.profilePic);
        })
        .catch((err) => {
          console.error('Error fetching profile:', err);
        });
    } else {
      setLogged(false);
    }
  }, [token]);

  // Close the dropdown when clicking outside of it.
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

  // Logout handler: call backend endpoint and clear token.
  const logout = async () => {
    try {
      await axios.get('/api/auth/logout');
      localStorage.removeItem('token');
      // Optionally, clear any stored profile pic.
      setLogged(false);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

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

import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  role: string | null;
}

interface DecodedToken {
  userId?: string;
  role?: string;
  exp?: number;
}

const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    userId: null,
    role: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);

        // Check if the token is expired
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token'); // Remove expired token
          setAuth({ isAuthenticated: false, userId: null, role: null });
          return;
        }

        // Check if required fields exist
        if (decoded.userId && decoded.role) {
          setAuth({
            isAuthenticated: true,
            userId: decoded.userId,
            role: decoded.role,
          });
        } else {
          setAuth({ isAuthenticated: false, userId: null, role: null });
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token'); // Remove invalid token
        setAuth({ isAuthenticated: false, userId: null, role: null });
      }
    }
  }, []);

  return auth;
};

export default useAuth;

import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface ProfileData {
  avatar: { url: string };
  name: string;
  email: string;
}

// Create Axios instance with default settings
const api = axios.create({
  baseURL: 'http://localhost:3000', // Backend API base URL
  withCredentials: true, // Ensures cookies are included
});

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Retrieve token from localStorage
        const adminData = localStorage.getItem('token') || '{}';
        const token = adminData || null;

        console.log('Token:', token);

        // Make API request with Authorization header
        const response = await api.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token to headers
          },
        });

        setProfile(response.data);
      } catch (err) {
        setError('Error in fetching profile: Server Error');
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={profile.avatar.url} alt="Profile Avatar" />
      <h1>{profile.name}</h1>
      <h2>{profile.email}</h2>
    </div>
  );
};

export default Profile;

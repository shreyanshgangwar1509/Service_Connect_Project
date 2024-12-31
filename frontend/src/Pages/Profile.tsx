import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface ProfileData {
  avatar: { url: string };
  name: string;
  email: string;
}

const api = axios.create({
  baseURL: "http://localhost:3000", // Set the base URL here
});
const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const adminData = JSON.parse(localStorage.getItem('token') || '{}');
        const token = adminData || null;
        console.log(token);
        
        const response = await api.get(`/api/auth/me`,{token});

        setProfile(response.data);
      } catch (err) {
        setError('Error in fetching profile: Server Error');
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

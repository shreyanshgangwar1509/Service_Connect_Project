import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface ProfileData {
  avatar: { url: string };
  name: string;
  email: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const adminData = JSON.parse(localStorage.getItem('user-info') || '{}');
        const token = adminData.token || null;

        const response = await axios.get(`${process.env.BACKEND_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

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

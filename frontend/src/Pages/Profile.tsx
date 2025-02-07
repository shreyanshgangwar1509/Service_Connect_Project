import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';


// Create Axios instance with default settings
const api = axios.create({
  baseURL: import.meta.env.BASE_URL ||'http://localhost:3000', 
  withCredentials: true, 
});

const Profile: React.FC = () => {
  
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <img src={user?.avatar?.url} alt="user Avatar" />
      <h1>{user.name}</h1>
      <h2>{user.email}</h2>
    </div>
  );
};

export default Profile;

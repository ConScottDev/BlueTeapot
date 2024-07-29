import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import MasterSchedule from '../components/schedule/MasterSchedule';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h1>Welcome to Blue Teapot Theatre</h1>
      <MasterSchedule />
    </div>
  );
};

export default Home;

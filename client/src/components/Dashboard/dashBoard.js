import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navBar';

const Dashboard = () => {
  return (
    <div
      style={{
        backgroundImage: `url('https://wallpaperaccess.com/full/918401.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <Navbar />
    </div>
  );
};

export default Dashboard;

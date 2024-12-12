import React from 'react';
import Header from '../components/Header';

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <h1>Welcome to AeroTran</h1>
      <p>Your flight booking system.</p>
    </div>
  );
};

export default HomePage;
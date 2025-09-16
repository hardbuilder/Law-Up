import React from 'react';
import HeroSection from '../components/HeroSection';
import GetStarted from '../components/GetStarted';
import WhyUs from '../components/WhyUs';
import Clarity from '../components/Clarity';

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-sky-50 to-white">
      
      <HeroSection />
      <WhyUs />
      <Clarity />
      <GetStarted />
    </div>
  );
};

export default Home;

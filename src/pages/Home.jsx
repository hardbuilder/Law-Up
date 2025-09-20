import React from 'react';
import HeroSection from '../components/home/HeroSection';
import GetStarted from '../components/home/GetStarted';
import WhyUs from '../components/home/WhyUs';
import Clarity from '../components/home/Clarity';

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

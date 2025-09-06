import React from 'react';
import AlumniBanner from './components/AlumniBanner';
import HopeSameWork from './components/HopeSameWork';

const page = () => {
  return (
    <div className="flex flex-col">
      <AlumniBanner />
      <HopeSameWork />
    </div>
  );
};

export default page;

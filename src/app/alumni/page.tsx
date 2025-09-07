import React from 'react';
import AlumniBanner from './components/AlumniBanner';
import HopeSameWork from './components/HopeSameWork';
import ManyBookmark from './ManyBookmark';
import Footer from '../_components/common/Footer';
import SearchAlumni from './components/SearchAlumni';

const page = () => {
  return (
    <div className="flex flex-col">
      <AlumniBanner />
      <HopeSameWork />
      <ManyBookmark />
      <SearchAlumni />
      <Footer />
    </div>
  );
};

export default page;

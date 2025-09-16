import React from 'react';
import AlumniBanner from './components/AlumniBanner';
import HopeSameWork from './components/HopeSameWork';
import Footer from '../_components/common/Footer';
import SearchAlumni from './components/SearchAlumni';
import CareerJourney from './components/CareerJourney';
import ManyBookmark from './components/ManyBookmark';
import ManyBookmarkHeader from './components/ManyBookmarkHeader';

const page = () => {
  return (
    <div className="flex flex-col">
      <AlumniBanner />
      <HopeSameWork />

      <div className="flex flex-col items-start px-5 pt-24 pb-12 md:px-[120px] md:pt-0 md:pb-8">
        <ManyBookmarkHeader />
        <ManyBookmark />
      </div>

      <div className="mx-auto mt-20 w-full px-5 md:pl-[120px]">
        <div className="text-contents-neutral-primary web-title2 md:heading-1xl-semibold">
          같은 직무를 희망하는
          <span className="block md:inline"> 동문을 찾았어요</span>
        </div>
        <SearchAlumni />
      </div>
      <CareerJourney />
      <Footer />
    </div>
  );
};

export default page;

import React from 'react';
import OnboardingLogo from './components/OnboardingLogo';
import OnBoardingContents from './components/OnBoardingContents';
import Footer from '../_components/common/Footer';

const page = () => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <OnboardingLogo />
      <OnBoardingContents />
      <Footer />
    </div>
  );
};

export default page;

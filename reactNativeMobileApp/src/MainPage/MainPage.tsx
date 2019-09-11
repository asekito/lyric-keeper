import React, { useState } from 'react';
import { MainWrapper } from './elements';
import { HomePage } from '../HomePage';
import { NativeRouter as Router } from 'react-router-native';

export const MainPage = () => {
  return (
    <MainWrapper>
      <Router forceRefresh>
        <HomePage />
      </Router>
    </MainWrapper>
  );
};

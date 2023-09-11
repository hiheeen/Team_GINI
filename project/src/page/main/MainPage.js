import Category from '../../component/Category';
import Header from '../../component/Header';
import MainSection from '../../component/MainSection';
import Profile from '../../component/Profile';
import styles from './MainPage.module.css';
import React from 'react';

function MainPage() {
  return (
    <div>
      <Header />
      <div className={styles.main_section}>
        <Category />
        <MainSection />
        <Profile />
      </div>
    </div>
  );
}
export default MainPage;

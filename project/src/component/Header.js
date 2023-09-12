import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import React from 'react';
function Header() {
  const navigate = useNavigate();
  const headerImg = process.env.PUBLIC_URL + '/images/Group 2.png';
  return (
    <div className={styles.header}>
      <div>on&off</div>
      <div>
        <img className={styles.headerImg} alt="" src={headerImg} />
      </div>
      <div className={styles.login}>
        <div onClick={() => navigate('/login')}>로그인</div>
        <div>/</div>
        <div onClick={() => navigate('/signUp')}>회원가입</div>
      </div>
    </div>
  );
}
export default Header;

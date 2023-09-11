import styles from './Header.module.css';
import React from 'react';
function Header() {
  const headerImg = process.env.PUBLIC_URL + '/images/Group 2.png';
  return (
    <div className={styles.header}>
      <div>
        <img className={styles.headerImg} alt="" src={headerImg} />
      </div>
      <div>
        <div>로그인</div>
        <div>회원가입</div>
      </div>
    </div>
  );
}
export default Header;

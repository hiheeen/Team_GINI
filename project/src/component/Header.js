import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import React, { useState } from 'react';
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles'; // styled import 추가
import { useRecoilState } from 'recoil';
import { loggedInState } from '../recoil/loggedIn';

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInState);

  const headerImg = process.env.PUBLIC_URL + '/images/Group 2.png';
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // styled 컴포넌트를 사용하여 스위치 스타일 변경
  const CustomSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-track': {
      backgroundColor: 'rgb(167, 134, 196)', // 몸통 색상 변경
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: 'rgb(162, 115, 204)', // 원하는 색상으로 변경
    },
    '& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track': {
      backgroundColor: 'rgb(155, 102, 202)', // 체크된 상태의 몸통 색상 변경
    },
    '& .MuiSwitch-switchBase': {
      padding: 8, // 스위치 크기 변경 (small 크기)
    },
  }));

  return (
    <div className={styles.header}>
      <div></div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          on&off
        </div>
        {/* <img className={styles.headerImg} alt="" src={headerImg} /> */}
        <CustomSwitch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </div>
      <div className={styles.login}>
        {isLoggedIn ? (
          <>
            <div
              onClick={() => {
                setIsLoggedIn(false);
                navigate('/');
              }}
            >
              로그아웃
            </div>
            <div>/</div>
            <div>마이페이지</div>
          </>
        ) : (
          <>
            <div onClick={() => navigate('/login')}>로그인</div>
            <div>/</div>
            <div onClick={() => navigate('/signUp')}>회원가입</div>
          </>
        )}
      </div>
    </div>
  );
}
export default Header;

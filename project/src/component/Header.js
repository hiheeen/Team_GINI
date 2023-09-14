import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import React, { useState } from 'react';
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles'; // styled import 추가
import { useRecoilState } from 'recoil';
import { loggedInState } from '../recoil/loggedIn';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';

import { logOutApi } from '../apis/api';
import axios from 'axios';

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInState);
  const [cookies] = useCookies(['access_token']);
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

  // const handleLogOut = () => {
  //   logOutApi(cookies.access_token)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         Cookies.remove('access_token');
  //         Cookies.remove('refresh_token');
  //         navigate('/');
  //       } else {
  //         console.error('로그아웃실패', res);
  //         window.alert('로그아웃 실패');
  //       }
  //     })
  //     .catch((err) => {
  //       console.error('로그아웃 실패 catch문', err);
  //       window.alert('로그아웃 실패 catch문');
  //     });
  // };
  const handleLogOut = async () => {
    await axios
      .delete('http://27.96.134.191/api/v1/users/logout/', {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log('로그아웃 성공', res);
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        navigate('/');
      })
      .catch((err) => console.error('로그아웃 실패', err));
  };
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
            <div onClick={handleLogOut}>로그아웃</div>
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

import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import React, { useEffect, useState } from 'react';
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles'; // styled import 추가
import { useRecoilState } from 'recoil';
import { loggedInState } from '../recoil/loggedIn';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';

import { logOutApi } from '../apis/api';
import axios from 'axios';
import { onOffState } from '../recoil/onOff';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faColonSign,
  faUser,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import SurfingOutlinedIcon from '@mui/icons-material/SurfingOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInState);
  const [cookies] = useCookies(['access_token']);
  const headerImg = process.env.PUBLIC_URL + '/images/Group 2.png';
  const [isOnOffState, setIsOnOffState] = useRecoilState(onOffState);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 820);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);
  const [showDropDown, setShowDropDown] = useState(false);
  // const handleChange = (event) => {
  //   setChecked(!isOnOffState);
  //   setIsOnOffState(!isOnOffState);
  // };

  // 로컬 스토리지의 값을 초기 recoil 상태로 설정
  useEffect(() => {
    const storedIsOnOffState = localStorage.getItem('isOnOffState');
    if (storedIsOnOffState !== null) {
      setIsOnOffState(storedIsOnOffState === 'true'); // 문자열을 불리언으로 변환
    }
  }, []);

  // CustomSwitch 변경 시 recoil 상태와 로컬 스토리지 값 업데이트
  const handleChange = (event) => {
    const newValue = !isOnOffState;
    setIsOnOffState(newValue);
    localStorage.setItem('isOnOffState', newValue.toString()); // 불리언을 문자열로 저장
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
  const handleLogOut = async () => {
    await axios
      .delete('http://www.jinii.shop/api/v1/users/logout/', {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log('로그아웃 성공', res);
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        setIsLoggedIn(false);
        navigate('/');
      })
      .catch((err) => console.error('로그아웃 실패', err));
  };
  return (
    <div className={styles.container} style={{ height: !isLoggedIn && 80 }}>
      <div className={styles.header} style={{ border: !isLoggedIn && 'none' }}>
        <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          on&off
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* <img className={styles.headerImg} alt="" src={headerImg} /> */}
          <CustomSwitch
            checked={isOnOffState}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </div>
        <div className={styles.login}>
          {isSmallScreen ? (
            isLoggedIn ? (
              <>
                <div onClick={handleLogOut}>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </div>
                <div>/</div>
                <div onClick={() => navigate('/myPage')}>
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </>
            ) : (
              <>
                <div onClick={() => navigate('/login')}>
                  <FontAwesomeIcon icon={faArrowRightToBracket} />
                </div>
                <div>/</div>
                <div onClick={() => navigate('/signUp')}>
                  <FontAwesomeIcon icon={faUserPlus} />
                </div>
              </>
            )
          ) : isLoggedIn ? (
            <>
              <div onClick={handleLogOut}>로그아웃</div>
              <div>/</div>
              <div onClick={() => navigate('/myPage')}>마이페이지</div>
            </>
          ) : (
            <>
              <div onClick={() => navigate('/login')}>로그인</div>
              <div>/</div>
              <div onClick={() => navigate('/signUp')}>회원가입</div>
            </>
          )}
          {/* {isLoggedIn ? (
            isSmallScreen ? (
              <>
                <div onClick={handleLogOut}>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </div>
                <div>/</div>
                <div onClick={() => navigate('/myPage')}>
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </>
            ) : (
              <>
                <div onClick={handleLogOut}>로그아웃</div>
                <div>/</div>
                <div onClick={() => navigate('/myPage')}>마이페이지</div>
              </>
            )
          ) : isSmallScreen ? (
            <>
              <div onClick={() => navigate('/login')}>
                <FontAwesomeIcon icon={faArrowRightToBracket} />
              </div>
              <div>/</div>
              <div onClick={() => navigate('/signUp')}>
                <FontAwesomeIcon icon={faUserPlus} />
              </div>
            </>
          ) : (
            <>
              <div onClick={() => navigate('/login')}>로그인</div>
              <div>/</div>
              <div onClick={() => navigate('/signUp')}>회원가입</div>
            </>
          )} */}
        </div>
      </div>
      {!isLargeScreen && isLoggedIn && (
        <div className={styles.mobile_header}>
          <div style={{ cursor: 'pointer' }}>글쓰기</div>
          <div
            onClick={() => setShowDropDown(!showDropDown)}
            style={{ cursor: 'pointer' }}
          >
            카테고리
          </div>
          <div style={{ cursor: 'pointer' }}>최신순</div>
        </div>
      )}
      {!isLargeScreen && showDropDown && (
        <div className={styles.dropDown}>
          <div className={styles.category_item}>
            <AirplanemodeActiveIcon style={{ marginRight: 7 }} />
            <div
              onClick={() => {
                navigate('/travel');
                setShowDropDown(!showDropDown);
              }}
            >
              여행지
            </div>
          </div>
          <div className={styles.category_item}>
            <MenuBookOutlinedIcon style={{ marginRight: 7 }} />
            <div
              onClick={() => {
                navigate('/phrase');
                setShowDropDown(!showDropDown);
              }}
            >
              책/글귀
            </div>
          </div>
          <div className={styles.category_item}>
            <MusicNoteOutlinedIcon style={{ marginRight: 7 }} />
            <div
              onClick={() => {
                navigate('/sing');
                setShowDropDown(!showDropDown);
              }}
            >
              노래
            </div>
          </div>
          <div className={styles.category_item}>
            <LiveTvOutlinedIcon style={{ marginRight: 7 }} />
            <div
              onClick={() => {
                navigate('/movie_drama');
                setShowDropDown(!showDropDown);
              }}
            >
              영화/드라마
            </div>
          </div>
          <div className={styles.category_item}>
            <SportsEsportsOutlinedIcon style={{ marginRight: 7 }} />
            <div
              onClick={() => {
                navigate('/game');
                setShowDropDown(!showDropDown);
              }}
            >
              게임
            </div>
          </div>
          <div className={styles.category_item}>
            <LocalPostOfficeOutlinedIcon style={{ marginRight: 7 }} />
            <div
              onClick={() => {
                navigate('/memory');
                setShowDropDown(!showDropDown);
              }}
            >
              추억
            </div>
          </div>
          <div className={styles.category_item}>
            <PhotoOutlinedIcon style={{ marginRight: 7 }} />
            <div
              onClick={() => {
                navigate('/paint');
                setShowDropDown(!showDropDown);
              }}
            >
              그림
            </div>
          </div>
          <div className={styles.category_item}>
            <LightbulbOutlinedIcon style={{ marginRight: 7 }} />
            <div
              onClick={() => {
                navigate('/idea');
                setShowDropDown(!showDropDown);
              }}
            >
              아이디어
            </div>
          </div>
          <div className={styles.category_item}>
            <LunchDiningOutlinedIcon style={{ marginRight: 7 }} />
            <div
              onClick={() => {
                navigate('/food');
                setShowDropDown(!showDropDown);
              }}
            >
              음식
            </div>
          </div>
          <div className={styles.category_item}>
            <PlaceOutlinedIcon style={{ marginRight: 7 }} />
            <div
              onClick={() => {
                navigate('/place');
                setShowDropDown(!showDropDown);
              }}
            >
              장소
            </div>
          </div>
          <div className={styles.category_item}>
            <SurfingOutlinedIcon style={{ marginRight: 7 }} />
            <div
              onClick={() => {
                navigate('/hobby');
                setShowDropDown(!showDropDown);
              }}
            >
              취미
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Header;

import styles from './MainPage.module.css';
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFolderClosed } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { useRecoilState, useRecoilValue } from 'recoil';
import { onOffState } from '../../recoil/onOff';
import SecretFeed from '../../component/SecretFeed';
import PublicFeed from '../../component/PublicFeed';
import { getInfoApi, getSecretFeedApi, userSearchApi } from '../../apis/api';
import { useCookies } from 'react-cookie';
import MiniHeader from '../../component/MiniHeader';
import { useQuery } from '@tanstack/react-query';
import { loggedInState } from '../../recoil/loggedIn';
function MainPage() {
  const [searchValue, setSearchValue] = useState();
  const [goToUpload, setGoToUpload] = useState(false);
  const [filter, setFilter] = useState('all');
  const [order, setOrder] = useState('new');
  const [cookies] = useCookies(['access_token']);
  const onOff = useRecoilValue(onOffState);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 820);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInState);
  const [secretData, setSecretData] = useState();

  const navigate = useNavigate();

  const onGoToUpload = () => {
    navigate('/upload/default');
  };
  useEffect(() => {
    if (cookies.access_token) {
      getSecretFeedApi(cookies.access_token).then((res) => {
        setSecretData(res);
      });
    }
  }, [isLoggedIn]);
  useEffect(() => {
    const handleShowButtons = () => {
      window.scrollY > 200 ? setGoToUpload(true) : setGoToUpload(false);
    };

    window.addEventListener('scroll', handleShowButtons);
    return () => {
      window.removeEventListener('scroll', handleShowButtons);
    };
  }, []);
  const handleFilterPosts = (e) => {
    setFilter(e.target.value);
  };
  const handleFilterOrder = (e) => {
    setOrder(e.target.value);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.feed}>
          <div className={styles.mainSection_header}>
            <Fab
              style={{
                cursor: 'pointer',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
                zIndex: 50,
              }}
              onClick={() => navigate('/upload/default/')}
              color="white"
              aria-label="edit"
              size="small"
            >
              <EditIcon />
            </Fab>
            <div style={{ display: 'flex' }}>
              {!onOff && (
                <select
                  style={{ marginRight: 10 }}
                  onChange={handleFilterPosts}
                  value={filter}
                >
                  <option value="all">모두 보기</option>
                  <option value="myPosts">나만 보기</option>
                </select>
              )}

              <div>
                {/* <FontAwesomeIcon icon={faBars} size="xl" /> */}
                <select onChange={handleFilterOrder} value={order}>
                  <option value="new">최신 순</option>
                  <option value="old">오래된 순</option>
                  {!onOff && <option value="like">좋아요 순</option>}
                </select>
              </div>
            </div>
          </div>

          {onOff ? (
            <SecretFeed order={order} secretData={secretData} />
          ) : (
            <PublicFeed filter={filter} order={order} />
          )}
        </div>
      </div>
      {goToUpload && (
        <button className={styles.go_upload} onClick={onGoToUpload}>
          +
        </button>
      )}
    </>
  );
}
export default MainPage;

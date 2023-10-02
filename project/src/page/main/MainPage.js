import styles from './MainPage.module.css';
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderClosed } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Feed from '../../component/Feed';
import { useRecoilValue } from 'recoil';
import { onOffState } from '../../recoil/onOff';
import SecretFeed from '../../component/SecretFeed';
import PublicFeed from '../../component/PublicFeed';
import { userSearchApi } from '../../apis/api';
import { useCookies } from 'react-cookie';
function MainPage() {
  const [searchValue, setSearchValue] = useState();
  const [goToUpload, setGoToUpload] = useState(false);
  const [cookies] = useCookies(['access_token']);
  const onOff = useRecoilValue(onOffState);
  const navigate = useNavigate();

  const onGoToUpload = () => {
    navigate('/upload/default');
  };

  useEffect(() => {
    const handleShowButtons = () => {
      window.scrollY > 200 ? setGoToUpload(true) : setGoToUpload(false);
    };

    window.addEventListener('scroll', handleShowButtons);
    return () => {
      window.removeEventListener('scroll', handleShowButtons);
    };
  }, []);
  const handleSearchUser = () => {
    userSearchApi(searchValue, cookies.access_token)
      .then((res) => console.log('유저검색', res))
      .catch((err) => console.error('유저검색 실패', err));
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.upload}>
          <div className={styles.mainSection_header}>
            <button onClick={() => navigate('/upload/default/')}>
              기록하기
            </button>
            {/* <Fab
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
            </Fab> */}
            <div>
              {/* <input
                placeholder="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button onClick={handleSearchUser}>유저 검색</button> */}
            </div>
          </div>
        </div>
        <div className={styles.feed}>
          {onOff ? <SecretFeed /> : <PublicFeed />}
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

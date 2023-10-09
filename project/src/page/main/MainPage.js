import styles from './MainPage.module.css';
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFolderClosed } from '@fortawesome/free-solid-svg-icons';
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
import MiniHeader from '../../component/MiniHeader';
function MainPage() {
  const [searchValue, setSearchValue] = useState();
  const [goToUpload, setGoToUpload] = useState(false);
  const [filter, setFilter] = useState('all');
  const [order, setOrder] = useState('new');
  const [cookies] = useCookies(['access_token']);
  const onOff = useRecoilValue(onOffState);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 820);

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
            <SecretFeed order={order} />
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

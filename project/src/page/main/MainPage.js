import styles from './MainPage.module.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderClosed } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Feed from '../../component/Feed';
function MainPage() {
  const [searchValue, setSearchValue] = useState();
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.upload}>
        <div className={styles.mainSection_header}>
          {/* <button
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/upload/default/:id')}
          >
            업로드 하기
          </button> */}
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
          <div>
            <input
              placeholder="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={styles.feed}>
        <Feed />
      </div>
    </div>
  );
}
export default MainPage;

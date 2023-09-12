import styles from './MainPage.module.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderClosed } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function MainPage() {
  const [searchValue, setSearchValue] = useState();
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.upload}>
        <div className={styles.mainSection_header}>
          <button
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/upload/default/:id')}
          >
            업로드 하기
          </button>
          <div>
            <input
              placeholder="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <FontAwesomeIcon
            icon={faFolderClosed}
            style={{
              width: 100,
              height: 100,
              color: 'rgb(250, 250, 150)',
              padding: 15,
            }}
          />
          <FontAwesomeIcon
            icon={faFolderClosed}
            style={{
              width: 100,
              height: 100,
              color: 'rgb(250, 250, 150)',
              padding: 15,
            }}
          />
          <FontAwesomeIcon
            icon={faFolderClosed}
            style={{
              width: 100,
              height: 100,
              color: 'rgb(250, 250, 150)',
              padding: 15,
            }}
          />
          <FontAwesomeIcon
            icon={faFolderClosed}
            style={{
              width: 100,
              height: 100,
              color: 'rgb(250, 250, 150)',
              padding: 15,
            }}
          />
          <FontAwesomeIcon
            icon={faFolderClosed}
            style={{
              width: 100,
              height: 100,
              color: 'rgb(250, 250, 150)',
              padding: 15,
            }}
          />
        </div>
      </div>
      <div className={styles.feed}></div>
    </div>
  );
}
export default MainPage;

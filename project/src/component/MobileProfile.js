import { useEffect, useState } from 'react';
import styles from './MobileProfile.module.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useQuery } from '@tanstack/react-query';
import { getFeedApi, getInfoApi, getSecretFeedApi } from '../apis/api';
import { useNavigate } from 'react-router-dom';

function MobileProfile({ infoData, secretData, feedData }) {
  const profileImg = process.env.PUBLIC_URL + '/images/profileTest.png';
  const profile = process.env.PUBLIC_URL + '/images/profile.png';
  const [cookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const filteredMyPosts = feedData.data.results.filter(
    (it) => it.writer.nickname === infoData?.data.nickname,
  );
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.profile}>
          <div>
            <img
              alt=""
              src={
                infoData?.data.profileImg !== null
                  ? infoData?.data.profileImg
                  : profileImg
              }
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: '1px solid rgba(112,112,112,0.2)',
              }}
            />
          </div>

          <button
            onClick={() => navigate('/myPage')}
            className={styles.profileEdit}
          >
            프로필 편집
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={styles.nickname}>{infoData?.data?.nickname}</div>
        <div className={styles.description}>{infoData?.data?.description}</div>
      </div>
      <div>
        나의 기록{' '}
        <span style={{ fontWeight: 600, padding: '0 0 0 5px' }}>{`${
          filteredMyPosts.length + secretData?.data.length
        }`}</span>
        개
      </div>
    </div>
  );
}
export default MobileProfile;

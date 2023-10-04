import { useEffect, useState } from 'react';
import styles from './MobileProfile.module.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useQuery, useQueryErrorResetBoundary } from '@tanstack/react-query';
import { getFeedApi, getInfoApi, getSecretFeedApi } from '../apis/api';
import { useNavigate } from 'react-router-dom';

function MobileProfile({ web_profile, mobile_profile }) {
  const profileImg = process.env.PUBLIC_URL + '/images/profileTest.png';
  const profile = process.env.PUBLIC_URL + '/images/profile.png';
  const [cookies] = useCookies(['access_token']);
  const [infoData, setInfoData] = useState();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(['getInfo'], () =>
    getInfoApi(cookies.access_token),
  );
  // console.log(data, '인포 데이터');
  const { data: feedData, isLoading: dataIsLoading } = useQuery(
    ['feedData'],
    () => getFeedApi(cookies.access_token),
    // {
    //   staleTime: 300000, // 5분 동안 데이터를 "느껴지게" 함
    // },
  );
  const { data: secretData, isLoading: secretIsLoading } = useQuery(
    ['secretData'],
    () => getSecretFeedApi(cookies.access_token),
  );
  // console.log('secretdata', secretData);
  if (secretIsLoading) {
    return <div>is loading...</div>;
  }
  if (isLoading) {
    return <div>is Loading...</div>;
  }
  if (dataIsLoading) {
    return <div>data is loading...</div>;
  }
  const filteredMyPosts = feedData.data.results.filter(
    (it) => it.writer.nickname === data.data.nickname,
  );
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.profile}>
          <div>
            <img
              alt=""
              src={
                data.data.profileImg !== null
                  ? data.data.profileImg
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
        <div className={styles.nickname}>{data.data?.nickname}</div>
        <div className={styles.description}>{data.data?.description}</div>
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

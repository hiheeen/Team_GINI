import { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useQuery, useQueryErrorResetBoundary } from '@tanstack/react-query';
import { getInfoApi } from '../apis/api';

function Profile() {
  const profileImg = process.env.PUBLIC_URL + '/images/profileTest.png';
  const profile = process.env.PUBLIC_URL + '/images/profile.png';
  const [cookies] = useCookies(['access_token']);
  const [infoData, setInfoData] = useState();
  // useEffect(() => {
  //   if (cookies.access_token) {
  //     axios
  //       .get('http://27.96.134.191/api/v1/users/get_info/', {
  //         headers: {
  //           Authorization: `Bearer ${cookies.access_token}`,
  //         },
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         console.log('인포', res.data);
  //         setInfoData(res.data);
  //       })
  //       .catch((err) => console.log('인포 get에러', err));
  //   }
  // }, []);
  const { data, isLoading } = useQuery(['getInfo'], () =>
    getInfoApi(cookies.access_token),
  );
  // console.log(data, '인포 데이터');
  if (isLoading) {
    return <div>is Loading...</div>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.profileImg}>
        <img
          alt=""
          src={
            data.data.profileImg !== null ? data.data.profileImg : profileImg
          }
          style={{
            width: '150px',
            height: '150px',
            position: 'absolute',
            borderRadius: '50%',
          }}
        />
      </div>
      <div className={styles.nickname}>{data.data?.nickname}</div>
      <div className={styles.description}>{data.data?.description}</div>
      <div className={styles.liked}>좋아요 한 기록물</div>
    </div>
  );
}
export default Profile;

import { useEffect } from 'react';
import styles from './Profile.module.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Profile() {
  const profileImg = process.env.PUBLIC_URL + '/images/profileTest.png';
  const [cookies] = useCookies(['access_token']);
  useEffect(() => {
    if (cookies.access_token) {
      axios
        .get('http://27.96.134.191/api/v1/users/get_info/', {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
          withCredentials: true,
        })
        .then((res) => console.log('인포', res.data))
        .catch((err) => console.log('인포 get에러', err));
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.profileImg}>
        <img
          alt=""
          src={profileImg}
          style={{
            width: '150px',
            height: '150px',
            position: 'absolute',
            borderRadius: '50%',
          }}
        />
      </div>
      <div className={styles.nickname}>nickname</div>
      <div className={styles.description}>간단 소개글</div>
      <div className={styles.liked}>좋아요 한 기록물</div>
      <div className={styles.change}>정보 수정</div>
    </div>
  );
}
export default Profile;

import styles from './Profile.module.css';

function Profile() {
  const profileImg = process.env.PUBLIC_URL + '/images/profileTest.png';
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

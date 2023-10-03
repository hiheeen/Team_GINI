import styles from './LoginCss.module.css';

function Naver() {
  function generateRandomString(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
    return result;
  }
  const randomString = generateRandomString(10);
  const NAVER_CLIENT_ID = 'ua_qNRzyHTPwAFXJIpUX';
  const REDIRECT_URI = 'http://localhost:3000/naver_callback';
  const STATE = randomString; // 랜덤 스트링 생성
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

  const naverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };
  return (
    <button
      className={styles.naver_btn}
      id={styles.social_btn}
      onClick={naverLogin}
    >
      네이버
    </button>
  );
}
export default Naver;

import styles from './LoginCss.module.css';
function Kakao(props) {
  // const REST_API_KEY = 'e6059c2ea550960bf466add06939cfbc';
  // const REDIRECT_URI = 'http://localhost:3000/kakao_callback';
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <button
      className={styles.kakao_btn}
      id={styles.social_btn}
      onClick={handleKakaoLogin}
      type="submit"
    >
      카카오
    </button>
  );
}
export default Kakao;

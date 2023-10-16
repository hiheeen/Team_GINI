import styles from './LoginCss.module.css';
function Google() {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
  const googleURL = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid email profile`;
  const handleGoogleLogin = () => {
    window.location.href = googleURL;
  };
  return (
    <>
      <button
        className={styles.google_btn}
        id={styles.social_btn}
        onClick={handleGoogleLogin}
      >
        구글
      </button>
    </>
  );
}
export default Google;

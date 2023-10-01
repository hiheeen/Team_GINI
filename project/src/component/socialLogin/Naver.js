function Naver() {
  const NAVER_CLIENT_ID = '';
  const REDIRECT_URI = '';
  const STATE = '';
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

  const naverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };
  return <button onClick={naverLogin}>네이버 로그인</button>;
}

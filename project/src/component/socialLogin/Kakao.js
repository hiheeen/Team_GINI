import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { REST_API_KEY, REDIRECT_URI } from './KakaoLoginData';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import styles from './LoginCss.module.css';
function Kakao(props) {
  const REST_API_KEY = 'e6059c2ea550960bf466add06939cfbc';
  const REDIRECT_URI = 'http://localhost:3000/kakao_callback';
  // const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  // const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleKakaoLogin = () => {
    setTimeout(() => {
      window.location.href = kakaoURL;
    }, 1000);
  };

  return (
    <button
      className={styles.kakao_btn}
      id={styles.social_btn}
      onClick={handleKakaoLogin}
      type="submit"
    >
      {/* <span style={{ marginRight: '10px' }}>
        <FontAwesomeIcon icon={faMessage} size="1x" />
      </span> */}
      카카오
    </button>
  );
}
export default Kakao;
//post 로 토큰 요청, 성공하면 액세스 토큰, 리프레시 토큰과 토큰 정보를 포함한 json객체를 받게 됨
//액세스 토큰은 사용자 정보 가져오기와 같은 카카오 로그인이 필요한 api를 호출할 때 사용
//토큰 받기에 성공하여 카카오 로그인을 완료했다면, 사용자 정보 요청을 통해 필요한 사용자 정보를 받아 서비스 회원가입 및 로그인 등을 처리
// 인가 코드 KZeqRk2qmS19b4OzNuJ4gm4ca2RIFu4yViHe_hwtifbHu4BVRFxxe4lO7639IPnjSjOeHgoqJQ0AAAGJcuVHhQ

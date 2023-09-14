import { atom } from 'recoil';
import { useCookies } from 'react-cookie';

function useInitialLoggedInState() {
  const [cookies] = useCookies(['access_token']);
  if (cookies.access_token) {
    return true;
  } else {
    return false;
  }
}

export const loggedInState = atom({
  key: 'loggedIn',
  default: useInitialLoggedInState, // 함수를 호출하여 초기 상태 설정
});

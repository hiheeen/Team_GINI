import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
export const onOffState = atom({
  key: 'onOffState',
  default: true, // 함수를 호출하여 초기 상태 설정
  //   effects_UNSTABLE: [persistAtom],
});
// true : toggle-on , 나만 보고 싶은 기록

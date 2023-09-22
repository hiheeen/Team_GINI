import { atom } from 'recoil';

export const reviewOpenState = atom({
  key: 'reviewOpenState',
  default: false, // 함수를 호출하여 초기 상태 설정
});
// true : toggle-on , 나만 보고 싶은 기록

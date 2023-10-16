import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export const onOffState = atom({
  key: 'onOffState',
  default: true,
});

import {
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil';
import { countState } from './recoil/count';

function RecoilTest() {
  const [count, setCount] = useRecoilState(countState); // useRecoilState 을 통한 value, setter 반환
  // useRecoilState : useState와 동일하게 튜플형식으로 사용되며, 인자로는 atoms(혹은 selector)을 받는다
  const countValue = useRecoilValue(countState); // 구독하는 atom 의 값만 반환
  // useRecoilValue : 전역상태의 state 상태값만을 참조하기 위해 사용된다. 선언된 변수에 할당하여 사용한다.
  const setCountUseSetRecoilState = useSetRecoilState(countState); // 값을 변경하는 함수만 반환
  // useSetRecoilState  : 전역상태의 setter함수만을 활용하기 위해 사용된다. 선언된 함수변수에 할당하여 사용한다.
  const resetCount = useResetRecoilState(countState); // 설정된 기본값으로 리셋
  // useResetRecoilState : 전역상태를 default(초기값)으로 reset하기 위해 사용된다. 선언된 함수변수에 할당하여 사용한다.
  return (
    <div>
      <h2>읽기 쓰기 카운트 컴포넌트</h2>

      <p>카운트 {count}</p>
      <p>카운트(useRecoilValue 사용) {countValue}</p>

      <button onClick={() => setCount(count + 1)}>숫자 증가</button>
      <button onClick={() => setCount(count - 1)}>숫자 감소</button>
      <button onClick={() => setCountUseSetRecoilState(count + 1)}>
        숫자 증가 (useSetRecoilState 사용)
      </button>
      <button onClick={() => setCountUseSetRecoilState(count - 1)}>
        숫자 감소 (useSetRecoilState 사용)
      </button>
      <button onClick={resetCount}>카운트 리셋</button>
    </div>
  );
}

export default RecoilTest;

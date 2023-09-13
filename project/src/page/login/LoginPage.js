import { useState } from 'react';
import styles from './LoginPage.module.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loggedInState } from '../../recoil/loggedIn';
function LoginPage() {
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInState);
  const setLoggedInUseSetRecoilState = useSetRecoilState(loggedInState);
  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    if (name === 'userId') {
      setUserId(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = () => {
    // 회원정보 전송 로직
    // 성공할 경우
    setIsLoggedIn(true);
    navigate('/');
  };
  return (
    <div className={styles.container}>
      <div>
        <form onSubmit={onSubmit} className={styles.wrapper}>
          <div>
            <input
              className={styles.login_input}
              name="userId"
              value={userId}
              placeholder="아이디(e-mail)"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              className={styles.login_input}
              name="password"
              value={password}
              placeholder="비밀번호"
              onChange={onChange}
            />
          </div>
          <div>
            <button className={styles.login_submit} type="submit">
              로그인
            </button>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: 300,
              fontSize: 13,
              padding: '5px 0 0 0',
              textDecoration: 'underline',
              color: 'grey',
              cursor: 'pointer',
            }}
          >
            <div>비밀번호 찾기</div>
            <div onClick={() => navigate('/signUp')}>회원가입</div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;

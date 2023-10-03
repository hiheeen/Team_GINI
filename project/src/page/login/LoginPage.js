import { useState } from 'react';
import styles from './LoginPage.module.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loggedInState } from '../../recoil/loggedIn';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { loginApi } from '../../apis/api';
import Kakao from '../../component/socialLogin/Kakao';

import Naver from '../../component/socialLogin/Naver';
import Google from '../../component/socialLogin/Google';
function LoginPage() {
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState();
  const [cookies, setCookie] = useCookies(['access_token']);
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
  const onSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      email: userId,
      password: password,
    };
    // 회원정보 전송 로직
    loginApi(loginData)
      .then((response) => {
        if (response.status === 200) {
          console.log('로그인 성공', response.data);
          setCookie('access_token', response.data.token.access_token);
          setCookie('refresh_token', response.data.token.refresh_token);
          setIsLoggedIn(true);
          navigate('/');
        }
      })
      .catch((error) => console.log('로그인 실패', error));
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
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/password_search')}
            >
              비밀번호 찾기
            </div>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/signUp')}
            >
              회원가입
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Kakao />
            <Google />
            <Naver />
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;

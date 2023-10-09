import { useNavigate } from 'react-router-dom';
import styles from './PwSearchPage.module.css';
import { putEmailApi } from '../../apis/api';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import axios from 'axios';
function PwSearchPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [cookies, setCookie] = useCookies(['access_token']);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: userId,
    };
    putEmailApi(formData, cookies.access_token)
      .then((res) => {
        // console.log('인증메일 발송', res.data);
        alert(res.data);
        setUserId('');
      })
      .catch((err) => {
        // console.log('인증메일 발송 에러', err);
        setUserId('');
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.wrapper}>
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: 300,
              fontSize: 15,
              padding: '0 0 20px 0',
              color: 'grey',
            }}
          >
            비밀번호를 잊으셨나요?
          </div>
          <input
            className={styles.login_input}
            name="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="아이디(e-mail)"
          />
        </div>
        <div>
          <button className={styles.login_submit} type="submit">
            인증메일 발송
          </button>
        </div>
      </form>
    </div>
  );
}
export default PwSearchPage;

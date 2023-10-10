import { useState } from 'react';
import styles from './NewPasswordPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { putNewPasswordApi } from '../../apis/api';
function NewPasswordPage() {
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const params = new URL(document.location.toString()).searchParams;
  const uid = params.get('uid');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      password1: password,
      password2: passwordCheck,
      uid: uid,
    };
    if (uid) {
      putNewPasswordApi(formData).then((res) => {
        // console.log('비밀번호 변경 완', res);
        if (res.status === 200) {
          alert('비밀번호가 변경되었습니다. 다시 로그인 해주세요');
          navigate('/');
        }
      });
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.wrapper}>
        <div>
          <input
            className={styles.login_input}
            name="password"
            type="password"
            value={password}
            placeholder="새 비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            className={styles.login_input}
            name="passwordCheck"
            type="password"
            value={passwordCheck}
            placeholder="새 비밀번호 확인"
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
        </div>
        <div>
          <button className={styles.login_submit} type="submit">
            비밀번호 변경
          </button>
        </div>
      </form>
    </div>
  );
}
export default NewPasswordPage;

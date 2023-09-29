import { useState } from 'react';
import styles from './NewPasswordPage.module.css';
function NewPasswordPage() {
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const handleSubmit = () => {};
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.wrapper}>
        <div>
          <input
            className={styles.login_input}
            name="password"
            value={password}
            placeholder="새 비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            className={styles.login_input}
            name="passwordCheck"
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

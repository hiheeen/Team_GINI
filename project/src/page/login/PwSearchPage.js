import { useNavigate } from 'react-router-dom';
import styles from './PwSearchPage.module.css';
function PwSearchPage() {
  const navigate = useNavigate();
  const handleSubmit = () => {};
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
            // value={userId}
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

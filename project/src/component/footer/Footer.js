import styles from './Footer.module.css';
import { FaGithub, FaInstagram } from 'react-icons/fa';
function Footer() {
  return (
    <div className={styles.container}>
      <div style={{ fontSize: 13 }}>
        팀 on&off는 간직하고 싶은 소중한 것들을 기록하는 사이트를 만들어가고
        있습니다.{' '}
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>
          Team Jini
        </div>
        <div style={{ display: 'flex', marginRight: 20, alignItems: 'center' }}>
          <div className={styles.footer_name}>김희은</div>
          <div className={styles.footer_links}>
            <a
              style={{ marginRight: 5 }}
              href="https://www.instagram.com/_hiniminih_/"
              className={styles.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram size={20} color="black" />
            </a>
            <a
              href="https://github.com/hiheeen"
              className={styles.github}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={20} color="black" />
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className={styles.footer_name}>김진우</div>
          <div className={styles.footer_links}>
            <a
              style={{ marginRight: 5 }}
              href="https://www.instagram.com/sds7629/"
              className={styles.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram size={20} color="black" />
            </a>
            <a
              href="https://github.com/sds7629"
              className={styles.github}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={20} color="black" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;

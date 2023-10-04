import styles from './Footer.module.css';
import { FaGithub, FaInstagram } from 'react-icons/fa';
function Footer() {
  return (
    <div className={styles.container}>
      <div>팀 소개</div>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: 20 }}>Team Jini</div>
        <div style={{ display: 'flex', marginRight: 20 }}>
          <div className={styles.footer_name}>김희은</div>
          <div className={styles.footer_links}>
            <a
              href="https://www.instagram.com/_hiniminih_/"
              className="instagram"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram size={20} color="black" />
            </a>
            <a
              href="https://github.com/hiheeen"
              className="github"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={20} color="black" />
            </a>
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div className={styles.footer_name}>김진우</div>
          <div className={styles.footer_links}>
            <a
              href="https://www.instagram.com/sds7629/"
              className="instagram"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram size={20} color="black" />
            </a>
            <a
              href="https://github.com/sds7629"
              className="github"
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

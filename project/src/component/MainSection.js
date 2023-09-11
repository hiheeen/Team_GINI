import styles from './MainSection.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderClosed } from '@fortawesome/free-solid-svg-icons';
function MainSection() {
  return (
    <div className={styles.container}>
      <div className={styles.mainSection_header}>
        <div>업로드 하기</div>
        <div>
          <input placeholder="search" />
        </div>
      </div>
      <div>
        <FontAwesomeIcon
          icon={faFolderClosed}
          style={{
            width: 150,
            height: 200,
            color: 'rgb(252, 144, 125)',
            padding: 20,
          }}
        />
        <FontAwesomeIcon
          icon={faFolderClosed}
          style={{
            width: 150,
            height: 200,
            color: 'rgb(250, 250, 150)',
            padding: 20,
          }}
        />
      </div>
    </div>
  );
}
export default MainSection;

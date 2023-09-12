import styles from './UpLoadPage.module.css';
function UpLoadPage() {
  return (
    <div className={styles.container}>
      <div>
        <form>
          <div>제목</div>
          <div>사진</div>
          <div>글</div>
          <div>카테고리 설정</div>
          <div>on/off</div>
          <button>저장하기</button>
        </form>
      </div>
    </div>
  );
}
export default UpLoadPage;

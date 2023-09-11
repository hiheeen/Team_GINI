import { useState } from 'react';
import styles from './Category.module.css';
function Category() {
  const [showPeoples, setShowPeoples] = useState(false);
  return (
    <div className={styles.container}>
      <div>카테고리</div>
      <div className={styles.category_container}>
        <div>여행지</div>
        <div>책/글귀</div>
        <div>노래</div>
        <div>영화/드라마</div>
        <div>게임</div>
        <div>추억</div>
        <div>그림</div>
        <div>아이디어</div>
        <div>음식</div>
        <div>장소</div>
        <div>취미</div>
      </div>
      <div
        className={styles.showPeoples}
        onClick={() => setShowPeoples(!showPeoples)}
      >
        둘러보기 <span>{showPeoples ? '<<' : '>>'}</span>
      </div>
      {showPeoples ? (
        <div className={styles.showPeoples_container}>
          <div>all</div>
          <div>여행지</div>
          <div>책/글귀</div>
          <div>노래</div>
          <div>영화/드라마</div>
          <div>게임</div>
          <div>추억</div>
          <div>그림</div>
          <div>아이디어</div>
          <div>음식</div>
          <div>장소</div>
          <div>취미</div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
export default Category;

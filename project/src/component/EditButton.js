import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import styles from './EditButton.module.css';
function EditButton({ handleDeleteClick, handleEdit }) {
  const [showEdits, setShowEdits] = useState(false);
  const modalRef = useRef();
  const handleDots = () => {
    setShowEdits(!showEdits);
  };
  const handleOutsideClick = (e) => {
    if (showEdits && !modalRef.current.contains(e.target)) {
      setShowEdits(false);
    }
  };
  useEffect(() => {
    // click이벤트로 하게되면 edit버튼 클릭할 때 이벤트 감지, 열리자마자 닫혀버림
    document.addEventListener('mousedown', handleOutsideClick);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showEdits]);
  return (
    <div>
      <div
        ref={modalRef}
        className={styles.ellipsis_button}
        onClick={handleDots}
      >
        <FontAwesomeIcon icon={faEllipsis} size="xl" />
        {showEdits && (
          <div className={styles.dropdown_element}>
            <div onClick={handleEdit} className={styles.edit_button}>
              수정
            </div>
            <div onClick={handleDeleteClick} className={styles.remove_button}>
              삭제
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default EditButton;

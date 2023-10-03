import { useNavigate } from 'react-router-dom';
import styles from '../page/main/MainPage.module.css';
import { Fab } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { onOffState } from '../recoil/onOff';
import EditIcon from '@mui/icons-material/Edit';

function MiniHeader({ handleFilterOrder, handleFilterPosts, filter, order }) {
  const navigate = useNavigate();
  const onOff = useRecoilValue(onOffState);

  return (
    <div className={styles.upload}>
      <div className={styles.mainSection_header}>
        {/* <button onClick={() => navigate('/upload/default/')}>
      기록하기
    </button> */}
        <Fab
          style={{
            cursor: 'pointer',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
            zIndex: 50,
          }}
          onClick={() => navigate('/upload/default/')}
          color="white"
          aria-label="edit"
          size="small"
        >
          <EditIcon />
        </Fab>
        <div>
          {!onOff && (
            <select onChange={handleFilterPosts} value={filter}>
              <option value="all">모두 보기</option>
              <option value="myPosts">나만 보기</option>
            </select>
          )}

          <div>
            <select onChange={handleFilterOrder} value={order}>
              <option value="new">최신 순</option>
              <option value="old">오래된 순</option>
              <option value="like">좋아요 순</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MiniHeader;

import { useCookies } from 'react-cookie';
import {
  deleteFeedApi,
  getDetailApi,
  getInfoApi,
  getSecretFeedApi,
} from '../../apis/api';
import styles from './DetailPage.module.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
function DetailPage() {
  const [cookies] = useCookies(['access_token']);
  const queryClient = useQueryClient();
  const params = useParams();
  const feedId = params.id;
  const deleteFeedMutation = useMutation(
    (itemId) => deleteFeedApi(itemId, cookies.access_token),
    {
      // 성공 시에 QueryCache 대신 onSuccess 내에서 invalidateQueries 사용
      onSuccess: (data) => {
        // 새로운 쿼리를 무효화합니다.
        queryClient.invalidateQueries('feedData');
        console.log('데이터 삭제 성공', data);
      },
    },
  );
  const { data, isLoading } = useQuery(['detailData', feedId], () =>
    getDetailApi(cookies.access_token, feedId),
  );
  console.log('detailData', data);
  const { data: infoData, isLoading: infoLoading } = useQuery(['getInfo'], () =>
    getInfoApi(cookies.access_token),
  );
  if (isLoading) {
    return <div>is loading...</div>;
  }

  if (infoLoading) {
    return <div>is loading...</div>;
  }

  const handleDeleteClick = (itemId) => {
    const confirmDelete = window.confirm('게시글을 삭제하시겠습니까?');
    if (confirmDelete) {
      deleteFeedMutation.mutate(itemId);
    }
  };
  const getCategoryText = (category) => {
    switch (category) {
      case 'travel':
        return '여행지';
      case 'phrase':
        return '책/글귀';
      case 'sing':
        return '노래';
      case 'movie_drama':
        return '영화/드라마';
      case 'game':
        return '게임';
      case 'memory':
        return '추억';
      case 'paint':
        return '그림';
      case 'idea':
        return '아이디어';
      case 'food':
        return '음식';
      case 'place':
        return '장소';
      case 'hobby':
        return '취미';
      default:
        return '';
    }
  };
  return (
    <div className={styles.container}>
      <div>
        {data.data.writer === infoData.data.nickname && (
          <div style={{ display: 'flex', justifyContent: 'right' }}>
            <div
              style={{
                padding: '10px 5px',
                cursor: 'pointer',
              }}
            >
              수정
            </div>

            <div
              style={{
                padding: '10px 5px',
                textAlign: 'right',
                cursor: 'pointer',
              }}
              onClick={() => handleDeleteClick(data.data.id)}
            >
              삭제
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img className={styles.feedImg} alt="" src={data.data.file} />
        </div>
        <div className={styles.date_category}>
          <div className={styles.date}>
            {' '}
            {dayjs(data.data.created_at).format('YYYY-MM-DD')}
          </div>
          <div className={styles.category}>
            {getCategoryText(data.data.category)}
          </div>
        </div>
        <div>
          <div className={styles.title}>{data.data.title}</div>
          <div className={styles.content}>{data.data.content}</div>
        </div>
      </div>
    </div>
  );
}
export default DetailPage;

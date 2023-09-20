import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDetailApi, reviewDeleteApi } from '../apis/api';
import { useCookies } from 'react-cookie';
import styles from './Reviews.module.css';
function Review({ feedId, nickname }) {
  const [cookies] = useCookies(['access_token']);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(['reviewData', feedId], () =>
    getDetailApi(cookies.access_token, feedId),
  );
  console.log(data, 'reviewData');
  const deleteReviewMutation = useMutation(
    (reviewId) => reviewDeleteApi(cookies.access_token, feedId, reviewId),
    {
      // 성공 시에 QueryCache 대신 onSuccess 내에서 invalidateQueries 사용
      onSuccess: (data) => {
        // 새로운 쿼리를 무효화합니다.
        queryClient.invalidateQueries('reviewData');
        console.log('리뷰 삭제 성공', data);
      },
    },
  );

  if (isLoading) {
    return <div>is Loading...</div>;
  }

  const handleReviewDelete = (reviewId) => {
    const confirmDelete = window.confirm('댓글을 삭제하시겠습니까?');
    if (confirmDelete) {
      deleteReviewMutation.mutate(reviewId);
    }
    // reviewDeleteApi(cookies.access_token, feedId, reviewId)
    //   .then((res) => console.log('리뷰 삭제 성공', res))
    //   .catch((err) => console.log('리뷰 삭제 실패', err));
  };
  return (
    <div>
      {data.data.reviews?.map((item, index) => (
        <div className={styles.review_container} key={index}>
          <div style={{ marginRight: 10 }}>{item.writer}</div>
          <div style={{ marginRight: 10 }}>{item.content}</div>
          {nickname === item.writer && (
            <div
              style={{ cursor: 'pointer', color: 'black' }}
              onClick={() => handleReviewDelete(item.id)}
            >
              삭제
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
export default Review;

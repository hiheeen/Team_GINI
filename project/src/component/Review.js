import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDetailApi, postReviewApi, reviewDeleteApi } from '../apis/api';
import { useCookies } from 'react-cookie';
import styles from './Reviews.module.css';
import { useState } from 'react';
import { reviewOpenState } from '../recoil/reviewOpen';
import { useRecoilState } from 'recoil';
function Review({ feedId, nickname }) {
  const [cookies] = useCookies(['access_token']);
  const queryClient = useQueryClient();
  const [reviewValue, setReviewValue] = useState({});
  const [isReviewOpen, setIsReviewOpen] = useRecoilState(reviewOpenState);

  const { data, isLoading } = useQuery(['detailData', feedId], () =>
    getDetailApi(cookies.access_token, feedId),
  );
  // console.log(data, 'detailData');
  const deleteReviewMutation = useMutation(
    (reviewId) => reviewDeleteApi(cookies.access_token, feedId, reviewId),
    {
      // 성공 시에 QueryCache 대신 onSuccess 내에서 invalidateQueries 사용
      onSuccess: (data) => {
        // 새로운 쿼리를 무효화합니다.
        queryClient.invalidateQueries('detailData');
        console.log('리뷰 삭제 성공', data);
      },
    },
  );
  // const postReviewMutation = useMutation(
  //   (formData) => postReviewApi(cookies.access_token, feedId, formData),
  //   {
  //     onSuccess: (data) => {
  //       // 새로운 쿼리를 무효화합니다.
  //       queryClient.invalidateQueries('detailData');
  //       console.log('리뷰 post 성공', data);
  //       setReviewValue({
  //         ...reviewValue,
  //         [feedId]: '',
  //       });
  //       setIsReviewOpen(true);
  //     },
  //     onError: (error) => {
  //       // console.log('리뷰 post 안됨', error);
  //       if (error.response.status === 400) {
  //         alert('이미 리뷰를 작성하셨습니다');
  //         setReviewValue({
  //           ...reviewValue,
  //           [feedId]: '',
  //         });
  //       }
  //     },
  //   },
  // );
  if (isLoading) {
    return <div>is Loading...</div>;
  }
  // const handleReviewPost = (feedId) => {
  //   const formData = {
  //     content: reviewValue[feedId],
  //   };
  //   // postReviewApi(cookies.access_token, feedId, formData)
  //   //   .then((res) => {
  //   //     console.log('리뷰 post 성공', res);
  //   //     setReviewValue({
  //   //       ...reviewValue,
  //   //       [feedId]: '',
  //   //     });
  //   //   })
  //   //   .catch((err) => console.log('리뷰 post 실패', err));
  //   postReviewMutation.mutate(formData);
  // };
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
      {/* <div>
        <input
          value={reviewValue[feedId] || ''}
          onChange={(e) =>
            setReviewValue({
              ...reviewValue,
              [feedId]: e.target.value,
            })
          }
          placeholder="댓글을 입력하세요"
        ></input>
        <button onClick={() => handleReviewPost(feedId)}>댓글 쓰기</button>
      </div> */}
    </div>
  );
}
export default Review;

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteReplyApi,
  getDetailApi,
  getReviewDetailApi,
  postReplyApi,
  postReviewApi,
  reviewDeleteApi,
} from '../apis/api';
import { useCookies } from 'react-cookie';
import styles from './Reviews.module.css';
import { useState } from 'react';
import { reviewOpenState } from '../recoil/reviewOpen';
import { useRecoilState } from 'recoil';
function Review({ feedId, nickname, feedWriter }) {
  const [cookies] = useCookies(['access_token']);
  const queryClient = useQueryClient();
  const [reviewValue, setReviewValue] = useState({});
  const [isReviewOpen, setIsReviewOpen] = useRecoilState(reviewOpenState);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyValue, setReplyValue] = useState();
  const { data, isLoading } = useQuery(['detailData', feedId], () =>
    getDetailApi(cookies.access_token, feedId),
  );
  // console.log(data, 'detailData');
  const { data: reviewDetailData, isLoading: detailReviewLoading } = useQuery(
    ['reviewDetail', feedId],
    () => getReviewDetailApi(feedId, cookies.access_token),
  );
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
  const postReplyMutation = useMutation(
    (data) => {
      const { reviewId, formData } = data;
      return postReplyApi(feedId, reviewId, formData, cookies.access_token);
    },

    {
      // 성공 시에 QueryCache 대신 onSuccess 내에서 invalidateQueries 사용
      onSuccess: (data) => {
        // 새로운 쿼리를 무효화합니다.
        queryClient.invalidateQueries('reviewDetail');
        console.log('리뷰 post mutation', data);
      },
    },
  );
  const deleteReplyMutation = useMutation(
    (replyId) => deleteReplyApi(replyId, cookies.access_token),
    {
      onSuccess: (data) => {
        // 새로운 쿼리를 무효화합니다.
        queryClient.invalidateQueries('reviewDetail');
        console.log('리뷰 delete mutation', data);
      },
    },
  );
  if (isLoading) {
    return <div>is Loading...</div>;
  }
  if (detailReviewLoading) {
    return <div>is Loading...</div>;
  }
  const handleReviewDelete = (reviewId) => {
    const confirmDelete = window.confirm('댓글을 삭제하시겠습니까?');
    if (confirmDelete) {
      deleteReviewMutation.mutate(reviewId);
    }
  };
  const handlePostReply = (reviewId) => {
    const formData = {
      content: replyValue,
    };
    postReplyMutation.mutate({ reviewId, formData });
    setReplyValue('');
  };
  const handleDeleteReply = (replyId) => {
    const confirmDelete = window.confirm('댓글을 삭제하시겠습니까?');
    if (confirmDelete) {
      deleteReplyMutation.mutate(replyId);
    }
  };
  return (
    <div>
      {data.data.reviews?.map((item, index) => (
        <div key={index}>
          <div className={styles.review_container}>
            <div style={{ marginRight: 10, fontWeight: 600 }}>
              {item.writer}
            </div>
            <div style={{ marginRight: 10 }}>{item.content}</div>
            {nickname === item.writer && (
              <div
                style={{ cursor: 'pointer', color: 'black' }}
                onClick={() => handleReviewDelete(item.id)}
              >
                삭제
              </div>
            )}
            {nickname === feedWriter && nickname !== item.writer && (
              <div
                style={{ cursor: 'pointer', color: 'black' }}
                onClick={() => setReplyOpen(!replyOpen)}
              >
                {replyOpen ? '닫기' : '답글 달기'}
              </div>
            )}
          </div>
          {reviewDetailData.data.map((it) =>
            it.replies.map(
              (rep) =>
                it.id === item.id && (
                  <div
                    style={{
                      padding: '10px 20px',
                      fontSize: '13px',
                      color: 'grey',
                      display: 'flex',
                    }}
                  >
                    <span style={{ marginRight: 5, fontWeight: 600 }}>
                      {rep.writer}
                    </span>
                    <span style={{ marginRight: 5 }}>{rep.content}</span>
                    <div
                      style={{ color: 'black', cursor: 'pointer' }}
                      onClick={() => handleDeleteReply(rep.id)}
                    >
                      삭제
                    </div>
                  </div>
                ),
            ),
          )}
          {replyOpen && nickname !== item.writer && (
            <div style={{ padding: '10px 20px' }}>
              <input
                className={styles.reply_input}
                placeholder="답글을 남겨보세요"
                value={replyValue}
                onChange={(e) => setReplyValue(e.target.value)}
              ></input>
              <button onClick={() => handlePostReply(item.id)}>
                답글 쓰기
              </button>
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

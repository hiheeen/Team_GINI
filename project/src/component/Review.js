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
import { useEffect, useRef, useState } from 'react';
import { reviewOpenState } from '../recoil/reviewOpen';
import { useRecoilState } from 'recoil';
function Review({ feedId, nickname, feedWriter }) {
  const [cookies] = useCookies(['access_token']);
  const queryClient = useQueryClient();
  const [reviewValue, setReviewValue] = useState({});
  const [isReviewOpen, setIsReviewOpen] = useRecoilState(reviewOpenState);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyValue, setReplyValue] = useState({});
  const [replyMode, setReplyMode] = useState();
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current && replyOpen) {
      inputRef.current.focus();
    }
  }, [replyOpen]);
  useEffect(() => {
    setReplyOpen(true);
  }, [replyMode]);
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
      onSuccess: (data) => {
        queryClient.invalidateQueries('detailData');
        // console.log('리뷰 삭제 성공', data);
      },
    },
  );
  const postReplyMutation = useMutation(
    (data) => {
      const { reviewId, formData } = data;
      return postReplyApi(feedId, reviewId, formData, cookies.access_token);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('reviewDetail');
        // console.log('리뷰 post mutation', data);
      },
    },
  );
  const deleteReplyMutation = useMutation(
    (replyId) => deleteReplyApi(replyId, cookies.access_token),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('reviewDetail');
        // console.log('리뷰 delete mutation', data);
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
      content: replyValue[reviewId],
    };
    postReplyMutation.mutate({ reviewId, formData });
    setReplyValue({
      ...replyValue,
      [reviewId]: '',
    });
  };
  const handleDeleteReply = (replyId) => {
    const confirmDelete = window.confirm('댓글을 삭제하시겠습니까?');
    if (confirmDelete) {
      deleteReplyMutation.mutate(replyId);
    }
  };
  const handleReplyOpen = (itemId) => {
    setReplyOpen(!replyOpen);
    setReplyMode(itemId);
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
                onClick={() => handleReplyOpen(item.id)}
              >
                {replyOpen && replyMode === item.id ? '닫기' : '답글 달기'}
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
          {replyOpen && replyMode === item.id && (
            <div style={{ padding: '10px 20px' }}>
              <input
                ref={inputRef}
                className={styles.reply_input}
                placeholder="답글을 남겨보세요"
                value={replyValue[item.id] || ''}
                onChange={(e) =>
                  setReplyValue({
                    ...replyValue,
                    [item.id]: e.target.value,
                  })
                }
              ></input>
              <button
                className={styles.reply_btn}
                onClick={() => handlePostReply(item.id)}
              >
                작성
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
export default Review;

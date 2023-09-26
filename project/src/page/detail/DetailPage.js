import { useCookies } from 'react-cookie';
import {
  deleteFeedApi,
  getDetailApi,
  getInfoApi,
  getSecretFeedApi,
  postReviewApi,
} from '../../apis/api';
import styles from './DetailPage.module.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { reviewOpenState } from '../../recoil/reviewOpen';
import { useState } from 'react';
import Review from '../../component/Review';
function DetailPage() {
  const [cookies] = useCookies(['access_token']);
  const queryClient = useQueryClient();
  const params = useParams();
  const feedId = params.id;
  const [isReviewOpen, setIsReviewOpen] = useRecoilState(reviewOpenState);
  const [reviewValue, setReviewValue] = useState({});
  const [reviewMode, setReviewMode] = useState();
  // offState postMutation
  const postReviewMutation = useMutation(
    (data) => {
      const { feedId, formData } = data;
      return postReviewApi(cookies.access_token, feedId, formData);
    },
    {
      onSuccess: (data) => {
        // 새로운 쿼리를 무효화합니다.
        queryClient.invalidateQueries('detailData');
        console.log('리뷰 post 성공', data);
        setIsReviewOpen(true);
      },
      onError: (error) => {
        // console.log('리뷰 post 안됨', error);
        if (error.response.status === 400) {
          alert('이미 리뷰를 작성하셨습니다');
        }
      },
    },
  );
  // offState deleteMutation
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
  // offState detailData
  const { data, isLoading } = useQuery(['detailData', feedId], () =>
    getDetailApi(cookies.access_token, feedId),
  );
  // console.log('detailData', data);
  const { data: infoData, isLoading: infoLoading } = useQuery(['getInfo'], () =>
    getInfoApi(cookies.access_token),
  );

  // offState delete button
  const handleDeleteClick = (itemId) => {
    const confirmDelete = window.confirm('게시글을 삭제하시겠습니까?');
    if (confirmDelete) {
      deleteFeedMutation.mutate(itemId);
    }
  };
  // offState modify
  const handleModify = (itemId) => {
    setIsReviewOpen(!isReviewOpen);
    setReviewMode(itemId);
  };
  // offState review post button
  const handleReviewPost = (e, feedId) => {
    e.preventDefault();
    const formData = {
      content: reviewValue[feedId],
    };
    console.log(formData, 'formData');
    postReviewMutation.mutate({ feedId, formData });
    setReviewValue({
      ...reviewValue,
      [feedId]: '',
    });
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
  if (isLoading) {
    return <div>is loading...</div>;
  }

  if (infoLoading) {
    return <div>is loading...</div>;
  }
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
        <div
          style={{ cursor: 'pointer', padding: '10px 0' }}
          onClick={() => handleModify(data.data.id)}
        >
          {data.data.reviews.length !== 0 &&
            (isReviewOpen && reviewMode === data.data.id
              ? '댓글 닫기'
              : `댓글 ${data.data.reviews.length}개 모두 보기`)}
        </div>
        {isReviewOpen && reviewMode === data.data.id ? (
          <div style={{ display: 'flex' }}>
            <Review feedId={data.data.id} nickname={infoData.data.nickname} />
          </div>
        ) : (
          ''
        )}
        <form onSubmit={(e) => handleReviewPost(e, data.data.id)}>
          <div>
            <input
              value={reviewValue[data.data.id] || ''}
              onChange={(e) =>
                setReviewValue({
                  ...reviewValue,
                  [data.data.id]: e.target.value,
                })
              }
              placeholder="댓글을 입력하세요"
            ></input>
            <button
              type="submit"
              // onClick={() => handleReviewPost(item.id)}
            >
              댓글 쓰기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default DetailPage;

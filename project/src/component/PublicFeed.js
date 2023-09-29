import styles from './Feed.module.css';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteFeedApi,
  feedLikeApi,
  getFeedApi,
  getInfoApi,
  postReviewApi,
} from '../apis/api';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { reviewOpenState } from '../recoil/reviewOpen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import Review from './Review';
import dayjs from 'dayjs';
function PublicFeed() {
  const [cookies] = useCookies(['access_token']);
  const [reviewMode, setReviewMode] = useState();
  const [isReviewOpen, setIsReviewOpen] = useRecoilState(reviewOpenState);
  const [isLiked, setIsLiked] = useState(false);
  const [reviewValue, setReviewValue] = useState({});

  const queryClient = useQueryClient();

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
  const { data: infoData } = useQuery(['getInfo'], () =>
    getInfoApi(cookies.access_token),
  );
  const { data: feedData, isLoading } = useQuery(
    ['feedData'],
    () => getFeedApi(cookies.access_token),
    // {
    //   staleTime: 300000, // 5분 동안 데이터를 "느껴지게" 함
    // },
  );
  // console.log('feedData false값들', feedData);
  if (isLoading) {
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
  const handleModify = (itemId) => {
    setIsReviewOpen(!isReviewOpen);
    setReviewMode(itemId);
  };

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
  const handleFeedLike = async (feedId) => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      await feedLikeApi(feedId, cookies.access_token)
        .then((res) => {
          console.log(res, '좋아요 전송');
          queryClient.invalidateQueries('feedData');
        })
        .catch((err) => console.log(err, '좋아요 에러'));
    }
  };
  return (
    <div>
      {feedData.data.results?.map((item, index) => (
        <div key={index}>
          <div className={styles.container}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 10px 10px 10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                  <img
                    style={{
                      width: 40,
                      borderRadius: '50%',
                      marginRight: 10,
                    }}
                    alt=""
                    src={item.writer.profile}
                  />
                </div>
                <div>{item.writer.nickname}</div>
              </div>
              {item.writer.nickname === infoData.data.nickname && (
                <div style={{ display: 'flex' }}>
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
                    onClick={() => handleDeleteClick(item.id)}
                  >
                    삭제
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img className={styles.feedImg} alt="" src={item.file} />
            </div>
            <div className={styles.date_category}>
              <div onClick={() => handleFeedLike(item.id)}>
                {isLiked ? (
                  <FontAwesomeIcon icon={solidHeart} color="red" />
                ) : (
                  <FontAwesomeIcon icon={regularHeart} />
                )}
              </div>
              <div style={{ marginRight: 10 }}>{item.likes_count}</div>
              <div className={styles.date}>
                {dayjs(item.created_at).format('YYYY-MM-DD')}
              </div>
              <div className={styles.category}>
                {getCategoryText(item.category)}
              </div>
            </div>
            <div style={{ padding: '0 10px' }}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.content}>{item.content}</div>
            </div>
            <div
              style={{
                cursor: 'pointer',
                padding: '10px',
                fontSize: '13px',
                color: 'grey',
              }}
              onClick={() => handleModify(item.id)}
            >
              {item.review_count !== 0 &&
                (isReviewOpen && reviewMode === item.id
                  ? '댓글 닫기'
                  : `댓글 ${item.review_count}개 모두 보기`)}
            </div>
            {isReviewOpen && reviewMode === item.id ? (
              <div style={{ display: 'flex' }}>
                <Review
                  feedId={item.id}
                  nickname={infoData.data.nickname}
                  feedWriter={item.writer.nickname}
                />
              </div>
            ) : (
              ''
            )}
            <form onSubmit={(e) => handleReviewPost(e, item.id)}>
              <div style={{ padding: '0 10px' }}>
                <input
                  className={styles.review_input}
                  value={reviewValue[item.id] || ''}
                  onChange={(e) =>
                    setReviewValue({
                      ...reviewValue,
                      [item.id]: e.target.value,
                    })
                  }
                  placeholder="댓글을 남겨보세요"
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
      ))}
    </div>
  );
}
export default PublicFeed;

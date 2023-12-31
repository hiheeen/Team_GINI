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
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { reviewOpenState } from '../recoil/reviewOpen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import Review from './Review';
import dayjs from 'dayjs';
import EditButton from './EditButton';
import { useNavigate } from 'react-router-dom';
import KakaoShareBtn from './kakaoShare/KakaoShareBtn';
function PublicFeed({ filter, order }) {
  const [cookies] = useCookies(['access_token']);
  const [reviewMode, setReviewMode] = useState();
  const [isReviewOpen, setIsReviewOpen] = useRecoilState(reviewOpenState);
  const [isLiked, setIsLiked] = useState(false);
  const [reviewValue, setReviewValue] = useState({});
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  useEffect(() => {
    setIsReviewOpen(true);
  }, [reviewMode]);

  const postReviewMutation = useMutation(
    (data) => {
      const { feedId, formData } = data;
      return postReviewApi(cookies.access_token, feedId, formData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('detailData');
        setIsReviewOpen(true);
      },
      onError: (error) => {
        if (error.response.status === 400) {
          alert('이미 리뷰를 작성하셨습니다');
        }
      },
    },
  );
  const deleteFeedMutation = useMutation(
    (itemId) => deleteFeedApi(itemId, cookies.access_token),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('feedData');
      },
    },
  );
  const feedLikeMutation = useMutation(
    (feedId) => feedLikeApi(feedId, cookies.access_token),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('feedData');
      },
    },
  );
  const { data: infoData, isLoading: infoLoading } = useQuery(['getInfo'], () =>
    getInfoApi(cookies.access_token),
  );
  //   console.log(infoData, '인포');
  const { data: feedData, isLoading } = useQuery(['feedData'], () =>
    getFeedApi(cookies.access_token),
  );
  // console.log('feedData false값들', feedData);
  if (infoLoading) {
    return <div>is loading...</div>;
  }
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
    // console.log(formData, 'formData');
    postReviewMutation.mutate({ feedId, formData });
    setReviewValue({
      ...reviewValue,
      [feedId]: '',
    });
  };

  const handleFeedLike = (feedId) => {
    setIsLiked(!isLiked);

    feedLikeMutation.mutate(feedId);
  };
  const handleEdit = (itemId) => {
    navigate(`/edit/${itemId}`);
  };
  const filteredPosts =
    feedData &&
    feedData?.data?.filter(
      (item) => item.writer.nickname === infoData?.data.nickname,
    );

  const filterLikePosts =
    feedData &&
    feedData?.data?.slice().sort((a, b) => b.likes_count - a.likes_count);

  const filterLikeMyPosts =
    filteredPosts &&
    filteredPosts?.sort((a, b) => b.likes_count - a.likes_count);

  return (
    <div>
      {feedData?.data?.length === 0 ? (
        <>
          <div className={styles.container}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 0 10px 0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                  <img
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      marginRight: 10,
                      border: '1px solid rgba(107, 112, 119, 0.2)',
                    }}
                    alt=""
                    src=""
                  />
                </div>
                <div>on&off</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img className={styles.feedImg} alt="" src="" />
            </div>
            <div className={styles.date_category}>
              <div className={styles.date}>2023-10-05</div>
              <div className={styles.category}>카테고리</div>
            </div>
            <div>
              <div className={styles.title}>제목</div>
              <div className={styles.content}>기록을 남겨주세요!</div>
            </div>
          </div>
        </>
      ) : (
        (filter === 'myPosts'
          ? order === 'new'
            ? filteredPosts?.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at),
              )
            : order === 'like'
            ? filterLikeMyPosts
            : order === 'old'
            ? filteredPosts
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .slice()
                .reverse()
            : null
          : filter === 'all'
          ? order === 'old'
            ? feedData?.data?.slice().reverse()
            : order === 'like'
            ? filterLikePosts
            : order === 'new'
            ? feedData?.data
            : null
          : null
        )?.map((item, index) => (
          <div key={index}>
            <div className={styles.container}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0 0 10px 0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'left',
                    alignItems: 'center',
                  }}
                >
                  <img
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      marginRight: 10,
                      border: '1px solid rgba(107, 112, 119, 0.2)',
                    }}
                    alt=""
                    src={item.writer.profile}
                  />

                  <div>{item.writer.nickname}</div>
                </div>
                {item.writer.nickname === infoData?.data?.nickname && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <KakaoShareBtn imgFile={item.file} />
                    <EditButton
                      handleEdit={() => handleEdit(item.id)}
                      handleDeleteClick={() => handleDeleteClick(item.id)}
                    />
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img className={styles.feedImg} alt="" src={item.file} />
              </div>

              <div className={styles.date_category}>
                <div
                  style={{ marginRight: 5 }}
                  onClick={() => handleFeedLike(item.id)}
                >
                  {item.is_like ? (
                    <FontAwesomeIcon icon={solidHeart} color="red" />
                  ) : (
                    <FontAwesomeIcon icon={regularHeart} />
                  )}
                </div>
                <div style={{ marginRight: 10 }}> {item.likes_count}</div>
                <div className={styles.date}>
                  {dayjs(item.created_at).format('YYYY-MM-DD')}
                </div>
                <div className={styles.category}>
                  {getCategoryText(item.category)}
                </div>
              </div>

              <div>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.content}>{item.content}</div>
              </div>
              {item.review_count !== 0 && (
                <div
                  style={{
                    cursor: 'pointer',
                    padding: '20px 0 0 0',
                    fontSize: '13px',
                    color: 'grey',
                  }}
                  onClick={() => handleModify(item.id)}
                >
                  {isReviewOpen && reviewMode === item.id
                    ? '댓글 닫기'
                    : `댓글 ${item.review_count}개 모두 보기`}
                </div>
              )}
              {isReviewOpen && reviewMode === item.id ? (
                <div style={{ display: 'flex' }}>
                  <Review
                    feedId={item.id}
                    nickname={infoData?.data?.nickname}
                    feedWriter={item.writer.nickname}
                  />
                </div>
              ) : (
                ''
              )}
              <form onSubmit={(e) => handleReviewPost(e, item.id)}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 0',
                  }}
                >
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
                    className={styles.review_button}
                    type="submit"
                    // onClick={() => handleReviewPost(item.id)}
                  >
                    작성
                  </button>
                </div>
              </form>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default PublicFeed;

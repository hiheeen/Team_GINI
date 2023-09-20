import styles from './Feed.module.css';
import dayjs from 'dayjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteFeedApi,
  deleteSecretFeedApi,
  getDetailApi,
  getFeedApi,
  getInfoApi,
  getSecretFeedApi,
  postReviewApi,
} from '../apis/api';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { onOffState } from '../recoil/onOff';
import Review from './Review';

// on/off 여부에 따라 feed에서 사람들의 프로필과 닉네임을 보여줘야 한다.
// off 일 때에는 안 보여줘도 됨. 내 것만 나오기 때문에.

function Feed() {
  const [cookies] = useCookies(['access_token']);
  // recoil로 on/off 상태관리
  const onOff = useRecoilValue(onOffState);
  // 댓글 상태관리
  const [reviewValue, setReviewValue] = useState({});
  // 댓글 열람 상태관리
  const [reviewMode, setReviewMode] = useState();
  const [reviewOpen, setReviewOpen] = useState(false);
  // react-query mutation 사용
  const queryClient = useQueryClient();

  const { data: infoData } = useQuery(['getInfo'], () =>
    getInfoApi(cookies.access_token),
  );
  const deleteSecretFeedMutation = useMutation(
    (itemId) => deleteSecretFeedApi(itemId, cookies.access_token),
    {
      // 성공 시에 QueryCache 대신 onSuccess 내에서 invalidateQueries 사용
      onSuccess: (data) => {
        // 새로운 쿼리를 무효화합니다.
        queryClient.invalidateQueries('secretData');
        console.log('데이터 삭제 성공', data);
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
  // const [feedData, setFeedData] = useState();
  const { data: feedData, isLoading } = useQuery(
    ['feedData'],
    () => getFeedApi(cookies.access_token),
    {
      staleTime: 300000, // 5분 동안 데이터를 "느껴지게" 함
    },
    // {
    //   onSuccess: () => setFeedData(data.data.results),
    // },
  );
  console.log('feedData false값들', feedData);
  const { data: secretData, isLoading: secretIsLoading } = useQuery(
    ['secretData'],
    () => getSecretFeedApi(cookies.access_token),
    // {
    //   staleTime: 300000, // 5분 동안 데이터를 "느껴지게" 함
    // },
  );
  console.log('secretData', secretData);
  if (isLoading) {
    return <div>is loading...</div>;
  }
  if (secretIsLoading) {
    return <div>is loading...</div>;
  }
  const handleDeleteSecretClick = (itemId) => {
    const confirmDelete = window.confirm('게시글을 삭제하시겠습니까?');
    if (confirmDelete) {
      deleteSecretFeedMutation.mutate(itemId);
    }
  };
  const handleDeleteClick = (itemId) => {
    const confirmDelete = window.confirm('게시글을 삭제하시겠습니까?');
    if (confirmDelete) {
      deleteFeedMutation.mutate(itemId);
    }
  };
  // const handleDeleteSecret = (itemId, accessToken) => {
  //   deleteSecretFeedApi(itemId, accessToken)
  //     .then((res) => {
  //       console.log('secretData delete성공', res);
  //       queryClient.invalidateQueries('secretData');
  //     })
  //     .catch((err) => console.log('secretData delete 실패', err));
  // };
  // const handleDelete = (itemId, accessToken) => {
  //   deleteFeedApi(itemId, accessToken)
  //     .then((res) => console.log('feedData delete성공', res))
  //     .catch((err) => console.log('feedData delete 실패', err));
  // };
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
    setReviewOpen(!reviewOpen);
    setReviewMode(itemId);
  };
  const handleReviewPost = (feedId) => {
    const formData = {
      content: reviewValue[feedId],
    };
    postReviewApi(cookies.access_token, feedId, formData)
      .then((res) => {
        console.log('리뷰 post 성공', res);
        setReviewValue({
          ...reviewValue,
          [feedId]: '',
        });
      })
      .catch((err) => console.log('리뷰 post 실패', err));
  };

  return (
    <div>
      {onOff
        ? secretData.data?.map((item, index) => (
            <div key={index}>
              <div className={styles.container}>
                {item.writer.nickname === infoData.data.nickname && (
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
                      onClick={() => handleDeleteClick(item.id)}
                    >
                      삭제
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img className={styles.feedImg} alt="" src={item.file} />
                </div>
                <div className={styles.date_category}>
                  <div className={styles.date}>
                    {' '}
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
              </div>
            </div>
          ))
        : feedData.data.results?.map((item, index) => (
            <div key={index}>
              <div className={styles.container}>
                {item.writer.nickname === infoData.data.nickname && (
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
                      onClick={() => handleDeleteClick(item.id)}
                    >
                      삭제
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img className={styles.feedImg} alt="" src={item.file} />
                </div>
                <div className={styles.date_category}>
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
                <div
                  style={{ cursor: 'pointer', padding: '10px 0' }}
                  onClick={() => handleModify(item.id)}
                >
                  {item.review_count !== 0 &&
                    (reviewOpen && reviewMode === item.id
                      ? '댓글 닫기'
                      : `댓글 ${item.review_count}개 모두 보기`)}
                </div>
                {reviewOpen && reviewMode === item.id && (
                  <div style={{ display: 'flex' }}>
                    <Review
                      feedId={item.id}
                      nickname={infoData.data.nickname}
                    />
                  </div>
                )}

                <div>
                  <input
                    value={reviewValue[item.id] || ''}
                    onChange={(e) =>
                      setReviewValue({
                        ...reviewValue,
                        [item.id]: e.target.value,
                      })
                    }
                    placeholder="댓글을 입력하세요"
                  ></input>
                  <button onClick={() => handleReviewPost(item.id)}>
                    댓글 쓰기
                  </button>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}
export default Feed;

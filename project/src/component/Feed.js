import styles from './Feed.module.css';
import dayjs from 'dayjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteFeedApi,
  deleteSecretFeedApi,
  getFeedApi,
  getSecretFeedApi,
} from '../apis/api';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { onOffState } from '../recoil/onOff';

// on/off 여부에 따라 feed에서 사람들의 프로필과 닉네임을 보여줘야 한다.
// off 일 때에는 안 보여줘도 됨. 내 것만 나오기 때문에.

function Feed() {
  const [cookies] = useCookies(['access_token']);
  const testImg = process.env.PUBLIC_URL + '/images/testImg.png';
  const testImg2 = process.env.PUBLIC_URL + '/images/testImg2.png';
  const onOff = useRecoilValue(onOffState);
  const queryClient = useQueryClient();
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

  return (
    <div>
      {onOff
        ? secretData.data?.map((item, index) => (
            <div key={index}>
              <div className={styles.container}>
                <div
                  style={{
                    padding: '10px 5px',
                    textAlign: 'right',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleDeleteSecretClick(item.id)}
                >
                  지우기
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img className={styles.feedImg} alt="" src={item.file} />
                </div>
                <div className={styles.date_category}>
                  <div className={styles.date}>
                    {' '}
                    {dayjs(item.created_at).format('YYYY-MM-DD')}
                  </div>
                  <div className={styles.category}>
                    {item.category === 'travel'
                      ? '여행지'
                      : item.category === 'phrase'
                      ? '책/글귀'
                      : item.category === 'sing'
                      ? '노래'
                      : item.category === 'movie_drama'
                      ? '영화/드라마'
                      : item.category === 'game'
                      ? '게임'
                      : item.category === 'memory'
                      ? '추억'
                      : item.category === 'paint'
                      ? '그림'
                      : item.category === 'idea'
                      ? '아이디어'
                      : item.category === 'food'
                      ? '음식'
                      : item.category === 'place'
                      ? '장소'
                      : item.category === 'hobby'
                      ? '취미'
                      : ''}
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
                <div
                  style={{
                    padding: '10px 5px',
                    textAlign: 'right',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleDeleteClick(item.id)}
                >
                  지우기
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img className={styles.feedImg} alt="" src={item.file} />
                </div>
                <div className={styles.date_category}>
                  <div className={styles.date}>
                    {dayjs(item.created_at).format('YYYY-MM-DD')}
                  </div>
                  <div className={styles.category}>
                    {item.category === 'travel'
                      ? '여행지'
                      : item.category === 'phrase'
                      ? '책/글귀'
                      : item.category === 'sing'
                      ? '노래'
                      : item.category === 'movie_drama'
                      ? '영화/드라마'
                      : item.category === 'game'
                      ? '게임'
                      : item.category === 'memory'
                      ? '추억'
                      : item.category === 'paint'
                      ? '그림'
                      : item.category === 'idea'
                      ? '아이디어'
                      : item.category === 'food'
                      ? '음식'
                      : item.category === 'place'
                      ? '장소'
                      : item.category === 'hobby'
                      ? '취미'
                      : ''}
                  </div>
                </div>
                <div>
                  <div className={styles.content}>{item.content}</div>
                </div>
              </div>
            </div>
          ))}
      {feedData.data.results?.map((item) => (
        <div>{item.date}</div>
      ))}
    </div>
  );
}
export default Feed;

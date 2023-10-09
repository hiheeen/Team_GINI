import { useQuery } from '@tanstack/react-query';
import styles from './CategoryPage.module.css';
import { useCookies } from 'react-cookie';
import { getFeedApi, getInfoApi, getSecretFeedApi } from '../../apis/api';
import { useNavigate, useParams } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import Fab from '@mui/material/Fab';
import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';
import { onOffState } from '../../recoil/onOff';

function CategoryPage() {
  const params = useParams();
  const category = params.category;
  const [cookies] = useCookies(['access_token']);
  const navigate = useNavigate();
  const onOff = useRecoilValue(onOffState);
  const [filter, setFilter] = useState('all');
  const [order, setOrder] = useState('new');
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 820);

  const { data: secretData, isLoading: secretIsLoading } = useQuery(
    ['secretData'],
    () => getSecretFeedApi(cookies.access_token),
  );
  const { data: feedData, isLoading } = useQuery(['feedData'], () =>
    getFeedApi(cookies.access_token),
  );
  const { data: infoData } = useQuery(['getInfo'], () =>
    getInfoApi(cookies.access_token),
  );
  if (secretIsLoading) {
    return <div>is loading...??</div>;
  }
  const handleFilterPosts = (e) => {
    setFilter(e.target.value);
  };
  const handleFilterOrder = (e) => {
    setOrder(e.target.value);
  };
  const filteredPosts = feedData?.data?.results?.filter(
    (item) => item.writer.nickname === infoData.data.nickname,
  );
  const filterLikeMyPosts = filteredPosts.sort(
    (a, b) => b.likes_count - a.likes_count,
  );
  const filterLikePosts =
    feedData &&
    feedData?.data?.results
      ?.slice()
      .sort((a, b) => b.likes_count - a.likes_count);
  return (
    <div className={styles.container}>
      <div className={styles.feed}>
        <div className={styles.mainSection_header}>
          <Fab
            style={{
              cursor: 'pointer',
              boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
              zIndex: 50,
            }}
            onClick={() => navigate(`/upload/${category}`)}
            color="white"
            aria-label="edit"
            size="small"
          >
            <EditIcon />
          </Fab>
          <div style={{ display: 'flex' }}>
            {!onOff && (
              <select
                style={{ marginRight: 10 }}
                onChange={handleFilterPosts}
                value={filter}
              >
                <option value="all">모두 보기</option>
                <option value="myPosts">나만 보기</option>
              </select>
            )}

            <select onChange={handleFilterOrder} value={order}>
              <option value="new">최신 순</option>
              <option value="old">오래된 순</option>
              {!onOff && <option value="like">좋아요 순</option>}
            </select>
          </div>
        </div>

        <div className={styles.grid_container}>
          {onOff
            ? (order && order === 'old'
                ? secretData.data.slice().reverse()
                : secretData.data
              )?.map(
                (item) =>
                  item.category === category && (
                    <div
                      key={item.id}
                      style={{ backgroundImage: `url(${item.file})` }}
                      className={styles.grid_item}
                      onClick={() => navigate(`/secret/${category}/${item.id}`)}
                    >
                      <div style={{ padding: '10px 20px 0 20px' }}>
                        {dayjs(item.created_at).format('YYYY-MM-DD')}
                      </div>
                      <div style={{ fontWeight: 'bold', padding: '20px' }}>
                        {item.title}
                      </div>
                    </div>
                  ),
              )
            : (filter === 'myPosts'
                ? order === 'old'
                  ? filteredPosts.slice().reverse()
                  : order === 'like'
                  ? filterLikeMyPosts
                  : filteredPosts
                : order === 'old'
                ? feedData.data.results.slice().reverse()
                : order === 'like'
                ? filterLikePosts
                : feedData.data.results
              )?.map(
                (item) =>
                  item.category === category && (
                    <div
                      key={item.id}
                      style={{ backgroundImage: `url(${item.file})` }}
                      className={styles.grid_item}
                      onClick={() => navigate(`/${category}/${item.id}`)}
                    >
                      <div style={{ padding: '10px 20px 0 20px' }}>
                        {dayjs(item.created_at).format('YYYY-MM-DD')}
                      </div>
                      <div style={{ fontWeight: 'bold', padding: '20px' }}>
                        {item.title}
                      </div>
                    </div>
                  ),
              )}
        </div>
      </div>
    </div>
  );
}
export default CategoryPage;

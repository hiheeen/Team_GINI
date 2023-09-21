import { useQuery } from '@tanstack/react-query';
import styles from './CategoryPage.module.css';
import { useCookies } from 'react-cookie';
import { getFeedApi, getSecretFeedApi } from '../../apis/api';
import { useNavigate, useParams } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import Fab from '@mui/material/Fab';
import dayjs from 'dayjs';

function CategoryPage() {
  const params = useParams();
  const category = params.category;
  const [cookies] = useCookies(['access_token']);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState();

  const { data: secretData, isLoading: secretIsLoading } = useQuery(
    ['secretData'],
    () => getSecretFeedApi(cookies.access_token),
    // {
    //   staleTime: 300000, // 5분 동안 데이터를 "느껴지게" 함
    // },
  );
  const { data: feedData, isLoading } = useQuery(
    ['feedData'],
    () => getFeedApi(cookies.access_token),
    // {
    //   staleTime: 300000, // 5분 동안 데이터를 "느껴지게" 함
    // },
  );
  if (secretIsLoading) {
    return <div>is loading...</div>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.upload}>
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
          <div>
            <input
              placeholder="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={styles.grid_container}>
        {feedData.data.results?.map(
          (item) =>
            item.category === category && (
              <div
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
  );
}
export default CategoryPage;

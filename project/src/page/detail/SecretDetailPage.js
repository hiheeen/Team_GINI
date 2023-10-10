import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteSecretFeedApi,
  getInfoApi,
  getSecretDetailApi,
} from '../../apis/api';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import EditButton from '../../component/EditButton';
import styles from './SecretDetailPage.module.css';
function SecretDetailPage() {
  const [cookies] = useCookies(['access_token']);
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const { data: infoData, isLoading: infoLoading } = useQuery(['getInfo'], () =>
    getInfoApi(cookies.access_token),
  );
  const { data: secretData, isLoading: isSecretLoading } = useQuery(
    ['getSecretDetail', id],
    () => getSecretDetailApi(cookies.access_token, id),
  );
  console.log(secretData, 'secretData');
  if (isSecretLoading) {
    <div>is loading...</div>;
  }
  const queryClient = useQueryClient();

  const deleteSecretFeedMutation = useMutation(
    (itemId) => deleteSecretFeedApi(itemId, cookies.access_token),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('secretData');
        // console.log('데이터 삭제 성공', data);
      },
    },
  );
  const handleDeleteSecretClick = (itemId) => {
    const confirmDelete = window.confirm('게시글을 삭제하시겠습니까?');
    if (confirmDelete) {
      deleteSecretFeedMutation.mutate(itemId);
    }
  };
  const handleSecretEdit = (itemId) => {
    navigate(`/edit/secret/${itemId}`);
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
  return (
    <div>
      {secretData?.data?.map((item, index) => (
        <div key={index}>
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
                <EditButton
                  handleEdit={() => handleSecretEdit(item.id)}
                  handleDeleteClick={() => handleDeleteSecretClick(item.id)}
                />
              )}
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
                {getCategoryText(item.category)}
              </div>
            </div>
            <div>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.content}>{item.content}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default SecretDetailPage;

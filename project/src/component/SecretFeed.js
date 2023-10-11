import dayjs from 'dayjs';
import styles from './Feed.module.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteSecretFeedApi, getInfoApi, getSecretFeedApi } from '../apis/api';
import { useCookies } from 'react-cookie';
import EditButton from './EditButton';
import { useNavigate } from 'react-router-dom';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import SurfingOutlinedIcon from '@mui/icons-material/SurfingOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { FaGithub } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { loggedInState } from '../recoil/loggedIn';
function SecretFeed({ order }) {
  const [cookies] = useCookies(['access_token']);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInState);

  const navigate = useNavigate();
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
  const queryClient = useQueryClient();
  const toggleOn = process.env.PUBLIC_URL + '/images/toggleOn.png';
  const toggleOff = process.env.PUBLIC_URL + '/images/toggleOff.png';
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

  const { data: infoData } = useQuery(
    ['getInfo'],
    () => getInfoApi(cookies.access_token),
    { enabled: !!isLoggedIn },
  );
  const { data: secretData, isLoading: secretIsLoading } = useQuery(
    ['secretData'],
    () => getSecretFeedApi(cookies.access_token),
    { enabled: !!isLoggedIn },
  );
  if (secretIsLoading) {
    return <div></div>;
  }
  // console.log('secretdata', secretData);

  return (
    <div>
      {secretData?.data?.length === 0 ? (
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
                    src={infoData?.data?.profileImg}
                  />
                </div>
                <div>on&off</div>
              </div>
            </div>

            <div className={styles.fakeImg}>
              <div>안녕하세요, on&off입니다.</div>
              <div>간직하고 싶은 소중한 모든 것들을 기록해보세요.</div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AirplanemodeActiveIcon />
                <MenuBookOutlinedIcon />
                <MusicNoteOutlinedIcon />
                <LocalPostOfficeOutlinedIcon />
                <LiveTvOutlinedIcon />
                <PlaceOutlinedIcon />
                <SurfingOutlinedIcon />
                <LunchDiningOutlinedIcon />
              </div>
              <div>다양한 카테고리 별로 나누어 기록할 수 있고,</div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    style={{ height: 20, padding: '0 10px' }}
                    alt=""
                    src={toggleOff}
                  />
                  <div>off</div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    style={{ height: 20, padding: '0 10px' }}
                    alt=""
                    src={toggleOn}
                  />
                  <div>on</div>
                </div>
              </div>
              <div>
                모두에게 공유하고픈 기록, 나만 아껴보고 싶은 기록을 나눌 수
                있어요.
              </div>
              <div>맛집을 다녀와서 기억해두었다가 다시 가고 싶을 때</div>
              <div>친구와 함께 여행을 가서 보았던 풍경이 너무 예쁠 때</div>
              <div>몇번이고 다시 보고싶은 영화가 생겼을 때</div>
              <div>on&off에서 모든 순간을 기록하고, 기억할 수 있어요.</div>
              <div>더 궁금한 게 있다면, 아래로 문의해주세요.</div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: 5 }}>
                  front-end : 김희은 | gmldms0338@naver.com | github
                </div>
                <span>
                  <a
                    href="https://github.com/hiheeen"
                    className="github"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub size={20} color="black" />
                  </a>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: 5 }}>
                  back-end : 김진우 | sds7629@naver.com | github
                </div>
                <a
                  href="https://github.com/sds7629"
                  className="github"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub size={20} color="black" />
                </a>
              </div>
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
        <>
          {(order && order === 'old'
            ? secretData?.data.slice().reverse()
            : secretData?.data
          )?.map((item, index) => (
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
                          height: 40,
                          borderRadius: '50%',
                          marginRight: 10,
                          border: '1px solid rgba(107, 112, 119, 0.2)',
                        }}
                        alt=""
                        src={item.writer.profile}
                      />
                    </div>
                    <div>{item.writer.nickname}</div>
                  </div>
                  {item.writer.nickname === infoData?.data?.nickname && (
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
        </>
      )}
    </div>
  );
}
export default SecretFeed;

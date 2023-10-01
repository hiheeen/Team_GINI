import { useState } from 'react';
import styles from '../upload/UpLoadPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { EditFeedApi, getDetailApi } from '../../apis/api';
import { useRecoilState } from 'recoil';
import { onOffState } from '../../recoil/onOff';
function EditPage() {
  const [isOnOffState, setIsOnOffState] = useRecoilState(onOffState);
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [cookies] = useCookies(['access_token']);
  const [value, setValue] = useState({
    title: '',
    photo: '',
    content: '',
    category: '',
    is_secret: '',
  });
  const { data, isLoading } = useQuery(['detailData', id], () =>
    getDetailApi(cookies.access_token, id),
  );
  //   console.log('detailData', data);
  if (isLoading) {
    <div>is loading...</div>;
  }
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = {
      category: value.category || data?.data.category,
      title: value.title || data?.data.title,
      content: value.content || data?.data.content,
      is_secret: value.is_secret || data?.data.is_secret,
    };
    EditFeedApi(cookies.access_token, formData, id).then((res) => {
      console.log('수정 성공', res);
      if (formData.is_secret === false) {
        navigate(`/${value.category || data?.data.category}/${id}`);
        setIsOnOffState(false);
      } else {
        navigate(`/secret/${value.category || data?.data.category}/${id}`);
        setIsOnOffState(true);
      }
    });
  };
  return (
    <div className={styles.container}>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <input
              onChange={(e) =>
                setValue((prevValue) => ({
                  ...prevValue,
                  title: e.target.value, // title 상태 업데이트
                }))
              }
              className={styles.title}
              placeholder={data?.data.title}
              value={value.title}
            />
            <hr style={{ borderColor: 'rgba(120,120,120 , 0.2)' }} />
            <div className={styles.photoBox}>
              <img
                style={{ width: 200, height: 200 }}
                alt=""
                src={data?.data.file}
              ></img>
            </div>
            <hr style={{ borderColor: 'rgba(120,120,120 , 0.2)' }} />

            <div>
              <textarea
                onChange={(e) =>
                  setValue((prevValue) => ({
                    ...prevValue,
                    content: e.target.value, // content 상태 업데이트
                  }))
                }
                placeholder={data?.data.content}
                className={styles.description}
                value={value.content}
              />
            </div>
          </div>

          <div className={styles.category}>
            {' '}
            <select
              onChange={(e) =>
                setValue((prevValue) => ({
                  ...prevValue,
                  category: e.target.value, // category 상태 업데이트
                }))
              }
              value={value.category || data?.data.category}
            >
              <option value="" disabled>
                카테고리
              </option>
              <option value={'travel'}>여행지</option>
              <option value={'phrase'}>책/글귀</option>
              <option value={'sing'}>노래</option>
              <option value={'movie_drama'}>영화/드라마</option>
              <option value={'game'}>게임</option>
              <option value={'memory'}>추억</option>
              <option value={'paint'}>그림</option>
              <option value={'idea'}>아이디어</option>
              <option value={'food'}>음식</option>
              <option value={'place'}>장소</option>
              <option value={'hobby'}>취미</option>
            </select>
          </div>
          <div>
            <select
              onChange={(e) =>
                setValue((prevValue) => ({
                  ...prevValue,
                  is_secret: e.target.value, // is_secret 상태 업데이트
                }))
              }
              value={value.is_secret || data?.data.is_secret}
            >
              <option value="" disabled selected>
                on/off
              </option>
              <option value="true">on</option>
              <option value="false">off</option>
            </select>
          </div>
          <button type="submit">저장하기</button>
        </form>
      </div>
    </div>
  );
}
export default EditPage;

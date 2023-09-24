import { useEffect, useState } from 'react';
import styles from './MyPage.module.css';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getInfoApi, updateInfoApi } from '../../apis/api';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { style } from '@mui/system';
function MyPage() {
  const profileImg = process.env.PUBLIC_URL + '/images/Vector.png';
  const [profile, setProfile] = useState();
  const [cookies] = useCookies(['access_token']);
  const queryClient = useQueryClient();

  const [updateInfo, setUpdateInfo] = useState({
    nickname: '',
    description: '',
  });
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { data: infoData, isLoading } = useQuery(['infoData'], () =>
    getInfoApi(cookies.access_token),
  );
  const updateInfoMutation = useMutation(
    (formData) => updateInfoApi(cookies.access_token, formData),
    {
      onSuccess: (data) => {
        // 새로운 쿼리를 무효화합니다.
        queryClient.invalidateQueries('infoData');
        console.log('마이페이지 업데이트 성공', data);
        navigate('/');
      },
    },
  );
  const onSubmit = () => {
    const formData = {
      nickname: updateInfo.nickname || infoData.data.nickname,
      description: updateInfo.description,
    };
    updateInfoMutation.mutate(formData);
    // updateInfoApi(cookies.access_token, formData)
    //   .then((res) => {
    //     console.log('정보 수정', res);
    //     navigate('/');
    //   })
    //   .catch((err) => console.log('정보수정 에러', err));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // 파일의 내용을 읽어 이미지로 표시
        const result = e.target.result;
        setProfile(result); // 이미지를 표시하기 위해 상태 업데이트
      };
      reader.readAsDataURL(file);
    }
  };
  if (isLoading) {
    return <div>is Loading...</div>;
  }
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.login_form}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <img
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  border: '1px solid lightgrey',
                  marginRight: 20,
                }}
                alt=""
                src={profile ? profile : profileImg}
              />
            </div>
            <label style={{ fontSize: 12 }} className={styles.changeProfile}>
              이미지 변경
              <input
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </label>
          </div>
          {/* 이름 */}
          <div>
            <input
              disabled
              className={styles.signUp_input}
              id="username"
              name="username"
              type="text"
              placeholder={`${infoData.data.name}`}
            />
          </div>
          {/* 아이디 */}
          <div>
            <input
              disabled
              className={styles.signUp_input}
              type="text"
              name="userId"
              placeholder={`${infoData.data.email}`}
              autoComplete="userId"
            />
          </div>
          {/* 비밀번호 */}
          <div>
            <input
              disabled
              className={styles.signUp_input}
              id="password"
              type="password"
              name="password"
              placeholder="********"
              autoComplete="new-password"
            />
            {errors.password && (
              <div className={styles.alert} role="alert">
                {errors?.password?.message}
              </div>
            )}
          </div>
          {/* 닉네임 */}
          <div>
            <input
              autoFocus
              className={styles.signUp_input}
              name="nickname"
              type="text"
              value={updateInfo.nickname}
              onChange={(e) =>
                setUpdateInfo((prevValue) => ({
                  ...prevValue,
                  nickname: e.target.value, // content 상태 업데이트
                }))
              }
              placeholder={`${infoData.data.nickname}`}
            />
          </div>
          {/* 성별 */}
          <div>
            <select
              disabled
              className={styles.signUp_input}
              name="성별"
              value={`${infoData.data.gender}`}
            >
              <option value="" disabled>
                성별
              </option>
              <option value={'male'}>남</option>
              <option value={'female'}>여</option>
            </select>
          </div>
          <div>
            <textarea
              placeholder={
                `${infoData.data.description}` || '소개글을 입력해주세요'
              }
              onChange={(e) =>
                setUpdateInfo((prevValue) => ({
                  ...prevValue,
                  description: e.target.value, // content 상태 업데이트
                }))
              }
              className={styles.signUp_textarea}
            ></textarea>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          <button type="submit" className={styles.signUp_submit}>
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
}
export default MyPage;

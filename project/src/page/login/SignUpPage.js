import { Form, useNavigate } from 'react-router-dom';
import styles from './SignUpPage.module.css';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import AWS from 'aws-sdk';

import {
  kakaoLoginApi,
  signUpApi,
  valEmailApi,
  valNicknameApi,
} from '../../apis/api';
import Kakao from '../../component/socialLogin/Kakao';
function SignUpPage() {
  const profileImg = process.env.PUBLIC_URL + '/images/Vector.png';
  const [profile, setProfile] = useState();
  const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
  const [selectedFile, setSelectedFile] = useState();
  const [emailChecked, setEmailChecked] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  const [emailValue, setEmailValue] = useState();
  const password = watch('password', '');
  const validateId = (value) => {
    if (!value) return '이메일을 입력하세요.';
    if (!/\S+@\S+\.\S+/.test(value)) return '올바른 이메일 형식이 아닙니다.';
    return true;
  };
  const validatePassword = (value) => {
    if (!value) return '비밀번호 입력해주세요.';
    if (
      !/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
    )
      return '8글자 이상의 영문 소문자, 숫자, 특수기호만 허용됩니다.';
    return true;
  };
  const validateNickname = (value) => {
    if (!value) return '닉네임을 입력하세요.';
    if (!/^[A-za-z0-9가-힣]{2,}$/.test(value)) return '2글자 이상 적어주세요.';
    return true;
  };
  const validateGender = (value) => {
    if (!value) return '성별을 선택하세요.';
    return true;
  };
  const validateName = (value) => {
    if (!value) return '이름을 입력하세요.';
    if (!/^[A-za-z0-9가-힣]{3,}$/.test(value)) return '2글자 이상 적어주세요.';
    return true;
  };

  const fileInputRef = useRef(null);
  //   const handleButtonClick = () => {
  //     fileInputRef.current.click();
  //   };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
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

  const valEmail = async () => {
    const formData = {
      email: getValues('userId'),
    };

    await valEmailApi(formData)
      .then((res) => {
        console.log(formData);
        console.log(res, '이메일중복검사');
        if (res.status === 200) {
          alert('사용 가능한 아이디입니다');
          setEmailChecked(true);
        }
      })
      .catch((err) => {
        console.log('이메일중복검사 에러', err);
        alert('중복된 아이디입니다');
        setValue('userId', '');
      });
  };
  const valNickName = async () => {
    const formData = {
      nickname: getValues('nickname'),
    };
    await valNicknameApi(formData)
      .then((res) => {
        console.log(formData);
        console.log(res, '닉네임중복검사');
        if (res.status === 200) {
          alert('사용 가능한 닉네임입니다');
          setNicknameChecked(true);
        }
      })
      .catch((err) => {
        console.log('닉네임중복검사 에러', err);
        alert('중복된 닉네임입니다');
        setValue('nickname', '');
      });
  };
  const onSubmit = async (data) => {
    const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
    const region = 'kr-standard';
    const access_key = process.env.REACT_APP_ACCESS_KEY;
    const secret_key = process.env.REACT_APP_SECRET_KEY;
    const S3 = new AWS.S3({
      endpoint: endpoint,
      region: region,
      credentials: {
        accessKeyId: access_key,
        secretAccessKey: secret_key,
      },
    });

    try {
      const res = await S3.putObject({
        Bucket: 'jini',
        Key: selectedFile.name,
        ACL: 'public-read',
        Body: selectedFile,
      }).promise();
      console.log('s3 업로드 어쩌고', res);
      const encodedKey = encodeURIComponent(selectedFile.name);
      const signUpData = {
        email: data.userId,
        password: data.password,
        nickname: data.nickname,
        gender: data.gender,
        name: data.username,
        profileImg: `https://kr.object.ncloudstorage.com/jini/${encodedKey}`,
      };

      if (emailChecked && nicknameChecked) {
        signUpApi(signUpData)
          .then((response) => {
            if (response.status === 200) {
              console.log('200', response);
              navigate('/');
            }
          })
          .catch((error) => console.log('err data', error));
      } else if (!emailChecked) {
        alert('이메일 중복체크를 해 주세요');
        return;
      } else if (!nicknameChecked) {
        alert('닉네임 중복체크를 해 주세요');
      }
    } catch (err) {
      console.error('업로드 중 오류 발생', err);
    }
  };
  const kakaoLogin = () => {
    const response = kakaoLoginApi()
      .then((res) => console.log('카카오', res))
      .catch((err) => console.log('카카오 에러', err));
    console.log(response, '카카오');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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
                이미지 설정
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </label>
              {/* <button
                className={styles.changeProfile}
                onClick={handleButtonClick}
              >
                change
              </button> */}
            </div>
            {/* 이름 */}
            <div>
              <input
                className={styles.signUp_input}
                id="username"
                name="username"
                type="text"
                placeholder="이름"
                // input의 기본 config를 작성
                {...register('username', {
                  required: {
                    value: true,
                    message: '이름은 필수 입력입니다.',
                  },
                  validate: validateName,
                })}
              />

              {errors.username && (
                <div className={styles.alert} role="alert">
                  {errors?.username?.message}
                </div>
              )}
            </div>
            {/* 아이디 */}
            <div>
              <input
                onChange={(e) => setValue(e.target.name, e.target.value)}
                className={styles.signUp_input}
                id="userId"
                type="text"
                name="userId"
                placeholder="onandoff@naver.com"
                // autoComplete="userId"
                // input의 기본 config를 작성
                {...register('userId', {
                  required: '아이디는 필수 입력입니다.',

                  validate: validateId,
                })}
              />
              {errors.userId && (
                <div className={styles.alert} role="alert">
                  {errors?.userId?.message}
                </div>
              )}
            </div>
            {/* <button onClick={handleSubmit(onSubmit)}>아이디 중복 확인</button> */}
            {/* 비밀번호 */}
            <div>
              <input
                className={styles.signUp_input}
                id="password"
                type="password"
                name="password"
                placeholder="비밀번호"
                autoComplete="new-password"
                {...register('password', {
                  required: '비밀번호는 필수 입력입니다.',

                  validate: validatePassword,
                })}
              />
              {errors.password && (
                <div className={styles.alert} role="alert">
                  {errors?.password?.message}
                </div>
              )}
            </div>
            {/* 비밀번호 확인 */}
            <div>
              <input
                className={styles.signUp_input}
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="비밀번호 재입력"
                autoComplete="new-password"
                {...register('confirmPassword', {
                  required: '비밀번호 확인은 필수입니다.',

                  validate: (value) =>
                    value === password || '비밀번호가 일치하지 않습니다.',
                })}
              />
              {errors.confirmPassword && (
                <div className={styles.alert} role="alert">
                  {errors?.confirmPassword?.message}
                </div>
              )}
            </div>
            {/* 닉네임 */}

            <div>
              <input
                onChange={(e) => setValue(e.target.name, e.target.value)}
                className={styles.signUp_input}
                id="nickname"
                name="nickname"
                type="text"
                placeholder="닉네임"
                {...register('nickname', {
                  required: '닉네임을 입력해주세요',
                  validate: validateNickname,
                })}
              />
              {errors.nickname && (
                <div className={styles.alert} role="alert">
                  {errors?.nickname?.message}
                </div>
              )}
            </div>

            {/* 성별 */}
            <div>
              <select
                className={styles.signUp_input}
                name="성별"
                {...register('gender', {
                  required: '성별을 선택해주세요.',
                  validate: validateGender,
                })}
              >
                <option value="" disabled selected>
                  성별
                </option>
                <option value={'male'}>남</option>
                <option value={'female'}>여</option>
              </select>
              {errors.gender && (
                <div className={styles.alert} role="alert">
                  {errors?.gender?.message}
                </div>
              )}
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
              회원가입
            </button>
          </div>
          {/* <Kakao /> */}
        </form>
        <button onClick={valNickName}>닉네임 중복 확인</button>
        <button onClick={valEmail}>아이디 중복 확인</button>
        <Kakao />
      </div>
    </div>
  );
}
export default SignUpPage;

import axios from 'axios';
import { useEffect } from 'react';
import { REDIRECT_URI, REST_API_KEY } from './KakaoLoginData';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { kakaoLoginApi } from '../../apis/api';
import { useNavigate } from 'react-router-dom';

function KakaoCallback() {
  // const code = params.get('code');
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const grantType = 'authorization_code';
  const api_key = REST_API_KEY;
  const redirect_uri = REDIRECT_URI;
  const { reset } = useForm();
  const mutation = useMutation((code) => kakaoLoginApi(code), {
    onSuccess: (data) => {
      console.log(data, '로그인 성공');
      reset();
      queryClient.refetchQueries(['me']);
      navigate('/');
    },
    onError: (error) => {
      console.log('error', error);
    },
  });
  const confirmLogin = async () => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get('code');
    if (code) {
      mutation.mutate(code);
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);
  // axios
  //   .post(
  //     `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${api_key}&redirect_uri=${redirect_uri}&code=${code}`,
  //     {},
  //     {
  //       headers: {
  //         'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  //       },
  //     },
  //   )
  //   .then((res) => {
  //     console.log(res);
  //     const { access_token } = res.data;
  //     axios
  //       .post(
  //         `https://kapi.kakao.com/v2/user/me`,
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${access_token}`,
  //             'Content-type':
  //               'application/x-www-form-urlencoded;charset=utf-8',
  //           },
  //         },
  //       )
  //       .then((res) => {
  //         console.log('카카오 유저 정보', res);
  //       });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return <></>;
}
export default KakaoCallback;

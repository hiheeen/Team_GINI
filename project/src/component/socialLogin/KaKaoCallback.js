import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { kakaoLoginApi } from '../../apis/api';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import { loggedInState } from '../../recoil/loggedIn';
import { onOffState } from '../../recoil/onOff';

function KakaoCallback() {
  // const code = params.get('code');
  const queryClient = useQueryClient();
  const [cookies, setCookie] = useCookies(['access_token']);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInState);
  const [isOnOffState, setIsOnOffState] = useRecoilState(onOffState);

  const navigate = useNavigate();
  const grantType = 'authorization_code';
  const { reset } = useForm();
  const mutation = useMutation((code) => kakaoLoginApi(code), {
    onSuccess: (data) => {
      // console.log(data, '로그인 성공');
      reset();
      queryClient.refetchQueries(['kakao']);
      setCookie('access_token', data.data.token.access_token);
      setCookie('refresh_token', data.data.token.refresh_token);
      setIsLoggedIn(true);
      setIsOnOffState(true);
      navigate('/');
    },
    onError: (error) => {
      // console.log('error', error);
    },
  });
  const confirmLogin = async () => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get('code');
    // console.log('code', code);
    if (code) {
      mutation.mutate(code);
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);
  return <></>;
}
export default KakaoCallback;

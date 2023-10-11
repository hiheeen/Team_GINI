import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { naverLoginApi } from '../../apis/api';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import { loggedInState } from '../../recoil/loggedIn';
import { onOffState } from '../../recoil/onOff';

function NaverCallback() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { reset } = useForm();
  const [cookies, setCookie] = useCookies(['access_token']);
  const [isOnOffState, setIsOnOffState] = useRecoilState(onOffState);

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInState);
  const mutation = useMutation((code) => naverLoginApi(code), {
    onSuccess: (data) => {
      // console.log(data, '로그인 성공');
      reset();
      queryClient.refetchQueries(['me']);
      setCookie('access_token', data.data.token.access_token);
      setCookie('refresh_token', data.data.token.refresh_token);

      setIsOnOffState(true);
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 1000);
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
  return <div></div>;
}
export default NaverCallback;

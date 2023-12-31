import { useMutation, useQueryClient } from '@tanstack/react-query';
import { googleLoginApi } from '../../apis/api';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import { loggedInState } from '../../recoil/loggedIn';
import { onOffState } from '../../recoil/onOff';

function GoogleCallback() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
  const { reset } = useForm();
  const [isOnOffState, setIsOnOffState] = useRecoilState(onOffState);
  useEffect(() => {
    confirmLogin();
  }, []);
  const mutation = useMutation((code) => googleLoginApi(code), {
    onSuccess: (data) => {
      reset();
      queryClient.refetchQueries(['google']);
      setCookie('access_token', data.data.token.access);
      setCookie('refresh_token', data.data.token.refresh);
      setIsOnOffState(true);
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 1000);
    },
  });
  const confirmLogin = async () => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get('code');
    if (code) {
      mutation.mutate(code);
    }
  };
  return <div></div>;
}
export default GoogleCallback;

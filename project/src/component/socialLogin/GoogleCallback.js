import { useMutation, useQueryClient } from '@tanstack/react-query';
import { googleLoginApi } from '../../apis/api';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function GoogleCallback() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { reset } = useForm();
  const mutation = useMutation((code) => googleLoginApi(code), {
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
  return <div></div>;
}
export default GoogleCallback;

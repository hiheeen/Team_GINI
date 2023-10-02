import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { naverLoginApi } from '../../apis/api';

function NaverCallback() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { reset } = useForm();
  const mutation = useMutation((code) => naverLoginApi(code), {
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
export default NaverCallback;

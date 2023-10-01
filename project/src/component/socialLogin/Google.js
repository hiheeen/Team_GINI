import { GoogleLogin } from '@react-oauth/google';
function Google() {
  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => console.log('로그인 실패')}
        width={'300px'}
        useOneTap
      ></GoogleLogin>
    </>
  );
}
export default Google;

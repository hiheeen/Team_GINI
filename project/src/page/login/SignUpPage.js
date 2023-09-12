import { Form, useNavigate } from 'react-router-dom';
import styles from './SignUpPage.module.css';
import { useForm } from 'react-hook-form';

function SignUpPage() {
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    navigate('/', { replace: true });
  };
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
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.login_form}>
            {/* 이름 */}
            <div>
              <input
                className={styles.login_input}
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
                className={styles.login_input}
                id="userId"
                type="text"
                name="userId"
                placeholder="onandoff@naver.com"
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
            {/* 비밀번호 */}
            <div>
              <input
                className={styles.login_input}
                id="password"
                type="password"
                name="password"
                placeholder="비밀번호"
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
                className={styles.login_input}
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="비밀번호 재입력"
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
                className={styles.login_input}
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
                className={styles.login_input}
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
              marginTop: 10,
            }}
          >
            <button
              type="submit"
              style={{
                padding: '5px',
                border: '1px solid lightgrey',
                borderRadius: 10,
              }}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignUpPage;

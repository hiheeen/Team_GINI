import styles from './MyPage.module.css';
import { useForm } from 'react-hook-form';
function MyPage() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = () => {};
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.login_form}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* <div>
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
            </div> */}
            {/* <label style={{ fontSize: 12 }} className={styles.changeProfile}>
              이미지 설정
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </label> */}
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
                // validate: validateName,
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
              disabled
              className={styles.signUp_input}
              type="text"
              name="userId"
              placeholder="onandoff@naver.com"
              autoComplete="userId"
            />
          </div>
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

                // validate: validatePassword,
              })}
            />
            {errors.password && (
              <div className={styles.alert} role="alert">
                {errors?.password?.message}
              </div>
            )}
          </div>
          {/* 비밀번호 확인 */}
          {/* <div>
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
          </div> */}
          {/* 닉네임 */}
          <div>
            <input
              className={styles.signUp_input}
              id="nickname"
              name="nickname"
              type="text"
              placeholder="닉네임"
              {...register('nickname', {
                required: '닉네임을 입력해주세요',
                // validate: validateNickname,
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
                // validate: validateGender,
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
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
}
export default MyPage;

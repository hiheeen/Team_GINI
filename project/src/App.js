import logo from './logo.svg';
import './App.css';
import routes from './routes';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import MainPage from './page/main/MainPage';
import UpLoadPage from './page/upload/UpLoadPage';
import Header from './component/Header';
import Category from './component/Category';
import Profile from './component/Profile';
import { useEffect, useState } from 'react';
import LoginPage from './page/login/LoginPage';
import SignUpPage from './page/login/SignUpPage';
import {
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil';
import { loggedInState } from './recoil/loggedIn';
import MyPage from './page/login/MyPage';
import CategoryPage from './page/category/CategoryPage';
import DetailPage from './page/detail/DetailPage';
import { useCookies } from 'react-cookie';
import PwSearchPage from './page/login/PwSearchPage';
import NewPasswordPage from './page/login/NewPasswordPage';
import EditPage from './page/edit/EditPage';
import EditSecretPage from './page/edit/EditSecretPage';
import SecretDetailPage from './page/detail/SecretDetailPage';
import KakaoCallback from './component/socialLogin/KaKaoCallback';
import GoogleCallback from './component/socialLogin/GoogleCallback';
import Footer from './component/footer/Footer';
import NaverCallback from './component/socialLogin/NaverCallback';
import MobileProfile from './component/MobileProfile';
import { getFeedApi, getInfoApi, getSecretFeedApi, instance } from './apis/api';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies([
    'access_token',
    'refresh_token',
  ]);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 820);
  useEffect(() => {
    if (!cookies.access_token) {
      setIsLoggedIn(false);
    }
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInState);
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const handleShowButtons = () => {
      window.scrollY > 200 ? setShowButton(true) : setShowButton(false);
    };

    window.addEventListener('scroll', handleShowButtons);
    return () => {
      window.removeEventListener('scroll', handleShowButtons);
    };
  }, []);
  const onScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const { data: feedData, isLoading: dataIsLoading } = useQuery(
    ['feedData'],
    () => getFeedApi(cookies.access_token),
  );
  const { infoData, isLoading } = useQuery(
    ['getInfo'],
    () => getInfoApi(cookies.access_token),
    {
      staleTime: 300000, // 5분 동안 데이터를 "느껴지게" 함
    },
  );
  const { data: secretData, isLoading: secretIsLoading } = useQuery(
    ['secretData'],
    () => getSecretFeedApi(cookies.access_token),
  );
  if (dataIsLoading) {
    return <div>data is loading...</div>;
  }
  if (isLoading) {
    return <div>is Loading...</div>;
  }

  if (secretIsLoading) {
    return <div>is loading...</div>;
  }

  let refresh = false;
  instance.interceptors.response.use(
    (resp) => resp,
    async (error) => {
      if (error.response.status === 401 && !refresh) {
        // console.log(error, '에러 확인');
        // 401 상태 코드에 대한 처리
        refresh = true;
        try {
          const response = await instance.post(
            'users/Refresh/',
            {
              refresh: cookies.refresh_token,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            },
          );
          if (response.status === 200) {
            // console.log('200번', response);
            removeCookie('access_token');
            removeCookie('refresh_token');
            setCookie('access_token', response.data.access);
            setCookie('refresh_token', response.data.refresh);
            instance.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${response.data.access}`;
            window.location.reload();
            return instance.request(error.config);
          }
        } catch (refreshError) {
          throw refreshError;
        }
      }
      refresh = false;
      return Promise.reject(error);
    },
  );

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div
          className="main"
          style={{
            position: 'relative',
            zIndex: 1,
            paddingTop: !isLargeScreen && '100px',
          }}
        >
          {isLargeScreen ? (
            <>
              {isLoggedIn && <Category id="category_show" />}
              <Routes>
                <Route
                  path={routes.main}
                  element={
                    isLoggedIn ? (
                      <>
                        <MainPage />
                        {showButton && (
                          <button className="scroll" onClick={onScrollToTop}>
                            Top
                          </button>
                        )}
                      </>
                    ) : (
                      <LoginPage />
                    )
                  }
                />
                <Route path={routes.upload} element={<UpLoadPage />} />
                <Route path={routes.login} element={<LoginPage />} />
                <Route path={routes.signUp} element={<SignUpPage />} />
                <Route
                  path={routes.myPage}
                  element={<MyPage infoData={infoData} />}
                />
                <Route
                  path={routes.category}
                  element={
                    <CategoryPage
                      infoData={infoData}
                      feedData={feedData}
                      secretData={secretData}
                    />
                  }
                />
                <Route
                  path={routes.detail}
                  element={<DetailPage infoData={infoData} />}
                />
                <Route
                  path={routes.secretDetail}
                  element={<SecretDetailPage infoData={infoData} />}
                />
                <Route
                  path={routes.passwordSearch}
                  element={<PwSearchPage />}
                />
                <Route
                  path={routes.newPassword}
                  element={<NewPasswordPage />}
                />
                <Route path={routes.edit} element={<EditPage />} />
                <Route path={routes.editSecret} element={<EditSecretPage />} />
                <Route path={routes.kakao} element={<KakaoCallback />} />
                <Route path={routes.google} element={<GoogleCallback />} />
                <Route path={routes.naver} element={<NaverCallback />} />
              </Routes>
              {isLoggedIn && (
                <Profile
                  feedData={feedData}
                  infoData={infoData}
                  secretData={secretData}
                />
              )}
            </>
          ) : (
            <>
              <Routes>
                <Route
                  path={routes.main}
                  element={
                    isLoggedIn ? (
                      <div className="mobile_container">
                        <MobileProfile
                          infoData={infoData}
                          secretData={secretData}
                          feedData={feedData}
                        />
                        <MainPage />
                        {showButton && (
                          <button className="scroll" onClick={onScrollToTop}>
                            Top
                          </button>
                        )}
                      </div>
                    ) : (
                      <LoginPage />
                    )
                  }
                />
                <Route path={routes.upload} element={<UpLoadPage />} />
                <Route path={routes.login} element={<LoginPage />} />
                <Route path={routes.signUp} element={<SignUpPage />} />
                <Route
                  path={routes.myPage}
                  element={<MyPage infoData={infoData} />}
                />
                <Route
                  path={routes.category}
                  element={
                    <CategoryPage
                      infoData={infoData}
                      feedData={feedData}
                      secretData={secretData}
                    />
                  }
                />
                <Route
                  path={routes.detail}
                  element={<DetailPage infoData={infoData} />}
                />
                <Route
                  path={routes.secretDetail}
                  element={<SecretDetailPage infoData={infoData} />}
                />
                <Route
                  path={routes.passwordSearch}
                  element={<PwSearchPage />}
                />
                <Route
                  path={routes.newPassword}
                  element={<NewPasswordPage />}
                />
                <Route path={routes.edit} element={<EditPage />} />
                <Route path={routes.editSecret} element={<EditSecretPage />} />
                <Route path={routes.kakao} element={<KakaoCallback />} />
                <Route path={routes.google} element={<GoogleCallback />} />
                <Route path={routes.naver} element={<NaverCallback />} />
              </Routes>
            </>
          )}
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

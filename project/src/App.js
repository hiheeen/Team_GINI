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
import { instance } from './apis/api';
import axios from 'axios';
// import axios from 'axios';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 820);
  useEffect(() => {
    if (!cookies.access_token) {
      setIsLoggedIn(false);
    }
  }, []);
  useEffect(() => {
    console.log(cookies.access_token, '토큰 바뀌는지 확인');
  }, [cookies.access_token]);
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
  const privateApi = axios.create({
    baseURL: 'http://www.jinii.shop/api/v1/',
    headers: {
      Authorization: `Bearer ${cookies.access_token}`,
    },
  });
  const getFeedApi = async () => {
    const response = await privateApi.get('feeds/', {
      withCredentials: true,
    });
    return response;
  };
  // instance.interceptors.response.use(
  //   (res) => console.log(res, 'interceptors response'),
  //   async (error) => {
  //     if (error.response.status === 401 || error.response.status === 400) {
  //       console.log('itititti');
  //       const response = await instance.post(
  //         'token/refresh/',
  //         { refresh: cookies.refresh_token },

  //         // { withCredentials: true }
  //       );
  //       if (response.data.status === 200) {
  //         instance.defaults.headers.common['Authorization'] = `Bearer
  //      ${response.data['access']}`;
  //         setCookie('access_token', response.data.token.access_token);
  //         setCookie('refresh_token', response.data.token.refresh_token);
  //         setIsLoggedIn(true);
  //       }
  //     }

  //     return error;
  //   },
  // );

  // axios.interceptors.response.use(
  //   (resp) => resp,
  //   async (error) => {
  //     if (error.response.status === 401 && !refresh) {
  //       refresh = true;
  //       const response = await instance
  //         .post(
  //           'users/Refresh/',
  //           {
  //             refresh: cookies.refresh_token,
  //           },
  //           { withCredentials: true },
  //         )
  //         .then((res) => {
  //           console.log('리프레시데이터', res);
  //           if (res.status === 200) {
  //             setCookie('access_token', res.data.access);
  //             setCookie('refresh_token', res.data.refresh);
  //             axios.defaults.headers.common['Authorization'] = `Bearer
  //             ${cookies.access_token}`;
  //             return axios(error.config);
  //           }
  //         })
  //         .catch((err) => console.log('리프레시에러', err));
  //       //   if (response.status === 200) {
  //       //     console.log(response, '리프레시');
  //       //     axios.defaults.headers.common['Authorization'] = `Bearer
  //       //  ${response.data['access']}`;
  //       //     setCookie('access_token', response.data.access);
  //       //     setCookie('refresh_token', response.data.refresh); // 실제로 뭐 오는지 알아야 함
  //       //     return axios(error.config);
  //     }
  //     refresh = false;
  //     return error;
  //   },
  // );

  let refresh = false;
  instance.interceptors.response.use(
    (resp) => resp,
    async (error) => {
      if (error.response.status === 401 && !refresh) {
        // 401 상태 코드에 대한 처리
        refresh = true;
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
          console.log('200번', response);
          setCookie('access_token', response.data.access);
          setCookie('refresh_token', response.data.refresh);
          instance.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${response.data.access}`;

          await instance.get('feeds/', {
            headers: {
              Authorization: `Bearer ${response.data.access}`,
            },
            withCredentials: true,
          });
        }
      }
      refresh = false;
      return error;
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
                <Route path={routes.myPage} element={<MyPage />} />
                <Route path={routes.category} element={<CategoryPage />} />
                <Route path={routes.detail} element={<DetailPage />} />
                <Route
                  path={routes.secretDetail}
                  element={<SecretDetailPage />}
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
              {isLoggedIn && <Profile />}
            </>
          ) : (
            <>
              {/* {showButton && (
                <button className="scroll" onClick={onScrollToTop}>
                  Top
                </button>
              )} */}
              {/* {isLoggedIn && <MobileProfile />} */}
              <Routes>
                <Route
                  path={routes.main}
                  element={
                    isLoggedIn ? (
                      <div className="mobile_container">
                        <MobileProfile />
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
                <Route path={routes.myPage} element={<MyPage />} />
                <Route path={routes.category} element={<CategoryPage />} />
                <Route path={routes.detail} element={<DetailPage />} />
                <Route
                  path={routes.secretDetail}
                  element={<SecretDetailPage />}
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

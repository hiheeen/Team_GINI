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
function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cookies] = useCookies(['access_token']);
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

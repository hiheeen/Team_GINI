import logo from './logo.svg';
import './App.css';
import routes from './routes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cookies] = useCookies(['access_token']);
  useEffect(() => {
    if (!cookies.access_token) {
      setIsLoggedIn(false);
    }
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInState);
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="main">
          {isLoggedIn && <Category />}
          <Routes>
            <Route
              path={routes.main}
              element={isLoggedIn ? <MainPage /> : <LoginPage />}
            />
            <Route path={routes.upload} element={<UpLoadPage />} />
            <Route path={routes.login} element={<LoginPage />} />
            <Route path={routes.signUp} element={<SignUpPage />} />
            <Route path={routes.myPage} element={<MyPage />} />
            <Route path={routes.category} element={<CategoryPage />} />
            <Route path={routes.detail} element={<DetailPage />} />
            <Route path={routes.passwordSearch} element={<PwSearchPage />} />
            <Route path={routes.newPassword} element={<NewPasswordPage />} />
          </Routes>
          {isLoggedIn && <Profile />}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

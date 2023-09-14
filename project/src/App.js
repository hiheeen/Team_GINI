import logo from './logo.svg';
import './App.css';
import routes from './routes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './page/main/MainPage';
import UpLoadPage from './page/upload/UpLoadPage';
import Header from './component/Header';
import Category from './component/Category';
import Profile from './component/Profile';
import { useState } from 'react';
import LoginPage from './page/login/LoginPage';
import SignUpPage from './page/login/SignUpPage';
import {
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil';
import { loggedInState } from './recoil/loggedIn';
function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
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
          </Routes>
          {isLoggedIn && <Profile />}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
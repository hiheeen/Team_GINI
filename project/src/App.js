import logo from './logo.svg';
import './App.css';
import routes from './routes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './page/main/MainPage';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={routes.main} element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

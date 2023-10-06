import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './GlobalStyle';
import { RecoilRoot } from 'recoil';
import RecoilTest from './RecoilTest';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <GlobalStyle />
    <RecoilRoot>
      <GoogleOAuthProvider clientId="852732613951-1go534rideb7k8c2opjbrivkt41f8r5h.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
      {/* <RecoilTest /> */}
    </RecoilRoot>
  </QueryClientProvider>,
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

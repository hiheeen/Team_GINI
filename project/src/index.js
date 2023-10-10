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
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <GlobalStyle />
    <RecoilRoot>
      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
    </RecoilRoot>
  </QueryClientProvider>,
  // </React.StrictMode>,
);

reportWebVitals();

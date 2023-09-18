import { accordionActionsClasses } from '@mui/material';
import { assignNestedKeys } from '@mui/system/cssVars/cssVarsParser';
import axios from 'axios';

const instance = axios.create({ baseURL: 'http://27.96.134.191/api/v1/' });

// instance.interceptors.request.use((config) => {
//   const [cookies] = useCookies(['access_token']);
//   config.headers.Authorization = `Bearer ${cookies.access_token}`;
//   return config;
// });
export const signUpApi = async (signUpData) => {
  const response = await instance.post('users/', signUpData);
  return response;
};
export const loginApi = async (loginData) => {
  const response = await instance.post('users/login/', loginData);
  return response;
};
export const logOutApi = async (accessToken) => {
  try {
    const response = await instance.delete('users/logout/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getFeedApi = async (accessToken) => {
  const response = await instance.get('feeds/', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return response;
};
export const getSecretFeedApi = async (accessToken) => {
  const response = await instance.get('feeds/mysecret', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return response;
};
export const postFeedApi = async (accessToken, formData) => {
  const response = await instance.post('feeds/', formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return response;
};
export const deleteSecretFeedApi = async (itemId, accessToken) => {
  const response = await instance.delete(`feeds/mysecret/${itemId}/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return response;
};
export const deleteFeedApi = async (itemId, accessToken) => {
  const response = await instance.delete(`feeds/${itemId}/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return response;
};
export const feedLikeApi = async (feedId, accessToken) => {
  const response = await instance.post(`feeds/${feedId}/likes/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return response;
};
export const getInfoApi = async (accessToken) => {
  const response = await instance.get('users/my_info/', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return response;
};
export const updateInfoApi = async (accessToken, formData) => {
  const response = await instance.put('users/my_info/', formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return response;
};

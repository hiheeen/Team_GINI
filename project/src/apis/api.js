import { accordionActionsClasses } from '@mui/material';
import { assignNestedKeys } from '@mui/system/cssVars/cssVarsParser';
import axios from 'axios';

const instance = axios.create({ baseURL: 'http://www.jinii.shop/api/v1/' });

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
export const EditFeedApi = async (accessToken, formData, feedId) => {
  const response = await instance.put(`feeds/${feedId}/`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
};
export const editSecretFeedApi = async (accessToken, formData, feedId) => {
  const response = await instance.put(`feeds/mysecret/${feedId}/`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
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
  const response = await instance.put(`feeds/${feedId}/likes/`, {
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
export const postReviewApi = async (accessToken, feedId, formData) => {
  const response = await instance.post(`feeds/${feedId}/reviews/`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return response;
};
export const getDetailApi = async (accessToken, feedId) => {
  const response = await instance.get(`feeds/${feedId}/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return response;
};
export const getSecretDetailApi = async (accessToken, feedId) => {
  const response = await instance.get(`feeds/mysecret/${feedId}/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return response;
};
export const reviewDeleteApi = async (accessToken, feedId, reviewId) => {
  const response = await instance.delete(
    `feeds/${feedId}/reviews/${reviewId}/`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    },
  );
  return response;
};
export const valEmailApi = async (formData) => {
  const response = await instance.post('users/val_email/', formData);
  return response;
};
export const valNicknameApi = async (formData) => {
  const response = await instance.post('users/val_nickname/', formData);
  return response;
};
export const kakaoLoginApi = () => {
  const response = instance.get('users/auth/kakao/login/');
  return response;
};
export const postReplyApi = async (feedId, reviewId, formData, accessToken) => {
  const response = await instance.post(
    `feeds/${feedId}/reviews/${reviewId}/post_reply/`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    },
  );
  return response;
};
export const getReviewDetailApi = async (feedId, accessToken) => {
  const response = await instance.get(`feeds/${feedId}/reviews/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return response;
};
export const deleteReplyApi = async (replyId, accessToken) => {
  const response = await instance.delete(`updel_reply/${replyId}/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
  return response;
};

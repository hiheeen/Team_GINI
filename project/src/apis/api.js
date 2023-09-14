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

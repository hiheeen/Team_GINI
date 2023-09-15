import axios from 'axios';
import { useCookies } from 'react-cookie';

const instance = axios.create({ baseURL: 'http://27.96.134.191/api/v1/' });

instance.interceptors.request.use((config) => {
  const [cookies] = useCookies(['access_token']);
  config.headers.Authorization = `Bearer ${cookies.access_token}`;
  return config;
});
// export const getFeedApi = async (accessToken) => {
//   const response = await instance.get('feeds/', {
//     //   headers: {
//     //     Authorization: `Bearer ${accessToken}`,
//     //   },
//     withCredentials: true,
//   });
//   return response;
// };

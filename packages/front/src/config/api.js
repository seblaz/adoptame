import { create } from 'apisauce';
import { CamelcaseSerializer, SnakecaseSerializer } from 'cerealizr';

import { NON_SERIALIZABLE_URLS } from '~constants/urls';
import LocalStorageService from '~services/LocalStorageService';

const camelSerializer = new CamelcaseSerializer();
const snakeSerializer = new SnakecaseSerializer();

const notSerializableUrl = url => NON_SERIALIZABLE_URLS.includes(url);

export const createApiWithURL = baseURL =>
  create({
    baseURL,
    timeout: 15000
  });

const api = create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 15000
});

api.addResponseTransform(response => {
  if (response.status === 401) {
    console.log('unauth');
    LocalStorageService.removeSessionToken();
  }
  if (response.data && !notSerializableUrl(response.config.url)) {
    response.data = camelSerializer.serialize(response.data);
  }
});

export const setAuthHeader = token => api.setHeader('authorization', `Bearer ${token}`);
export default api;

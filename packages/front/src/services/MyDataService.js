import api from '~config/api';

export const getMyData = () => api.get('/me');
export const getUser = id => api.get(`/users/${id}`);
export const updateMyData = payload => api.put('/me', payload);

import api from '~config/api';

export const getMyData = () => api.get('/me');
export const updateMyData = payload => api.put('/me', payload);

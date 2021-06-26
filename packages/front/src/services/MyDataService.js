import api from '~config/api';

export const getMyData = () => api.get('/me');

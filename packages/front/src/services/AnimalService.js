import api from '~config/api';

export const createAnimal = payload => api.post('/animals', payload);

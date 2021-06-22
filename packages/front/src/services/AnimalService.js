import api from '~config/api';

export const createAnimal = payload => api.post('/animals', payload);
export const getAnimal = id => api.get(`/animals/${id}`);

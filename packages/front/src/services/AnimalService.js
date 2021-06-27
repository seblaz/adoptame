import api from '~config/api';

export const createAnimal = payload => api.post('/animals', payload);
export const getAnimal = id => api.get(`/animals/${id}`);
export const getAnimals = () => api.get('/animals');
export const postulateForAdoption = ({ id, description }) =>
  api.post('/postulations', { animalId: id, description });

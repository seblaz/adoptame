import api from '~config/api';

export const createAnimal = payload =>
  api.post('/animals', payload, {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  });
export const getAnimal = id => api.get(`/animals/${id}`);
export const getAnimals = onlyNotAdopted => api.get(`/animals?onlyNotAdopted=${onlyNotAdopted}`);
export const getMyAnimals = () => api.get('/me/animals');
export const postulateForAdoption = ({ id, description }) =>
  api.post('/postulations', { animalId: id, description });
export const getPostulationsForAnimal = id => api.get(`/postulations/${id}`);
export const getMyAnimalsAdopted = () => api.get('/me/adoptedAnimals');

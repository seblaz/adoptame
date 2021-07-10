import api from '~config/api';

export const createAnimal = payload =>
  api.post('/animals', payload, {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  });
export const getAnimal = id => api.get(`/animals/${id}`);
export const getAnimals = showNotAdopted => api.get(`/animals?onlyNotAdopted=${!showNotAdopted}`);
export const getMyAnimals = () => api.get('/me/animals');
export const postulateForAdoption = ({ id, description }) =>
  api.post('/postulations', { animalId: id, description });
export const getPostulationsForAnimal = id => api.get(`/postulations/${id}`);

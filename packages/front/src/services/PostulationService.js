import api from '~config/api';

export const acceptPostulation = id => api.patch(`/postulations/${id}`);

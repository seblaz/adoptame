import api from '~config/api';

export const editPostulation = payload =>
  api.patch(`/postulations/${payload.postulationId}?accept=${payload.accept}`);

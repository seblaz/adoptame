import { completeTypes, createTypes, withPostSuccess, withPostFailure } from 'redux-recompose';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';

import * as AnimalService from '~services/AnimalService';
import * as PostulationService from '~services/PostulationService';
import { ROUTES } from '~constants/routes';

import { TARGETS } from './constants';

export const actions = createTypes(
  completeTypes([
    'CREATE_ANIMAL',
    'GET_ANIMAL',
    'GET_ANIMALS',
    'GET_POSTULATIONS',
    'EDIT_POSTULATION',
    'GET_MY_ANIMALS',
    'GET_POSTULATIONS',
    'GET_MY_ANIMALS_ADOPTED',
    'CLEAR_POSTULATIONS',
    'DIAGNOSE_ANIMAL',
    'GET_DIAGNOSES'
  ]),
  '@@ANIMAL'
);

export const actionCreators = {
  createAnimal: payload => ({
    type: actions.CREATE_ANIMAL,
    payload,
    target: TARGETS.ANIMAL,
    service: AnimalService.createAnimal,
    injections: [
      withPostSuccess((dispatch, { data: { id } }) => {
        dispatch(push(`${ROUTES.ANIMALS}/${id}`));
      }),
      withPostFailure(() => {
        toast.error(
          'Ocurrió un error creando el animal. Procure que todos los datos sean correctos y vuelva a intentar'
        );
      })
    ]
  }),
  getAnimal: id => ({
    type: actions.GET_ANIMAL,
    target: TARGETS.ANIMAL,
    payload: id,
    service: AnimalService.getAnimal
  }),

  getAnimals: onlyNotAdopted => ({
    type: actions.GET_ANIMALS,
    target: TARGETS.ANIMALS,
    payload: onlyNotAdopted,
    service: AnimalService.getAnimals
  }),
  getMyAnimalsPosts: () => ({
    type: actions.GET_ANIMALS,
    target: TARGETS.MY_ANIMALS,
    service: AnimalService.getMyAnimals
  }),
  getMyAnimalsAdopted: () => ({
    type: actions.GET_MY_ANIMALS_ADOPTED,
    target: TARGETS.MY_ANIMALS_ADOPTED,
    service: AnimalService.getMyAnimalsAdopted
  }),
  postulateForAdoption: ({ id, description }) => ({
    type: actions.ADOPT_ANIMAL,
    target: TARGETS.ANIMAL,
    payload: { id, description },
    service: AnimalService.postulateForAdoption,
    injections: [
      withPostSuccess(dispatch => {
        dispatch(push(ROUTES.ANIMALS));
      }),
      withPostFailure(() => {
        toast.error('Ya existe una postulacion a este animal por parte de este usuario');
      })
    ]
  }),
  getPostulationsForAnimal: id => ({
    type: actions.GET_POSTULATIONS,
    target: TARGETS.POSTULATIONS,
    payload: id,
    service: AnimalService.getPostulationsForAnimal
  }),

  editPostulation: payload => ({
    type: actions.EDIT_POSTULATION,
    target: TARGETS.POSTULATIONS,
    payload,
    service: PostulationService.editPostulation,
    injections: [
      withPostSuccess(dispatch => {
        dispatch(push(ROUTES.HOME));
      }),
      withPostFailure(() => {
        toast.error('Ha ocurrido un error editando la postulación');
      })
    ]
  }),
  clearPostulations: () => ({
    type: actions.CLEAR_POSTULATIONS,
    target: TARGETS.POSTULATIONS,
    payload: []
  }),
  diagnoseAnimal: payload => ({
    type: actions.DIAGNOSE_ANIMAL,
    target: TARGETS.DIAGNOSIS,
    payload,
    service: AnimalService.diagnoseAnimal,
    injections: [
      withPostSuccess(dispatch => {
        dispatch(push(ROUTES.HOME));
      }),
      withPostFailure(() => {
        toast.error('Ha ocurrido un error agregando el diagnóstico');
      })
    ]
  }),
  getDiagnoses: payload => ({
    type: actions.GET_DIAGNOSES,
    target: TARGETS.DIAGNOSES,
    payload,
    service: AnimalService.getDiagnoses
  })
};

export default actionCreators;

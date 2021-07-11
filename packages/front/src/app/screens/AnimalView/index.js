import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import Button from '~app/components/Button';
import CustomModal from '~app/components/CustomModal';
import LoadingWrapper from '~app/components/LoadingWrapper';
import AnimalActions from '~redux/Animal/actions';
import ModalActions from '~redux/Modal/actions';
import { MODALS } from '~redux/Modal/constants';
import MyDataActions from '~redux/User/actions';
import { getAnimalImage } from '~utils/animal';
import { capitalize } from '~utils/string';

import AcceptApplicationButton from './components/Buttons/AcceptApplicationButton';
import RejectApplicationButton from './components/Buttons/RejectApplicationButton';
import InfoItem from './components/InfoItem';
import { INFO_FIELDS } from './constants';
import styles from './styles.module.scss';

// eslint-disable-next-line complexity
const AnimalView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { animal, animalLoading } = useSelector(state => state.animals);
  const { me, meLoading } = useSelector(state => state.user);
  const { postulations, postulationsLoading } = useSelector(state => state.animals);
  const { diagnosis, diagnosisLoading } = useSelector(state => state.animals);

  const [description, setDescription] = useState('');
  const [diagnosisText, setDiagnosis] = useState('');

  const handleDiagnosisChange = e => setDiagnosis(e.target.value);
  const submitDiagnosis = () => dispatch(AnimalActions.diagnoseAnimal({ id, diagnosis: diagnosisText }));

  const modalOpenPostulate = useSelector(state => state.modal[MODALS.POSTULATE_MODAL]);
  const openModalPostulate = () => dispatch(ModalActions.openModal(MODALS.POSTULATE_MODAL));
  const closeModalPostulate = useCallback(
    () => dispatch(ModalActions.closeModal(MODALS.POSTULATE_MODAL)),
    [dispatch]
  );

  const modalOpenPostulations = useSelector(state => state.modal[MODALS.POSTULATIONS_MODAL]);
  const openModalSeePostulations = () => dispatch(ModalActions.openModal(MODALS.POSTULATIONS_MODAL));
  const closeModalSeePostulations = useCallback(
    () => dispatch(ModalActions.closeModal(MODALS.POSTULATIONS_MODAL)),
    [dispatch]
  );

  const diagnosisModalOpen = useSelector(state => state.modal[MODALS.DIAGNOSIS]);
  const openDiagnosisModal = () => dispatch(ModalActions.openModal(MODALS.DIAGNOSIS));
  const closeDiagnosisModal = useCallback(
    () => dispatch(ModalActions.closeModal(MODALS.DIAGNOSIS)),
    [dispatch]
  );

  const handleDescriptionChange = e => setDescription(e.target.value);

  const submitApplication = () => dispatch(AnimalActions.postulateForAdoption({ id, description }));

  const handleEditPostulation = (postulationId, accept) => {
    const payload = {
      postulationId,
      accept
    };
    dispatch(AnimalActions.editPostulation(payload));
  };

  const cleanup = useCallback(() => {
    closeModalPostulate();
    closeDiagnosisModal();
    closeModalSeePostulations();
    dispatch(AnimalActions.clearPostulations());
  }, [closeModalSeePostulations, closeModalPostulate, closeDiagnosisModal, dispatch]);

  useEffect(() => {
    dispatch(AnimalActions.getAnimal(id));
    dispatch(AnimalActions.getPostulationsForAnimal(id));
    dispatch(MyDataActions.getMyData());
    dispatch(AnimalActions.getDiagnoses(id));
    return () => cleanup();
  }, [dispatch, id, cleanup]);

  const lastDiagnosis = diagnosis?.length ? diagnosis[diagnosis.length - 1] : null;
  return (
    <LoadingWrapper loading={animalLoading || meLoading || postulationsLoading || diagnosisLoading}>
      {animal && me && (
        <>
          <div className={`column full-width full-height ${styles.animalViewContainer}`}>
            <h1 className="title bold m-bottom-4">Adoptar Mascota</h1>
            <div className={`column m-bottom-4 ${styles.animalInfo}`}>
              <h2 className={`subtitle bold undeline italic m-bottom-6 ${styles.animalName}`}>
                {`${animal.nombre} ${animal.adopted ? '(Adoptado)' : ''}`}
              </h2>
              <div className={`row space-between full-height ${styles.rowContainer}`}>
                <div className={`column half-width ${styles.infoContainer}`}>
                  <h3 className={`large-text bold ${styles.animalInfoTitle}`}>Datos del animal</h3>
                  <div className={`column full-width ${styles.animalData}`}>
                    {INFO_FIELDS.map(({ label, key }) => (
                      <InfoItem key={label} value={animal[key]} label={label} className={styles.infoItem} />
                    ))}
                  </div>
                  {animal?.notas && (
                    <div className="column full-width m-bottom-2">
                      <span className="large-text bold">Notas adicionales:</span>
                      <span className="text">{animal.notas}</span>
                    </div>
                  )}
                  {lastDiagnosis && (
                    <div className={`column full-width ${styles.diagnosis}`} key={lastDiagnosis.id}>
                      <span className="large-text bold">Último diagnóstico:</span>
                      <span className="text">{lastDiagnosis.data}</span>
                    </div>
                  )}
                </div>
                <img src={getAnimalImage(animal.imagePath)} className={`half-width ${styles.photo}`} />
              </div>
            </div>
            {animal?.adopted && me?.id === animal?.adopter ? (
              <Button
                label="Subir diagnóstico del veterinario"
                onClick={openDiagnosisModal}
                type="button"
                className={styles.button}
              />
            ) : me.id === animal.userId ? (
              !!postulations.length && (
                <Button
                  type="button"
                  className={`row center middle m-bottom-6 ${styles.button}`}
                  label="Ver Postulaciones"
                  onClick={openModalSeePostulations}
                />
              )
            ) : (
              <Button
                label="Postularse como adoptante"
                onClick={openModalPostulate}
                type="button"
                className={styles.button}
              />
            )}
            <CustomModal
              className={styles.postulationsModalContainer}
              modal={MODALS.POSTULATIONS_MODAL}
              onClose={closeModalSeePostulations}
              isOpen={modalOpenPostulations}
              hideCloseButton>
              <div className="column center middle">
                {postulations.map(postulation => (
                  <div
                    key={postulation.id}
                    className={`row full-width middle space-between ${styles.postulation}`}>
                    <div className="column full-width">
                      <span className="large-text m-bottom-4">
                        {capitalize(postulation.description || '')}
                      </span>
                      <div className="row middle full-width">
                        <span className="text m-right-2">{`${postulation.user.email} - `}</span>
                        <a className={`text ${styles.emailLink}`} href={`/users/${postulation.user.id}`}>
                          Ver perfil
                        </a>
                      </div>
                    </div>
                    {!animal.adopted && (
                      <AcceptApplicationButton onClick={() => handleEditPostulation(postulation.id, true)} />
                    )}
                    {postulation?.accepted && (
                      <RejectApplicationButton onClick={() => handleEditPostulation(postulation.id, false)} />
                    )}
                  </div>
                ))}
              </div>
            </CustomModal>
          </div>
          <CustomModal
            className={styles.modalContainer}
            modal={MODALS.POSTULATE_MODAL}
            onClose={closeModalPostulate}
            isOpen={modalOpenPostulate}
            hideCloseButton>
            <div className="column center middle">
              <p className="row center large-text m-bottom-6">
                Ingrese una breve descripción suya para proceder con la adopción
              </p>
              <textarea
                maxLength={400}
                className={`small-text ${styles.textArea}`}
                placeholder="Por favor describí cómo sería la vida hogareña del animal y cómo va a poder adaptarse..."
                value={description}
                onChange={handleDescriptionChange}
              />
              <Button
                disabled={description.length < 10}
                label="Confirmar"
                onClick={submitApplication}
                type="button"
                className={`full-width ${styles.button}`}
              />
            </div>
          </CustomModal>
          <CustomModal
            className={styles.modalContainer}
            modal={MODALS.DIAGNOSIS}
            onClose={closeDiagnosisModal}
            isOpen={diagnosisModalOpen}
            hideCloseButton>
            <div className="column center middle">
              <p className="row center large-text m-bottom-6">Ingrese el diagnóstico del veterinario</p>
              <textarea
                maxLength={400}
                className={`small-text ${styles.textArea}`}
                placeholder="Por favor describí el último diagnóstico del veterinario..."
                value={diagnosisText}
                onChange={handleDiagnosisChange}
              />
              <Button
                disabled={diagnosisText.length < 10}
                label="Confirmar"
                onClick={submitDiagnosis}
                type="button"
                className={`full-width ${styles.button}`}
              />
            </div>
          </CustomModal>
        </>
      )}
    </LoadingWrapper>
  );
};

export default AnimalView;

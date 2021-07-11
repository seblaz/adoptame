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

import AcceptApplicationButton from './components/Buttons/AcceptApplicationButton';
import RejectApplicationButton from './components/Buttons/RejectApplicationButton';
import InfoItem from './components/InfoItem';
import { INFO_FIELDS } from './constants';
import styles from './styles.module.scss';

const AnimalView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { animal, animalLoading } = useSelector(state => state.animals);
  const { me, meLoading } = useSelector(state => state.user);
  const { postulations, postulationsLoading } = useSelector(state => state.animals);

  const [postulationsOpen, setPostulationsOpen] = useState(false);

  const togglePostulations = () => setPostulationsOpen(!postulationsOpen);

  const [description, setDescription] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  const handleDiagnosisChange = e => setDiagnosis(e.target.value);

  const modalOpen = useSelector(state => state.modal[MODALS.APPLICATION_MODAL]);
  const openModal = () => dispatch(ModalActions.openModal(MODALS.APPLICATION_MODAL));
  const closeModal = useCallback(
    () => dispatch(ModalActions.closeModal(MODALS.APPLICATION_MODAL)),
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

  useEffect(() => {
    dispatch(AnimalActions.getAnimal(id));
    dispatch(AnimalActions.getPostulationsForAnimal(id));
    dispatch(MyDataActions.getMyData());
    return () => closeModal();
  }, [dispatch, id, closeModal]);

  /**
   *  Adoptad?
   *    si:
   *        Soy yo el adoptandte?\
   *          si: puedo subir diagnostico
   *          no: No mostrar nada
   *    no:
   *      soy yo el rescatista?
   *        si: ver postulaciones
   *        no: postularse
   *
   *
   */

  return (
    <LoadingWrapper loading={animalLoading || meLoading || postulationsLoading}>
      {animal && me && (
        <>
          <div className={`column full-width full-height ${styles.animalViewContainer}`}>
            <h1 className="title bold m-bottom-4">Adoptar Mascota</h1>
            <div className={`column m-bottom-4 ${styles.animalInfo}`}>
              <h2 className={`subtitle bold undeline italic m-bottom-6 ${styles.animalName}`}>
                {animal.nombre}
              </h2>
              <div className={`row space-between full-height ${styles.rowContainer}`}>
                <div className={`column half-width ${styles.infoContainer}`}>
                  <h3 className={`large-text bold ${styles.animalInfoTitle}`}>Datos del animal</h3>
                  {INFO_FIELDS.map(({ label, key }) => (
                    <InfoItem key={label} value={animal[key]} label={label} className={styles.infoItem} />
                  ))}
                  {animal?.notas && (
                    <div className="column full-width">
                      <span className="large-text bold">Notas adicionales:</span>
                      <span className="text">{animal.notas}</span>
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
              <div>
                <Button
                  type="button"
                  className={`row center middle m-bottom-6 ${styles.button}`}
                  label="Ver Postulaciones"
                  onClick={togglePostulations}
                />
                {postulationsOpen && (
                  <div className={styles.postulationsContainer}>
                    {postulations.map(postulation => (
                      <div
                        key={postulation.id}
                        className={`row full-width space-between ${styles.postulation}`}>
                        <InfoItem value={postulation.user.email} label="Email" className="column" />
                        <InfoItem
                          value={postulation.user.createdAt}
                          label="Miembro desde:"
                          className="column"
                        />
                        <div className="column half-width">
                          <InfoItem
                            value={postulation.description}
                            label="Descripcion del adoptante:"
                            className="column"
                          />
                          <a href={`/users/${postulation.user.id}`}>Ver perfil</a>
                        </div>
                        {!animal.adopted && (
                          <AcceptApplicationButton
                            onClick={() => handleEditPostulation(postulation.id, true)}
                          />
                        )}
                        {postulation.accepted && (
                          <RejectApplicationButton
                            onClick={() => handleEditPostulation(postulation.id, false)}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Button
                label="Postularse como adoptante"
                onClick={openModal}
                type="button"
                className={styles.button}
              />
            )}
          </div>
          <CustomModal
            className={styles.modalContainer}
            modal={MODALS.APPLICATION_MODAL}
            onClose={closeModal}
            isOpen={modalOpen}
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
                value={diagnosis}
                onChange={handleDiagnosisChange}
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
        </>
      )}
    </LoadingWrapper>
  );
};

export default AnimalView;

import React, { useEffect, useState } from 'react';
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

// eslint-disable-next-line complexity
const AnimalView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { animal, animalLoading } = useSelector(state => state.animals);
  const { me, meLoading } = useSelector(state => state.user);
  const { postulations, postulationsLoading } = useSelector(state => state.animals);

  // const [postulationsOpen] = useState(false);

  const [description, setDescription] = useState('');

  // const modalOpen = useSelector(state => state.modal[MODALS.APPLICATION_MODAL]);
  const modalOpenPostulate = useSelector(state => state.modal[MODALS.POSTULATE_MODAL]);
  const openModalPostulate = () => dispatch(ModalActions.openModal(MODALS.POSTULATE_MODAL));
  const closeModalPostulate = () => dispatch(ModalActions.closeModal(MODALS.POSTULATE_MODAL));

  const modalOpenPostulations = useSelector(state => state.modal[MODALS.POSTULATIONS_MODAL]);
  const openModalSeePostulations = () => dispatch(ModalActions.openModal(MODALS.POSTULATIONS_MODAL));
  const closeModalSeePostulations = () => dispatch(ModalActions.closeModal(MODALS.POSTULATIONS_MODAL));

  const handleDescriptionChange = e => setDescription(e.target.value);

  const submitApplication = () => dispatch(AnimalActions.postulateForAdoption({ id, description }));

  const handleEditPostulation = (postulationId, accept) => {
    const payload = {
      postulationId,
      accept
    };
    dispatch(AnimalActions.editPostulation(payload));
  };

  const formatDate = date => {
    // eslint-disable-next-line prefer-const
    let d = new Date(date),
      month = `${d.getMonth() + 1}`,
      day = `${d.getDate()}`,
      // eslint-disable-next-line prefer-const
      year = d.getFullYear();

    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }

    return [day, month, year].join('-');
  };

  useEffect(() => {
    dispatch(AnimalActions.getAnimal(id));
    dispatch(AnimalActions.getPostulationsForAnimal(id));
    dispatch(MyDataActions.getMyData());
  }, [dispatch, id]);

  return (
    <LoadingWrapper loading={animalLoading || meLoading || postulationsLoading}>
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
            {me.id === animal.userId && (
              <div>
                <Button
                  type="button"
                  className={`row center middle m-bottom-6 ${styles.button}`}
                  label="Ver Postulaciones"
                  onClick={openModalSeePostulations}
                />
              </div>
            )}
            <CustomModal
              className={styles.modalContainer}
              modal={MODALS.POSTULATIONS_MODAL}
              onClose={closeModalSeePostulations}
              isOpen={modalOpenPostulations}
              hideCloseButton>
              <div className="column center middle">
                <div className={styles.postulationsContainer}>
                  {postulations.map(postulation => (
                    <div
                      key={postulation.id}
                      className={`row full-width space-between ${styles.postulation}`}>
                      <InfoItem value={postulation.user.email} label="Email" className="column" />
                      <InfoItem
                        value={formatDate(postulation.user.createdAt)}
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
              </div>
            </CustomModal>
            {!animal.adopted && animal.userId !== me.id && (
              <Button
                label="Postularse como adoptante"
                onClick={openModalPostulate}
                type="button"
                className={styles.button}
              />
            )}
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
        </>
      )}
    </LoadingWrapper>
  );
};

export default AnimalView;

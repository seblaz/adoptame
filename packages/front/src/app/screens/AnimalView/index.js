import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import Button from '~app/components/Button';
import CustomModal from '~app/components/CustomModal';
import LoadingWrapper from '~app/components/LoadingWrapper';
import AnimalActions from '~redux/Animal/actions';
import ModalActions from '~redux/Modal/actions';
import { MODALS } from '~redux/Modal/constants';
// import { ROUTES } from '~constants/routes';

import styles from './styles.module.scss';

const AnimalView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { animal, animalLoading } = useSelector(state => state.animals);
  const [description, setDescription] = useState('');

  const modalOpen = useSelector(state => state.modal[MODALS.APPLICATION_MODAL]);
  const openModal = () => dispatch(ModalActions.openModal(MODALS.APPLICATION_MODAL));
  const closeModal = () => dispatch(ModalActions.closeModal(MODALS.APPLICATION_MODAL));

  const handleDescriptionChange = e => setDescription(e.target.value);

  const submitApplication = () => dispatch(AnimalActions.postulateForAdoption({ id, description }));

  useEffect(() => {
    dispatch(AnimalActions.getAnimal(id));
  }, [dispatch, id]);

  return (
    <LoadingWrapper loading={animalLoading}>
      {animal && (
        <>
          <div className={`column full-width ${styles.animalViewContainer}`}>
            <h1 className="title bold">Adoptar Mascota</h1>
            <div className="row middle">
              <div className={`column half-width ${styles.infoContainer}`}>
                <div className="row middle space-between">
                  <span className="large-text bold">Nombre:</span>
                  <span className="text"> {animal.nombre}</span>
                </div>
                <div className="row middle space-between">
                  <span className="large-text bold">Especie:</span>
                  <span className="text"> {animal.especie}</span>
                </div>
                <div className="row middle space-between">
                  <span className="large-text bold">Sexo: </span>
                  <span className="text">{animal.sexo}</span>
                </div>
                <div className="row middle space-between">
                  <span className="large-text bold">Edad: </span>
                  <span className="text">{animal.edad}</span>
                </div>
                <div className="row middle space-between">
                  <span className="large-text bold">Tamaño: </span>
                  <span className="text">{animal.tamanio}</span>
                </div>
              </div>
              <img
                src="https://thumbs.dreamstime.com/b/happy-golden-retriever-puppy-week-old-runs-toward-camera-96711049.jpg"
                className={styles.photo}
              />
            </div>
            <Button
              label="Postularse como adoptante"
              onClick={openModal}
              type="button"
              className={styles.button}
            />
            <Link
              to={location => `${location.pathname}/postulations`}
              type="button"
              className={styles.button}>
              Ver Postulaciones
            </Link>
          </div>
          <CustomModal
            className={styles.modalContainer}
            modal={MODALS.APPLICATION_MODAL}
            onClose={closeModal}
            isOpen={modalOpen}
            hideCloseButton>
            <div className="column center middle">
              <p className="row center large-text m-top-4 m-bottom-6">
                Ingrese una breve descripción suya para proceder con la adopción
              </p>
              <textarea
                maxLength={400}
                className={`small-text ${styles.textArea}`}
                placeholder="Ingrese una breve descripción..."
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

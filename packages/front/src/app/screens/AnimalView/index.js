import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import Button from '~app/components/Button';
import CustomModal from '~app/components/CustomModal';
import LoadingWrapper from '~app/components/LoadingWrapper';
import AnimalActions from '~redux/Animal/actions';
import ModalActions from '~redux/Modal/actions';
import { MODALS } from '~redux/Modal/constants';

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

  useEffect(() => {
    dispatch(AnimalActions.getAnimal(id));
  }, [dispatch, id]);

  return (
    <LoadingWrapper loading={animalLoading}>
      {animal && (
        <>
          <div className="column center middle">
            <h1 className="title bold">Animal</h1>
            <div>Nombre: {animal.nombre}</div>
            <div>Especie: {animal.especie}</div>
            <div>Sexo: {animal.sexo}</div>
            <div>Edad: {animal.edad}</div>
            <div>Tamaño: {animal.tamanio}</div>
            <Button label="Postularse como adoptante" onClick={openModal} type="button" />
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
                onClick={closeModal}
                type="button"
                className={`full-width ${styles.submitButton}`}
              />
            </div>
          </CustomModal>
        </>
      )}
    </LoadingWrapper>
  );
};

export default AnimalView;

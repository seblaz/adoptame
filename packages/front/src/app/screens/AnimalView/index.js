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

  const modalOpen = useSelector(state => state.modal[MODALS.APPLICATION_MODAL]);
  const openModal = () => dispatch(ModalActions.openModal(MODALS.APPLICATION_MODAL));
  const closeModal = () => dispatch(ModalActions.closeModal(MODALS.APPLICATION_MODAL));

  const handleDescriptionChange = e => setDescription(e.target.value);

  const submitApplication = () => dispatch(AnimalActions.postulateForAdoption({ id, description }));

  // eslint-disable-next-line react/no-multi-comp
  const AcceptApplicationButton = postulation => (
    <Button
      type="button"
      label="Aceptar"
      className={styles.button}
      onClick={() => dispatch(AnimalActions.acceptPostulation(postulation.id))}
    />
  );

  useEffect(() => {
    dispatch(AnimalActions.getAnimal(id));
    dispatch(AnimalActions.getPostulationsForAnimal(id));
    dispatch(MyDataActions.getMyData());
  }, [dispatch, id]);

  return (
    <LoadingWrapper loading={animalLoading || meLoading || postulationsLoading}>
      {animal && me && (
        <>
          <div className={`column center  full-width ${styles.animalViewContainer}`}>
            <h1 className="title bold">Adoptar Mascota</h1>
            <div className={`row middle full-width ${styles.animalInfo}`}>
              <div className={`column half-width ${styles.infoContainer}`}>
                {INFO_FIELDS.map(({ label, key }) => (
                  <InfoItem key={label} value={animal[key]} label={label} />
                ))}
              </div>
              <img
                src="https://thumbs.dreamstime.com/b/happy-golden-retriever-puppy-week-old-runs-toward-camera-96711049.jpg"
                className={`half-width ${styles.photo}`}
              />
            </div>
            {me.id === animal.userId ? (
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
                      <div key={postulation.id} className={`row full-width middle ${styles.postulation}`}>
                        <div className="column half-width">
                          <InfoItem
                            value={postulation.user.email}
                            label="Email"
                            className="column m-bottom-4"
                          />
                          <InfoItem
                            value={postulation.user.createdAt}
                            label="Miembro desde:"
                            className="column"
                          />
                        </div>
                        <div className="column half-width">
                          <InfoItem
                            value={postulation.description}
                            label="Descripcion del adoptante:"
                            className="column"
                          />
                          <a href={`/users/${postulation.user.id}`}>Ver perfil</a>
                        </div>
                        {animal.adopted ? null : <AcceptApplicationButton />}
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

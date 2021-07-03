import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Slider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AnimalActions from '~redux/Animal/actions';
import LoadingWrapper from '~app/components/LoadingWrapper';
import AnimalCard from '~app/components/Animals/AnimalCard';
import ButtonGroup from '~app/components/ButtonGroup';
import { ESPECIES, SEXOS, TAMANIOS } from '~components/Animals/constants';

import styles from './styles.module.scss';

const AnimalsView = () => {
  const dispatch = useDispatch();
  const { animals: allAnimals, animalsLoading } = useSelector(state => state.animals);
  const [selectedAnimals, setSelectedAnimals] = useState(allAnimals);

  const [especie, setEspecie] = useState();
  const [sexo, setSexo] = useState();
  const [tamanio, setTamanio] = useState();
  const [edad, setEdad] = useState([0, 20]);

  const especies = [{ value: undefined, label: 'Todas' }, ...ESPECIES];
  const sexos = [{ value: undefined, label: 'Todos' }, ...SEXOS];
  const tamanios = [{ value: undefined, label: 'Todos' }, ...TAMANIOS];

  useEffect(() => {
    dispatch(AnimalActions.getAnimals());
  }, [dispatch]);

  useEffect(() => {
    if (allAnimals) {
      let filtered = allAnimals.filter(animal => animal.edad > edad[0] && animal.edad < edad[1]);
      if (especie) {
        filtered = filtered.filter(animal => animal.especie === especie);
      }
      if (sexo) {
        filtered = filtered.filter(animal => animal.sexo === sexo);
      }
      if (tamanio) {
        filtered = filtered.filter(animal => animal.tamanio === tamanio);
      }
      setSelectedAnimals(filtered);
    }
  }, [allAnimals, sexo, especie, tamanio, edad]);

  const classes = makeStyles(theme => ({
    root: {
      marginTop: theme.spacing(2),
      color: '#FFFFF'
    },
    centerItems: {
      display: 'flex',
      justifyContent: 'center'
    },
    centerVertically: {
      display: 'flex',
      alignItems: 'center'
    },
    filtro: {
      paddingTop: theme.spacing(4),
      width: '100%'
    }
  }))();

  return (
    <div className={`full-width full-height ${styles.animalsContainer}`}>
      <Container className={classes.root}>
        <LoadingWrapper loading={animalsLoading}>
          <h1 className="title bold m-bottom-4">Mascotas en adopción</h1>
          <div className="row">
            <div className={styles.box}>
              <Typography variant="h5" className={classes.centerItems}>
                Filtros
              </Typography>
              {/* Especie */}
              <div className={classes.filtro}>
                <Typography variant="body1" className={classes.centerVertically}>
                  Especie:&nbsp;
                </Typography>
                <ButtonGroup opciones={especies} onChange={({ value }) => setEspecie(value)} />
              </div>
              {/* Sexo */}
              <div className={classes.filtro}>
                <Typography variant="body1" className={classes.centerVertically}>
                  Sexo:&nbsp;
                </Typography>
                <ButtonGroup opciones={sexos} onChange={({ value }) => setSexo(value)} />
              </div>
              {/* Tamanio */}
              <div className={classes.filtro}>
                <Typography variant="body1" className={classes.centerVertically}>
                  Tamanio:&nbsp;
                </Typography>
                <ButtonGroup opciones={tamanios} onChange={({ value }) => setTamanio(value)} />
              </div>
              {/* Edad */}
              <div className={classes.filtro}>
                <Typography variant="body1" className={classes.centerVertically}>
                  Edad:&nbsp;
                </Typography>
                <Slider
                  marks
                  min={0}
                  max={20}
                  valueLabelDisplay="auto"
                  value={edad}
                  onChange={(event, newValue) => setEdad(newValue)}
                />
              </div>
            </div>
            <Grid item xs={8}>
              <div className="row wrap">
                {selectedAnimals &&
                  selectedAnimals.map(animal => <AnimalCard key={animal.id} animal={animal} />)}
              </div>
            </Grid>
          </div>
        </LoadingWrapper>
      </Container>
    </div>
  );
};

export default AnimalsView;

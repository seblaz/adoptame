import React, { useState } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { useMediaQuery } from '@material-ui/core';
import { arrayOf, func, shape, string } from 'prop-types';

const MyButtonGroup = ({ opciones, seleccionPorDefecto, onChange = () => null }) => {
  const [seleccionado, setSeleccionado] = useState(seleccionPorDefecto || opciones[0].value);
  const isXs = useMediaQuery(theme => theme.breakpoints.only('xs'));

  return (
    <ButtonGroup color="primary" size={isXs ? 'small' : 'medium'}>
      {opciones.map(({ label, value }) => (
        <Button
          key={label}
          variant={seleccionado === value ? 'contained' : 'outlined'}
          onClick={() => {
            setSeleccionado(value);
            onChange({ value });
          }}>
          {label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

MyButtonGroup.propTypes = {
  opciones: arrayOf(shape({ label: string, value: string })),
  seleccionPorDefecto: string,
  onChange: func
};

export default MyButtonGroup;

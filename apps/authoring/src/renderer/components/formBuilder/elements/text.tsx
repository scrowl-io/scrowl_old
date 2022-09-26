import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FormElementProps, FormBuilderData } from '../comp-form-builder.types';
import { deepCopy } from '../utils';

export const Text = ({ config, name, onUpdate }: FormElementProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const payload: { [key: string]: FormBuilderData } = {};
  const control = deepCopy(config);
  const [value, setValue] = useState(config.value);
  const handlerUpdateValue = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = ev.currentTarget.value;

    setValue(newValue);
    control.value = newValue;
    payload[name] = control;
    onUpdate(payload);
  };

  if (value !== config.value) {
    setValue(config.value);
  }

  return (
    <Form.Group>
      <Form.Label>{config.label}</Form.Label>
      <Form.Control type="text" value={value} onChange={handlerUpdateValue} />
    </Form.Group>
  );
};

export default {
  Text,
};

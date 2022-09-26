import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import {
  FormElementProps,
  FormBuilderCommons,
} from '../comp-form-builder.types';
import { deepCopy } from '../utils';

export const Text = ({ config, name, onUpdate }: FormElementProps) => {
  const data: FormBuilderCommons['formData'] = {};
  const control = deepCopy(config);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState(control.value);
  const handlerUpdateValue = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = ev.currentTarget.value;

    setValue(newValue);
    control.value = newValue;
    data[name] = control;
    onUpdate(data);
  };

  return (
    <Form.Group>
      <Form.Label>{control.label}</Form.Label>
      <Form.Control
        type="text"
        value={control.value}
        onChange={handlerUpdateValue}
      />
    </Form.Group>
  );
};

export default {
  Text,
};

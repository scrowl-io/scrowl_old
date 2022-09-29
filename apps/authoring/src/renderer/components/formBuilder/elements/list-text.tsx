import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import {
  FormElementProps,
  FormBuilderData,
  FormBuilderDataListText,
} from '../comp-form-builder.types';
import { deepCopy } from '../utils';

export const ListText = (props: FormElementProps) => {
  const onUpdate = props.onUpdate;
  const name = props.name;
  const config = props.config as FormBuilderDataListText;
  const payload: { [key: string]: FormBuilderData } = {};
  const control = deepCopy(config);
  const inputValue = config.value.join(', ');
  const [value, setValue] = useState(inputValue);
  const formatValue = (val: string) => {
    return val.split(', ');
  };
  const handlerUpdateValue = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let formattedVal: Array<string> = [];
    const newValue = ev.currentTarget.value;

    if (newValue) {
      formattedVal = formatValue(newValue);
    }

    setValue(newValue);
    control.value = formattedVal;
    payload[name] = control;
    onUpdate(payload);
  };

  if (value !== inputValue) {
    setValue(inputValue);
  }

  return (
    <Form.Group>
      <Form.Label>{config.label}</Form.Label>
      <Form.Control
        type="text"
        as="textarea"
        value={value}
        size="sm"
        onChange={handlerUpdateValue}
      />
    </Form.Group>
  );
};

export default {
  ListText,
};

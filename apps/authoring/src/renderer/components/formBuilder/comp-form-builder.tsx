import React from 'react';
import { Button } from '@owlui/lib';
import { Form } from 'react-bootstrap';
import * as styles from './comp-formBuilder.module.scss';
import { FormBuilderProps, FormElementProps } from './comp-form-builder.types';
import { Number, Text, Textarea } from './elements';

export const FormElement = ({ config, name, onUpdate }: FormElementProps) => {
  switch (config.type) {
    case 'number':
      return <Number config={config} name={name} onUpdate={onUpdate} />;
    case 'text':
      return <Text config={config} name={name} onUpdate={onUpdate} />;
    case 'textarea':
      return <Textarea config={config} name={name} onUpdate={onUpdate} />;
    default:
      console.error('Form element not support', name, config);
      return <></>;
  }
};

export const FormBuilder = ({
  name,
  formData,
  onSubmit,
  onUpdate,
}: FormBuilderProps) => {
  const controls = Object.keys(formData);
  console.log('data', controls, formData);
  return (
    <Form className={styles.formBuilder}>
      <div>{name}</div>
      {controls.map((ctrl: string, idx: number) => {
        return (
          <FormElement
            config={formData[ctrl]}
            name={ctrl}
            key={idx}
            onUpdate={onUpdate}
          />
        );
      })}
      <Button onClick={onSubmit}>Save</Button>
    </Form>
  );
};

export default {
  FormElement,
  FormBuilder,
};
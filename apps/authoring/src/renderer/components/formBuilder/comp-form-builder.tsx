import React from 'react';
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
  SubmitAction,
  onUpdate,
}: FormBuilderProps) => {
  const controls = Object.keys(formData);
  const actionStyling = {
    marginTop: '1em',
    display: 'flex',
    justifyContent: 'end',
  };

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
      {SubmitAction ? (
        <div style={actionStyling}>
          <SubmitAction />
        </div>
      ) : (
        <></>
      )}
    </Form>
  );
};

export default {
  FormElement,
  FormBuilder,
};

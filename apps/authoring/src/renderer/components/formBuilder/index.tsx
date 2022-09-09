import React from 'react';
import { Form, FormDataProps } from '@owlui/lib';
import * as styles from './comp-formBuilder.module.scss';

const formComponents: any = [];

console.log(styles);

const createFormElement = (formElements: any) => {
  Object.entries(formElements).forEach((element: any) => {
    console.log(element);
    let obj;
    switch (element[1].type) {
      case 'text':
        obj = {
          type: 'input',
          inputProps: {
            label: {
              content: element[1].label,
              htmlFor: element[1].label,
            },
            control: {
              id: element[1].label,
              name: element[1].label,
              type: element[1].type,
              value: element[1].value,
              // onChange: handleInputChange,
            },
          },
        };
        formComponents.push(obj);
        break;
      case 'textarea':
        obj = {
          type: 'input',
          inputProps: {
            label: {
              content: element[1].label,
              htmlFor: element[1].label,
            },
            control: {
              id: element[1].label,
              name: element[1].label,
              type: element[1].type,
              value: element[1].value,
              as: 'textarea',
              className: 'textarea',
              // onChange: handleInputChange,
            },
          },
        };
        formComponents.push(obj);
        break;
      default:
        return <></>;
    }
  });
  return formComponents;
};

export const GeneratedForm = (props: any) => {
  const formElements = props.elements;
  createFormElement(formElements);

  return (
    <Form className={styles.formBuilder} formData={formComponents}>
      <></>
    </Form>
  );
};

export default {
  GeneratedForm,
};

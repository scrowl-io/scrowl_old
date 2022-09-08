import React from 'react';
import { Form, Input, FormDataProps } from '@owlui/lib';

const formComponents: FormDataProps[] = [];

const createFormElement = (formElements: any) => {
  Object.entries(formElements).forEach((element: any) => {
    console.log(element);
    const obj = {
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
  });
  return formComponents;
};

export const GeneratedForm = (props: any) => {
  const formElements = props.elements;
  console.log(formElements);
  createFormElement(formElements);

  return (
    <Form formData={formComponents}>
      <></>
    </Form>
  );
};

export default {
  GeneratedForm,
};

import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { FormDataProps } from '@owlui/lib';
import { Form } from 'react-bootstrap';
import * as styles from './comp-formBuilder.module.scss';

// const formComponents: any = [];

// const createFormElement = (formElements: any, setFormData: any) => {
//   const handleInputChange = (ev: BaseSyntheticEvent) => {
//     console.log(ev.currentTarget.value);
//     const value = ev.currentTarget.value;
//     console.log(formElements);
//     setFormData({ ...formElements, [ev.target.name]: value });
//   };

//   Object.entries(formElements).forEach((element: any) => {
//     let obj;
//     switch (element[1].type) {
//       case 'text':
//       case 'number':
//         obj = {
//           type: 'input',
//           inputProps: {
//             label: {
//               content: element[1].label,
//               htmlFor: element[1].label,
//             },
//             control: {
//               id: element[1].label,
//               name: element[1].label,
//               type: element[1].type,
//               value: element[1].value,
//               onChange: handleInputChange,
//             },
//           },
//         };
//         formComponents.push(obj);
//         break;
//       case 'textarea':
//         obj = {
//           type: 'input',
//           inputProps: {
//             label: {
//               content: element[1].label,
//               htmlFor: element[1].label,
//             },
//             control: {
//               id: element[1].label,
//               name: element[1].label,
//               type: element[1].type,
//               value: element[1].value,
//               as: 'textarea',
//               className: 'textarea',
//               onChange: handleInputChange,
//             },
//           },
//         };
//         formComponents.push(obj);
//         break;
//       default:
//         return <></>;
//     }
//   });
//   return formComponents;
// };

const createFormElements = (formData: any, setFormData: any) => {
  const handleInputChange = (ev: BaseSyntheticEvent) => {
    const value = ev.currentTarget.value;
    const name = ev.currentTarget.name;

    setFormData({
      ...formData,
      [name]: {
        ...formData[name],
        value: value,
      },
    });
  };
  const nodes = Object.entries(formData).map((element: any, index: number) => {
    switch (element[1].type) {
      case 'text':
      case 'number':
        return (
          <Form.Group key={index}>
            <Form.Label>{element[1].label}</Form.Label>
            <Form.Control
              name={element[1].label}
              type="text"
              value={element[1].value}
              onChange={handleInputChange}
            />
          </Form.Group>
        );
      case 'textarea':
        return (
          <Form.Group key={index}>
            <Form.Label>{element[1].label}</Form.Label>
            <Form.Control
              name={element[1].label}
              as="textarea"
              type="text"
              value={element[1].value}
              onChange={handleInputChange}
            />
          </Form.Group>
        );
      default:
        return <></>;
    }
  });
  return nodes;
};

export const GeneratedForm = (props: any) => {
  const formElements = props.formData;
  const setFormData = props.setFormData;
  const nodes = createFormElements(formElements, setFormData);

  return <Form className={styles.formBuilder}>{nodes}</Form>;
};

export default {
  GeneratedForm,
};

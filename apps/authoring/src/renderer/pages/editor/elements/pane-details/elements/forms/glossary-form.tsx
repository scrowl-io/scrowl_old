import { Form, Button, FormDataProps } from '@owlui/lib';
import React, { Dispatch, SetStateAction, useState } from 'react';

import { Modal } from 'react-bootstrap';

type GlossaryItem = { name: string; description: string };
type GlossaryData = Array<GlossaryItem>;
type GlossaryDict = {
  [key: string]: {
    [key: string]: string;
  };
};

interface GlossaryFormProps {
  glossary: GlossaryData;
  setGlossary: any;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  glossaryData?: GlossaryData;
  editEntry?: boolean;
}

export const GlossaryForm = (props: GlossaryFormProps) => {
  const [termData, setTermData] = useState({
    name: '',
    description: '',
  });

  const { show, setShow, setGlossary, editEntry } = props;

  console.log(editEntry);
  console.log(show);

  const handleCancel = () => {
    setShow(!show);
  };

  const handleChange = (e: React.BaseSyntheticEvent) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setTermData({ ...termData, [e.target.name]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setGlossary((glossary: GlossaryData) => [...glossary, termData]);
    handleCancel();
  };

  const formData: FormDataProps[] = [
    {
      type: 'input',
      inputProps: {
        label: {
          content: 'Name',
          htmlFor: 'name',
        },
        control: {
          onChange: handleChange,
          id: 'name',
          value: termData.name,
          name: 'name',
          type: 'text',
          disabled: false,
          readOnly: false,
          plaintext: false,
          placeholder: 'Enter Term',
        },
      },
    },
    {
      type: 'input',
      inputProps: {
        label: {
          content: 'Description',
          htmlFor: 'description',
        },
        control: {
          onChange: handleChange,
          id: 'description',
          value: termData.description,
          name: 'description',
          type: 'text',
          disabled: false,
          readOnly: false,
          plaintext: false,
          placeholder: 'Define the Term',
          className: 'description',
        },
      },
    },
  ];

  return (
    <Form formData={formData} onSubmit={handleSubmit}>
      <div className="glossary-form-button-set d-flex justify-content-end">
        <Button
          className="glossary-cancel-button"
          onClick={handleCancel}
          variant="light"
        >
          Cancel
        </Button>
        <Button
          className="glossary-submit-button"
          type="submit"
          variant="success"
        >
          Save
        </Button>
      </div>
    </Form>
  );
};

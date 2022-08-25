import { Form, Button, FormDataProps } from '@owlui/lib';
import React, { Dispatch, SetStateAction, useState } from 'react';

interface GlossaryFormProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export const GlossaryForm = (props: GlossaryFormProps) => {
  const [termData, setTermData] = useState({
    term: '',
    definition: '',
  });

  const { show, setShow } = props;

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
    console.log(termData);
    setTermData({ ...termData, term: '', definition: '' });
  };

  const formData: FormDataProps[] = [
    {
      type: 'input',
      inputProps: {
        label: {
          content: 'Term',
          htmlFor: 'term',
        },
        control: {
          onChange: handleChange,
          id: 'term',
          value: termData.term,
          name: 'term',
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
          content: 'Definition',
          htmlFor: 'definition',
        },
        control: {
          onChange: handleChange,
          id: 'definition',
          value: termData.definition,
          name: 'definition',
          type: 'text',
          disabled: false,
          readOnly: false,
          plaintext: false,
          placeholder: 'Define the Term',
          className: 'definition',
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

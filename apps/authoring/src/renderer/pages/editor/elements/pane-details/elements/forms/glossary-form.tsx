import { Form, Button, FormDataProps } from '@owlui/lib';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Modal } from 'react-bootstrap';
import { Projects } from '../../../../../../models';
import { ProjectData } from '../../../../../../models/projects';
import { GlossaryItem, GlossaryData } from '../editor-pane-details-glossary';
interface GlossaryFormProps {
  glossary: GlossaryData;
  setGlossary: Dispatch<SetStateAction<GlossaryData>>;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  glossaryData?: GlossaryData;
  editEntry?: boolean;
  project: ProjectData;
}

export const GlossaryForm = (props: GlossaryFormProps) => {
  const [termData, setTermData] = useState({
    name: '',
    description: '',
  });

  const { show, setShow, setGlossary, glossary } = props;

  useEffect(() => {
    Projects.update({ glossary });
  }, [glossary]);

  const handleCancel = () => {
    setShow(!show);
  };

  const handleChange = (e: React.BaseSyntheticEvent) => {
    const value = e.target.value;
    setTermData({ ...termData, [e.target.name]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setGlossary((glossary: GlossaryData) => [...glossary, termData]);
    setShow(!show);
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

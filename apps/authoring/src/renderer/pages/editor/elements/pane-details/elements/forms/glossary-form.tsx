import { Form, Button, FormDataProps } from '@owlui/lib';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

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
  termData: GlossaryItem;
  setTermData: Dispatch<SetStateAction<GlossaryItem>>;
}

export const GlossaryForm = (props: GlossaryFormProps) => {
  const { show, setShow, setGlossary, glossary, termData, setTermData } = props;

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

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    const nameAlreadyExists = glossary.filter(term => {
      return term.name === termData.name;
    });
    const descriptionAlreadyExists = glossary.filter(term => {
      return term.description === termData.description;
    });

    const oldDesc = descriptionAlreadyExists[0];
    const oldTerm = nameAlreadyExists[0];

    if (oldTerm) {
      const newGlossary = glossary.filter(term => {
        return term.name !== termData.name;
      });
      setGlossary(newGlossary);
    } else if (oldDesc) {
      const newGlossary = glossary.filter(term => {
        return term.description !== termData.description;
      });
      setGlossary(newGlossary);
    }

    setGlossary((glossary: GlossaryData) => [...glossary, termData]);
    setTermData({ name: '', description: '' });
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

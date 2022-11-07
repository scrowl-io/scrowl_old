import React, { useState } from 'react';
import { Button, Form } from '@owlui/lib';
import { GlossaryFormProps } from './glossary-types';
import * as styles from '../../editor-pane-details.module.scss';

export const GlossaryForm = ({
  term,
  onSubmit,
  onCancel,
  onChange,
}: GlossaryFormProps) => {
  const prefix = 'form-glossary-term';
  const [termName, setTermName] = useState(term.name || '');
  const [termDescription, setTermDescription] = useState(
    term.description || ''
  );

  const handleFormChangeName = (ev: React.FormEvent<HTMLInputElement>) => {
    const name = ev.currentTarget.value;
    setTermName(name);
    onChange({ name, description: termDescription });
  };

  const handleFormChangeDescription = (
    ev: React.FormEvent<HTMLInputElement>
  ) => {
    const description = ev.currentTarget.value;

    setTermDescription(description);
    onChange({ name: termName, description });
  };

  const handleFormSubmit = () => {
    onSubmit({
      name: termName,
      description: termDescription,
    });
  };

  const handleFormCancel = () => {
    setTermName('');
    setTermDescription('');
    onCancel();
  };

  const handleKeyboardSubmit = (e: React.KeyboardEvent) => {
    const cancelButton = document.querySelector('.glossary-cancel-button');
    const cancelIsFocused = document.activeElement === cancelButton;

    if (e.key === 'Enter' && !cancelIsFocused) {
      e.preventDefault();
      handleFormSubmit();
    }
  };

  const form = [
    {
      type: 'input',
      label: {
        content: 'TERM',
        htmlFor: `${prefix}-name`,
      },
      control: {
        id: `${prefix}-name`,
        name: `${prefix}-name`,
        type: 'text',
        placeholder: 'Enter Term',
        value: termName,
        onChange: handleFormChangeName,
      },
    },
    {
      type: 'input',
      label: {
        content: 'DEFINITION',
        htmlFor: `${prefix}-description`,
      },
      control: {
        id: `${prefix}-description`,
        className: 'description',
        name: `${prefix}-description`,
        type: 'textarea',
        placeholder: 'Define the Term',
        value: termDescription,
        onChange: handleFormChangeDescription,
        as: 'textarea',
      },
    },
  ];

  return (
    <Form
      className={styles.form}
      formData={form}
      onKeyDown={handleKeyboardSubmit}
    >
      <div className="glossary-form-button-set d-flex justify-content-end">
        <Button
          className="glossary-cancel-button"
          onClick={handleFormCancel}
          variant="link"
        >
          Cancel
        </Button>
        <Button
          className="glossary-submit-button"
          variant="success"
          onClick={handleFormSubmit}
        >
          Save
        </Button>
      </div>
    </Form>
  );
};

export default {
  GlossaryForm,
};

import React, { useState } from 'react';
import { Button, Form } from '@owlui/lib';

export const RightPaneContentForm = () => {
  const prefix = 'right-pane-content-form-input';
  const [data, setData] = useState({
    title: 'Building a Respectful Workplace',
    subtitle: 'Introduction',
    body: '',
  });

  const handleInputChange = (ev: React.FormEvent<HTMLInputElement>) => {
    const value = ev.currentTarget.value;

    setData({ ...data, [ev.currentTarget.name]: value });
  };

  const form = [
    {
      type: 'input',
      inputProps: {
        label: {
          content: 'Title',
          htmlFor: `${prefix}-title`,
        },
        control: {
          id: `${prefix}-title`,
          name: `${prefix}-title`,
          type: 'text',
          placeholder: 'Term...',
          value: data.title,
          onChange: handleInputChange,
        },
      },
    },
    {
      type: 'input',
      inputProps: {
        label: {
          content: 'Subtitle',
          htmlFor: `${prefix}-subtitle`,
        },
        control: {
          id: `${prefix}-subtitle`,
          className: 'subtitle',
          name: `${prefix}-subtitle`,
          type: 'input',
          placeholder: 'Term Description...',
          value: data.subtitle,
          onChange: handleInputChange,
        },
      },
    },
    // {
    //   type: 'input',
    //   inputProps: {
    //     label: {
    //       content: 'Description',
    //       htmlFor: `${prefix}-description`,
    //     },
    //     control: {
    //       id: `${prefix}-description`,
    //       className: 'description',
    //       name: `${prefix}-description`,
    //       type: 'textarea',
    //       placeholder: 'Term Description...',
    //       value: data.description,
    //       onChange: handleFormChangeDescription,
    //     },
    //   },
    // },
  ];

  return (
    <Form formData={form}>
      {/* <div className="glossary-form-button-set d-flex justify-content-end">
        <Button
          className="glossary-cancel-button"
          onClick={onHide}
          variant="light"
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
      </div> */}
    </Form>
  );
};

export default {
  RightPaneContentForm,
};

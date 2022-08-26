import { Form, Button, FormDataProps } from '@owlui/lib';
import React, { Dispatch, SetStateAction, useState } from 'react';

interface ResourceFormProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export const ResourceForm = (props: ResourceFormProps) => {
  const [resourceData, setResourceData] = useState({
    name: '',
    description: '',
    file: '',
    url: '',
  });

  const { show, setShow } = props;

  const handleCancel = () => {
    setShow(!show);
  };

  const handleChange = (e: React.BaseSyntheticEvent) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setResourceData({ ...resourceData, [e.target.name]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(resourceData);
    setResourceData({
      ...resourceData,
      name: '',
      description: '',
      file: '',
      url: '',
    });
  };

  const formData: FormDataProps[] = [
    {
      type: 'input',
      inputProps: {
        label: {
          content: 'Resource Name',
          htmlFor: 'resource-name',
        },
        control: {
          onChange: handleChange,
          id: 'resource-name',
          value: resourceData.name,
          name: 'name',
          type: 'text',
          disabled: false,
          readOnly: false,
          plaintext: false,
          placeholder: 'Untitled Resource',
        },
      },
    },
    {
      type: 'input',
      inputProps: {
        label: {
          content: 'Resource Description',
          htmlFor: 'resource-description',
        },
        control: {
          onChange: handleChange,
          id: 'resource-description',
          value: resourceData.description,
          name: 'description',
          type: 'text',
          disabled: false,
          readOnly: false,
          plaintext: false,
          placeholder: 'Describe the Resource',
        },
      },
    },
    // TODO Change type and replace with hook for importing file (will require updates in Owl-UI)
    {
      type: 'input',
      inputProps: {
        label: {
          content: 'Resource File',
          htmlFor: 'resource-file',
        },
        control: {
          onChange: handleChange,
          id: 'resource-file',
          value: resourceData.file,
          name: 'file',
          type: 'text',
          disabled: false,
          readOnly: false,
          plaintext: false,
          placeholder: 'No file chosen',
        },
      },
    },
    {
      type: 'input',
      inputProps: {
        label: {
          content: 'Resource URL',
          htmlFor: 'resource-url',
        },
        control: {
          onChange: handleChange,
          id: 'resource-url',
          value: resourceData.url,
          name: 'url',
          type: 'text',
          disabled: false,
          readOnly: false,
          plaintext: false,
          placeholder: 'Public URL',
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

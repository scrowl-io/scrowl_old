import React from 'react';
import { Button } from '@owlui/lib';
import { TemplateExplorerFooterProps } from '../editor-modal-template-explorer.types';

export const Footer = ({
  onClose,
  selectedTemplate,
}: TemplateExplorerFooterProps) => {
  const handleConfirmChange = () => {
    console.log('selectedTemplate', selectedTemplate);
  };

  return (
    <>
      <Button variant="link" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="success" onClick={handleConfirmChange}>
        Apply
      </Button>
    </>
  );
};

export default {
  Footer,
};

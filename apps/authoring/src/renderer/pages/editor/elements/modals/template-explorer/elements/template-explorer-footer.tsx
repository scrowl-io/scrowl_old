import React from 'react';
import { Button } from '@owlui/lib';
import { TemplateExplorerFooterProps } from '../editor-modal-template-explorer.types';
import { updateActiveSlideTemplate } from '../../../../page-editor-hooks';

export const Footer = ({
  onClose,
  selectedTemplate,
}: TemplateExplorerFooterProps) => {
  const handleConfirmChange = () => {
    const templateCopy = JSON.parse(JSON.stringify(selectedTemplate));

    delete templateCopy.isSelected;
    updateActiveSlideTemplate(templateCopy);
    onClose();
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

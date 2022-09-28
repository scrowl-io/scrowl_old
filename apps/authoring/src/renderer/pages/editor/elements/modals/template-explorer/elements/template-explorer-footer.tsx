import React from 'react';
import { Button } from '@owlui/lib';
import { TemplateExplorerFooterProps } from '../editor-modal-template-explorer.types';
import { updateActiveSlide } from '../../../../page-editor-hooks';

export const Footer = ({
  onClose,
  selectedTemplate,
}: TemplateExplorerFooterProps) => {
  const handleConfirmChange = () => {
    console.log('[template explorer] template selection - start');
    const templateCopy = JSON.parse(JSON.stringify(selectedTemplate));

    delete templateCopy.isSelected;
    console.log(
      '[template explorer] template selection - updating active slide'
    );
    updateActiveSlide({ template: templateCopy });
    console.log('[template explorer] template selection - end');
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

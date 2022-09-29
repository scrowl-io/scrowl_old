import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { Button } from '@owlui/lib';
import { TemplateExplorerFooterProps } from '../editor-modal-template-explorer.types';
import { Projects } from '../../../../../../models';
import {
  updateActiveSlide,
  useActiveSlidePosition,
} from '../../../../page-editor-hooks';

export const Footer = ({
  onClose,
  selectedTemplate,
}: TemplateExplorerFooterProps) => {
  const position = useActiveSlidePosition();
  const project = Projects.useData();

  const handleConfirmChange = () => {
    console.log('[template explorer] template selection - start');
    const templateCopy = JSON.parse(JSON.stringify(selectedTemplate));
    const modules = JSON.parse(JSON.stringify(project.modules));

    delete templateCopy.isSelected;
    console.log(
      '[template explorer] template selection - updating active slide'
    );
    updateActiveSlide({ template: templateCopy });
    modules[position.moduleIdx].lessons[position.lessonIdx].slides[
      position.slideIdx
    ].template = templateCopy;
    Projects.update({ modules });
    console.log('[template explorer] template selection - end');
    onClose();
  };

  return (
    <ButtonGroup>
      <Button variant="link" size="sm" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="success" size="sm" onClick={handleConfirmChange}>
        Apply
      </Button>
    </ButtonGroup>
  );
};

export default {
  Footer,
};

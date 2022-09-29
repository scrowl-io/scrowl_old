import React, { useState } from 'react';
import { Modal } from '@owlui/lib';
import { TemplateListItem } from './editor-modal-template-explorer.types';
import * as styles from './editor-modal-template-explorer.module.scss';
import { Templates } from '../../../../../models';
import { Body, Footer } from './elements';

export const TemplateExplorerModal = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateListItem>();
  const show = Templates.useExplorer();
  const header = {
    bsProps: {
      closeButton: true,
      closeLabel: 'Close',
    },
    content: <>Template Browser</>,
  };
  const body = {
    content: <Body onSelectTemplate={setSelectedTemplate} />,
  };
  const footer = {
    content: (
      <Footer
        selectedTemplate={selectedTemplate}
        onClose={Templates.closeExplorer}
      />
    ),
  };

  return (
    <Modal
      className={styles.templateExplorer}
      show={show}
      onHide={Templates.closeExplorer}
      header={header}
      body={body}
      footer={footer}
      size="xl"
    />
  );
};

export default {
  TemplateExplorerModal,
};

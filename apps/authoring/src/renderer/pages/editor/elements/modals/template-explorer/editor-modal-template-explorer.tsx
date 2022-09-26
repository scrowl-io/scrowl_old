import React from 'react';
import { Modal } from '@owlui/lib';
import { Templates } from '../../../../../models';
import { Body } from './elements';
import * as styles from './editor-modal-template-explorer.module.scss';

export const TemplateExplorerModal = () => {
  const show = Templates.useExplorer();
  const header = {
    bsProps: {
      closeButton: true,
      closeLabel: 'Close',
    },
    content: <>Template Browser</>,
  };
  const body = {
    content: <Body />,
  };

  return (
    <Modal
      className={styles.templateExplorer}
      show={show}
      onHide={Templates.closeExplorer}
      header={header}
      body={body}
    />
  );
};

export default {
  TemplateExplorerModal,
};

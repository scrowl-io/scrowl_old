import React, { ReactNode, useEffect, useState } from 'react';
import { Modal, ModalDefaultProps } from '@owlui/lib';
import { useExplorer, closeExplorer } from '../../models/projects/index';

export const ProjectExplorerModal = ({
  header,
  body,
  footer,
}: ModalDefaultProps) => {
  const showModalExplorer = useExplorer();
  const [showModal, setShowModal] = useState(showModalExplorer);
  console.log('use explorer', useExplorer());
  const toggleModal = () => setShowModal(!showModal);

  return (
    <Modal
      show={showModalExplorer}
      onHide={closeExplorer}
      header={header}
      body={body}
      footer={footer}
    />
  );
};

export default {
  ProjectExplorerModal,
};

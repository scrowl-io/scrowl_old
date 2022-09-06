import React, { useState } from 'react';
import { Default as Modal, ModalDefaultProps } from '@owlui/lib';

export const RenameModal = (args: ModalDefaultProps) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const header = {
    bsProps: {
      closeButton: true,
      closeLabel: 'Close',
    },
    content: <h2>Modal Header</h2>,
  };
  const body = {
    content: (
      <>
        <h6>Inside the modal body</h6>
        <hr />
        <p>Example of text inside the modal body.</p>
      </>
    ),
  };
  const footer = {
    content: <button>Save Changes</button>,
  };

  return (
    <div>
      <button onClick={toggleModal}>Click Me</button>
      <Modal
        {...args}
        show={showModal}
        onHide={toggleModal}
        header={header}
        body={body}
        footer={footer}
      />
      {/* this be the modal */}
    </div>
  );
};

export default {
  RenameModal,
};

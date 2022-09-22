import React from 'react';
import { Modal, ModalDefaultProps, Button } from '@owlui/lib';
import * as styles from '../../editor-pane-details.module.scss';

export interface DeleteModalProps extends ModalDefaultProps {
  title: string;
  label: string;
  onSubmit: () => void;
}

export const DeleteModal = ({
  title,
  label,
  onSubmit,
  ...props
}: DeleteModalProps) => {
  const header = {
    bsProps: {
      closeButton: true,
      closeLabel: 'Close',
    },
    content: <h2>{title}</h2>,
  };
  const body = {
    content: <>{label}</>,
  };
  const handleUpdate = () => {
    onSubmit();

    if (props.onHide) {
      props.onHide();
    }
  };
  const footer = {
    content: (
      <>
        <Button onClick={props.onHide} variant="light">
          Cancel
        </Button>
        <Button
          onClick={handleUpdate}
          variant="success"
          className={styles.glossarySubmitButton}
        >
          Update
        </Button>
      </>
    ),
  };

  return <Modal {...props} header={header} body={body} footer={footer} />;
};

export default {
  DeleteModal,
};

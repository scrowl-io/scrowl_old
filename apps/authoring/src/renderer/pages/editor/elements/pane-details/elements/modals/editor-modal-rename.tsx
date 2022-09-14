import React, { useState } from 'react';
import { Modal, ModalDefaultProps, Button } from '@owlui/lib';
import * as styles from '../../editor-pane-details.module.scss';

export interface RenameModalProps extends ModalDefaultProps {
  value: string;
  label: string;
  onSubmit: (name: string) => void;
}

export const RenameModal = ({
  value,
  label,
  onSubmit,
  ...props
}: RenameModalProps) => {
  const [name, updateName] = useState(value);
  const header = {
    bsProps: {
      closeButton: true,
      closeLabel: 'Close',
    },
    content: <h2>{label}</h2>,
  };
  const handleNameChange = (ev: React.FormEvent<HTMLInputElement>) => {
    updateName(ev.currentTarget.value);
  };
  const body = {
    content: (
      <>
        <input
          name="newName"
          id="newNameInput"
          className="owlui-form-control"
          value={name}
          placeholder=""
          onChange={handleNameChange}
        />
      </>
    ),
  };
  const handleUpdate = () => {
    onSubmit(name);

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
  RenameModal,
};

import React from 'react';
import { ConfirmationDialogProps } from './confirmation-dialog.types';

export const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const { isOpen } = props;
  console.log('inside the dialog itself!', isOpen);
  return <div>This is supposed to be the confirmation dialog.</div>;
};

export default {
  ConfirmationDialog,
};

import React, { createContext, useCallback, useState } from 'react';
import { ConfirmationDialog } from './confirmation-dialog';
import { ConfirmationDialogProviderProps } from './confirmation-dialog.types';

const ConfirmationDialogContext = createContext(null);

export const useConfirm = () => {
  const context = React.useContext(ConfirmationDialogContext);
  if (context === undefined) {
    throw new Error(
      'useConfirm must be used within the confirmation dialog provider.'
    );
  }

  return context;
};

export const ConfirmationDialogProvider = (
  props: ConfirmationDialogProviderProps
) => {
  const {
    acceptConfirm,
    cancelConfirm,
    headerText,
    descriptionText,
    acceptButton,
    cancelButton,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const confirm = useCallback(() => {
    setIsOpen(true);
  }, []);

  const accept = useCallback(() => {
    acceptConfirm();
    setIsOpen(false);
  }, [acceptConfirm]);

  const cancel = useCallback(() => {
    cancelConfirm();
    setIsOpen(false);
  }, [cancelConfirm]);

  return (
    <ConfirmationDialogContext.Provider value={confirm}>
      {props.children}
      <ConfirmationDialog
        isOpen={isOpen}
        accept={accept}
        cancel={cancel}
        headerText={headerText}
        descriptionText={descriptionText}
        acceptButton={acceptButton}
        cancelButton={cancelButton}
      />
    </ConfirmationDialogContext.Provider>
  );
};

export default {
  ConfirmationDialogProvider,
};

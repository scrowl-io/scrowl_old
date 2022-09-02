export interface ConfirmationDialogProviderProps {
  acceptConfirm: () => void;
  cancelConfirm: () => void;
  headerText: string;
  descriptionText: string;
  acceptButton: string;
  cancelButton: string;
  children: React.ReactNode;
}

export interface ConfirmationDialogProps {
  isOpen: boolean;
}

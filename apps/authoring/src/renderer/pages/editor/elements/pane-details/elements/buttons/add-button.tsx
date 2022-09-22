import React, { BaseSyntheticEvent } from 'react';
import { Icon, Button } from '@owlui/lib';

type AddButtonProps = {
  onClick: (e: BaseSyntheticEvent) => void;
  label: string;
};

export const AddButton = ({ onClick, label }: AddButtonProps) => {
  return (
    <Button className="outline-add-button" onClick={onClick} variant="link">
      <Icon icon="add" style={{ fontSize: '15px' }} />
      <span>{label}</span>
    </Button>
  );
};

export default {
  AddButton,
};

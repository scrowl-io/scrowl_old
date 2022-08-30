import React, { ReactNode } from 'react';
import { Modal, ModalDefaultProps } from '@owlui/lib';

export const ModalOutline = (props: ModalDefaultProps) => {
  const { header, body, footer } = props;

  console.log('modalContent', props);
  return <Modal header={header} body={body} footer={footer} />;
};

export default {
  ModalOutline,
};

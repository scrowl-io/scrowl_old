/* eslint-disable import/named */
import React from 'react';
import { Modal, ModalDefaultProps } from '@owlui/lib';

export const ModalOutline = (props: ModalDefaultProps) => {
  const { header, body, footer } = props;

  return <Modal header={header} body={body} footer={footer} />;
};

export default {
  ModalOutline,
};

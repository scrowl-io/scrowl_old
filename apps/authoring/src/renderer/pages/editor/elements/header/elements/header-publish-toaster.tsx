import React from 'react';
// eslint-disable-next-line import/named
import { Toast, ToastContainer, ToastProps } from 'react-bootstrap';
import { Portal } from '../../../../../components';

export type PublishToasterCommons = {
  title: string;
  message: string;
};

export type PublishToasterProps = PublishToasterCommons & ToastProps;

export const PublishToaster = (props: PublishToasterProps) => {
  const { title, message, ...localProps } = props;

  return (
    <Portal>
      <ToastContainer className="p-3" position="bottom-center">
        <Toast {...localProps}>
          <Toast.Header>
            <strong className="me-auto">{title}</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Portal>
  );
};

export default {
  PublishToaster,
};

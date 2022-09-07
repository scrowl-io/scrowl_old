// import { ModalDefaultProps } from '@owlui/lib';
// import React, { useState, createContext, useContext, FC } from 'react';
// import { ProjectExplorerModal } from '../components/projectExplorerModal';
// import { useExplorer, closeExplorer } from '../models/projects/index';

// export const MODAL_TYPES = {
//   PROJECT_EXPLORER: 'PROJECT_EXPLORER',
// };

// const MODAL_COMPONENTS: any = {
//   [MODAL_TYPES.PROJECT_EXPLORER]: ProjectExplorerModal,
// };

// type GlobalModalContext = {
//   showModal: () => void;
//   hideModal: () => void;
//   modalType: string;
// };

// const initalState: GlobalModalContext = {
//   showModal: () => {},
//   hideModal: () => {},
//   modalType: '',
// };

// const ModalContext = createContext<GlobalModalContext>(initalState);
// export const useGlobalModalContext = () => useContext(ModalContext);

// const sampleAppContext: GlobalModalContext = {
//   showModal: useExplorer,
//   hideModal: closeExplorer,
//   modalType: 'PROJECT_EXPLORER',
// };

// export const GlobalModal: FC = () => {
//   const [store, setStore] = useState<GlobalModalContext>();
//   const { showModal, hideModal, modalType } = initalState;

//   const initModal = (
//     hideModal: () => void,
//     showModal: () => void,
//     modalType: string,
//     modalProps: any = {}
//   ) => {
//     setStore({
//       showModal,
//       hideModal,
//       modalType,
//       ...modalProps,
//     });
//   };
// };

export {};

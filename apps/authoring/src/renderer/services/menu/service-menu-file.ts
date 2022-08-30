import { requester } from '..';
import { MenuEventsFileApi } from '../../../main/services/menu';

export const ENDPOINTS: MenuEventsFileApi = {
  projectsCreate: '/projects/create',
  projectOpen: '/projects/open',
  projectSave: '/projects/save',
  projectPublish: '/projects/publish',
  importFile: 'project/import-file',
  preferencesCreate: '/preferences/create',
  preferencesOpen: '/preferences/open',
};

export const onProjectCreate = (listener: requester.Listener) => {
  requester.on(ENDPOINTS.projectsCreate, listener);
};

export const onProjectOpen = (listener: requester.Listener) => {
  requester.on(ENDPOINTS.projectOpen, listener);
};

export const onProjectSave = (listener: requester.Listener) => {
  requester.on(ENDPOINTS.projectSave, listener);
};

export const offProjectSave = () => {
  requester.offAll(ENDPOINTS.projectSave);
};

export const onProjectPublish = (listener: requester.Listener) => {
  requester.on(ENDPOINTS.projectPublish, listener);
};

export const offProjectPublish = () => {
  requester.offAll(ENDPOINTS.projectPublish);
};

export const onImportFile = (listener: requester.Listener) => {
  requester.on(ENDPOINTS.importFile, listener);
};

export const onPreferencesCreate = (listener: requester.Listener) => {
  requester.on(ENDPOINTS.preferencesCreate, listener);
};

export const onPreferencesOpen = (listener: requester.Listener) => {
  requester.on(ENDPOINTS.preferencesOpen, listener);
};

export default {
  onProjectCreate,
  onProjectOpen,
  onProjectSave,
  onImportFile,
  onPreferencesCreate,
  onPreferencesOpen,
};

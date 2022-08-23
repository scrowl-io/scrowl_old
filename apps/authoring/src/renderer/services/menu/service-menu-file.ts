import { requester } from '..';
import { MenuEventsFileApi } from '../../../main/services/menu';

export const ENDPOINTS: MenuEventsFileApi = {
  projectsCreate: '/projects/create',
  projectOpen: '/projects/open',
  projectSave: '/projects/save',
  importFile: 'project/import-file',
  preferencesCreate: '/preferences/create',
  preferencesOpen: '/preferences/open',
};

const registerListener = (
  endpoint: typeof ENDPOINTS[keyof typeof ENDPOINTS],
  listener: requester.Listener
) => {
  requester.on(endpoint, listener);
};

export const onProjectCreate = (listener: requester.Listener) => {
  registerListener(ENDPOINTS.projectsCreate, listener);
};

export const onProjectOpen = (listener: requester.Listener) => {
  registerListener(ENDPOINTS.projectOpen, listener);
};

export const onProjectSave = (listener: requester.Listener) => {
  registerListener(ENDPOINTS.projectSave, listener);
};

export const onImportFile = (listener: requester.Listener) => {
  registerListener(ENDPOINTS.importFile, listener);
};

export const onPreferencesCreate = (listener: requester.Listener) => {
  registerListener(ENDPOINTS.preferencesCreate, listener);
};

export const onPreferencesOpen = (listener: requester.Listener) => {
  registerListener(ENDPOINTS.preferencesOpen, listener);
};

export default {
  onProjectCreate,
  onProjectOpen,
  onProjectSave,
  onImportFile,
  onPreferencesCreate,
  onPreferencesOpen,
};

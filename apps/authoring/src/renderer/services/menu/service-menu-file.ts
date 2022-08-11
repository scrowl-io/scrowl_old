import { requester } from '..';
import { MenuEventsFileApi } from '../../../main/services/menu';

export const ENDPOINTS: MenuEventsFileApi = {
  projectsCreate: '/projects/create',
  projectOpen: '/projects/open',
  projectSave: '/projects/save',
  importFile: 'menu/project/import',
};

const registerListener = (
  endpoint: typeof ENDPOINTS[keyof typeof ENDPOINTS],
  listener: requester.Listener
) => {
  requester.on(endpoint, listener);
};

export const onProjectNew = (listener: requester.Listener) => {
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

export default {
  onProjectNew,
  onProjectOpen,
  onProjectSave,
  onImportFile,
};

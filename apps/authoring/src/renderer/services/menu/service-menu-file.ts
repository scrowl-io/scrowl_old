import { requester } from '..';
import { MenuEventsFileApi } from '../../../main/services/menu';

export const ENDPOINTS: MenuEventsFileApi = {
  projectNew: 'menu/project/new',
  projectOpen: 'menu/project/open',
  projectSave: 'menu/project/save',
  projectSaveAs: 'menu/project/save-as',
  importFile: 'menu/project/import',
  preferencesOpen: 'menu/preferences/open',
};

const registerListener = (
  endpoint: typeof ENDPOINTS[keyof typeof ENDPOINTS],
  listener: requester.Listener
) => {
  requester.on(endpoint, listener);
};

export const onProjectNew = (listener: requester.Listener) => {
  registerListener(ENDPOINTS.projectNew, listener);
};

export const onProjectOpen = (listener: requester.Listener) => {
  registerListener(ENDPOINTS.projectOpen, listener);
};

export const onProjectSave = (listener: requester.Listener) => {
  registerListener(ENDPOINTS.projectSave, listener);
};

export const onProjectSaveAs = (listener: requester.Listener) => {
  registerListener(ENDPOINTS.projectSaveAs, listener);
};

export const onImportFile = (listener: requester.Listener) => {
  registerListener(ENDPOINTS.importFile, listener);
};

export const onPreferencesOpen = (listener: requester.Listener) => {
  registerListener(ENDPOINTS.preferencesOpen, listener);
};

export default {
  onProjectNew,
  onProjectOpen,
  onProjectSave,
  onProjectSaveAs,
  onImportFile,
  onPreferencesOpen,
};

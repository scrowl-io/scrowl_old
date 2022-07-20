import { requester } from '..';
import { MenuEventsFileApi } from '../../../main/services/menu'

export const ENDPOINTS:MenuEventsFileApi = {
  projectNew: 'menu/project/new',
  projectSave: 'menu/project/save',
  projectSaveAs: 'menu/project/save',
  importFile: 'menu/project/import',
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

export const onProjectSave = (listener: requester.Listener) => {
  registerListener(ENDPOINTS.projectSave, listener);
};

export const onProjectSaveAs = (listener: requester.Listener) => {
  registerListener(ENDPOINTS.projectSaveAs, listener);
};

export const onImportFile = (listener: requester.Listener) => {
  registerListener(ENDPOINTS.importFile, listener);
};

export default {
  onProjectNew,
  onProjectSave,
  onProjectSaveAs,
  onImportFile,
}
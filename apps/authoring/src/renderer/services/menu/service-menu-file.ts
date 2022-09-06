import { requester } from '..';
import { MenuEventsFileApi } from '../../../main/services/menu';

export const ENDPOINTS: MenuEventsFileApi = {
  projectsCreate: '/projects/create',
  projectOpen: '/projects/open',
  projectSave: '/projects/save',
  importFile: 'menu/project/import',
  importTemplate: '/templates/import',
  projectPublish: '/projects/publish',
  importFile: 'project/import-file',
  preferencesCreate: '/preferences/create',
  preferencesOpen: '/preferences/open',
  getStarted: '/get-started',
};

const registerListener = (
  endpoint: typeof ENDPOINTS[keyof typeof ENDPOINTS],
  listener: requester.Listener
) => {
  requester.on(endpoint, listener);
};

export const onProjectCreate = (listener: requester.Listener) => {
  requester.on(ENDPOINTS.projectsCreate, listener);
};

export const offProjectCreate = () => {
  requester.offAll(ENDPOINTS.projectsCreate);
};

export const onProjectOpen = (listener: requester.Listener) => {
  requester.on(ENDPOINTS.projectOpen, listener);
};

export const offProjectOpen = () => {
  requester.offAll(ENDPOINTS.projectOpen);
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

export const offPreferencesOpen = () => {
  requester.offAll(ENDPOINTS.preferencesOpen);
};

export const onGetStarted = (listener: requester.Listener) => {
  requester.on(ENDPOINTS.getStarted, listener);
};

export const offGetStarted = () => {
  requester.offAll(ENDPOINTS.getStarted);
};

export const onImportTemplate = (listener: requester.Listener) => {
  registerListener(ENDPOINTS.importTemplate, listener);
};

export default {
  onProjectCreate,
  onProjectOpen,
  onProjectSave,
  onImportFile,
  onImportTemplate,
  onPreferencesCreate,
  onPreferencesOpen,
  onGetStarted,
};

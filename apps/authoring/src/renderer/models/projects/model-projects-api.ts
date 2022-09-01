import { ProjectData, ProjectEventApi } from '../../../main/models/projects';
import { requester } from '../../services';

const ENDPOINTS: ProjectEventApi = {
  create: '/projects/create',
  save: '/projects/save',
  open: '/projects/open',
  list: '/projects/list',
  recent: '/projects/list/recent',
  import: 'project/import-file',
  publish: '/projects/publish',
};

export const create = (projectId?: number) => {
  return new Promise<requester.ApiResult>(resolve => {
    try {
      requester.invoke(ENDPOINTS.create, projectId).then(resolve);
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to create project',
        data: {
          trace: e,
        },
      });
    }
  });
};

export const update = (project: ProjectData) => {
  return new Promise<requester.ApiResult>(resolve => {
    try {
      requester.invoke(ENDPOINTS.save, project).then(resolve);
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to update project',
        data: {
          trace: e,
          project,
        },
      });
    }
  });
};

export const open = (projectId: number) => {
  return new Promise<requester.ApiResult>(resolve => {
    try {
      requester.invoke(ENDPOINTS.open, projectId).then(resolve);
    } catch (e) {
      resolve({
        error: true,
        message: `Failed to open: ${projectId}`,
        data: {
          trace: e,
          projectId,
        },
      });
    }
  });
};

export const list = (limit?: number) => {
  return new Promise<requester.ApiResult>(resolve => {
    try {
      requester.invoke(ENDPOINTS.list, limit).then(resolve);
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to list projects',
        data: {
          trace: e,
        },
      });
    }
  });
};

export const publish = (project: ProjectData) => {
  return new Promise<requester.ApiResult>(resolve => {
    try {
      requester.invoke(ENDPOINTS.publish, project).then(resolve);
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to publish',
        data: {
          trace: e,
          project,
        },
      });
    }
  });
};

export default {
  ENDPOINTS,
  create,
  update,
  open,
  list,
  publish,
};

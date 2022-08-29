import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Menu, State, requester } from '../../services';
import * as api from './model-projects-api';
import * as state from './model-projects-state';
import { ProjectData } from './model-projects.types';

const defaultRoute = '/editor';
const processor: State.StateProcessor = {};

export const useInit = () => {
  const isInit = useSelector(
    (state: State.RootState) => state.preferences.isInit
  );
  const isProcessing = useProcessing();
  const dispatch = useDispatch();
  const data = useData();

  if (isProcessing || isInit) {
    return isInit;
  }

  dispatch(state.process(true));

  processor.dispatch = dispatch;
  processor.isProcessing = isProcessing;
  processor.data = data;

  Menu.File.onProjectCreate(() => {
    create();
  });

  Menu.File.onProjectOpen(() => {
    dispatch(state.toggleExplorer(true));
  });

  Menu.File.onProjectPublish(() => {
    publish(data);
  });

  toggleMenuItems().then(toggleRes => {
    if (toggleRes.error) {
      console.error(toggleRes);
      return;
    }

    dispatch(state.init(true));
  });

  return isInit;
};

export const useData = () => {
  return useSelector((state: State.RootState) => state.projects.data);
};

export const useProcessing = () => {
  return useSelector((state: State.RootState) => state.projects.isProcessing);
};

export const useOpen = (to = '/editor') => {
  const navigator = useNavigate();

  navigator(to);
};

export const useExplorer = () => {
  return useSelector(
    (state: State.RootState) => state.projects.isExplorerModelOpen
  );
};

export const useSave = () => {
  const data = useData();
  const isSaveable = useSelector(
    (state: State.RootState) => state.projects.isSaveable
  );
  const isListeningSave = useSelector(
    (state: State.RootState) => state.projects.isListeningSave
  );

  const hasProcessor = checkProcessor();

  if (!hasProcessor) {
    console.error('projects processor not set');
    return isSaveable;
  }

  if (isListeningSave || !isSaveable || !data || !data.id) {
    return isSaveable;
  }

  Menu.File.onProjectSave(() => {
    console.log('updating');
    update(data);
  });

  setTimeout(() => {
    processor.dispatch(state.listeningSave(true));
  }, 0);

  return isSaveable;
};

const checkProcessor = () => {
  if (!processor.dispatch) {
    console.error('projects processor not set');
    return false;
  }

  if (processor.isProcessing) {
    console.warn('projects update in progress...');
    return false;
  }

  return true;
};

const toggleMenuItems = (isEnabled = false) => {
  return new Promise<requester.ApiResult>(resolve => {
    try {
      let changes = [];

      if (isEnabled) {
        changes = [
          Menu.Global.disable(Menu.Global.ITEMS.projectsCreate),
          Menu.Global.disable(Menu.Global.ITEMS.projectOpen),
          Menu.Global.enable(Menu.Global.ITEMS.projectSave),
          Menu.Global.enable(Menu.Global.ITEMS.projectPublish),
          Menu.Global.enable(Menu.Global.ITEMS.importFile),
        ];
      } else {
        changes = [
          Menu.Global.enable(Menu.Global.ITEMS.projectsCreate),
          Menu.Global.enable(Menu.Global.ITEMS.projectOpen),
          Menu.Global.disable(Menu.Global.ITEMS.projectSave),
          Menu.Global.disable(Menu.Global.ITEMS.projectPublish),
          Menu.Global.disable(Menu.Global.ITEMS.importFile),
        ];
      }

      Promise.allSettled(changes).then(() => {
        resolve({
          error: false,
          data: {
            state: isEnabled,
          },
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to change menu items state',
        data: {
          trace: e,
        },
      });
    }
  });
};

export const create = (projectId?: number) => {
  const hasProcessor = checkProcessor();

  if (!hasProcessor) {
    return;
  }

  processor.dispatch(state.process(true));

  api.create(projectId).then(result => {
    if (result.error) {
      console.error(result);
      return;
    }

    toggleMenuItems(true).then(toggleResult => {
      if (toggleResult.error) {
        console.error(toggleResult);
        return;
      }

      processor.dispatch(state.update(result.data.project));
      processor.dispatch(state.saveable(true));
      processor.dispatch(state.process(false));

      if (processor.navigator) {
        processor.navigator(defaultRoute);
      }
    });
  });
};

export const open = (projectId: number) => {
  const hasProcessor = checkProcessor();

  if (!hasProcessor) {
    return;
  }

  processor.dispatch(state.process(true));

  api.open(projectId).then(result => {
    if (result.error) {
      console.error(result);
      return;
    }

    toggleMenuItems(true).then(toggleResult => {
      if (toggleResult.error) {
        console.error(toggleResult);
        return;
      }

      processor.dispatch(state.update(result.data.project));
      processor.dispatch(state.saveable(true));
      processor.dispatch(state.process(false));

      if (processor.navigator) {
        processor.navigator(defaultRoute);
      }
    });
  });
};

export const update = (data: ProjectData) => {
  const hasProcessor = checkProcessor();

  if (!hasProcessor) {
    return;
  }

  processor.dispatch(state.process(true));
  api.update(data).then(result => {
    if (result.error) {
      console.error(result);
      return;
    }

    processor.dispatch(state.update(result.data.project));
    processor.dispatch(state.process(false));
  });
};

export const publish = (data: ProjectData) => {
  const hasProcessor = checkProcessor();

  if (!hasProcessor) {
    return;
  }

  processor.dispatch(state.process(true));
  api.publish(data).then(result => {
    if (result.error) {
      console.error(result);
      return;
    }

    processor.dispatch(state.update(result.data.project));
    processor.dispatch(state.process(false));
  });
};

export const list = (limit = 10) => {
  return new Promise<requester.ApiResult>(resolve => {
    const hasProcessor = checkProcessor();

    if (!hasProcessor) {
      resolve({
        error: true,
        message: 'Project processor not set',
      });
      return;
    }

    processor.dispatch(state.process(true));
    api.list(limit).then(result => {
      if (result.error) {
        console.error(result);
        return;
      }

      resolve(result);
      processor.dispatch(state.process(false));
    });
  });
};

export default {
  useInit,
  useData,
  useProcessing,
  useOpen,
  create,
  update,
  publish,
  list,
};

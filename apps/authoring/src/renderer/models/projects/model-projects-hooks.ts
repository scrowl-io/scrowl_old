import { useEffect } from 'react';
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

  toggleMenuItems().then(toggleRes => {
    if (toggleRes.error) {
      console.error(toggleRes);
      return;
    }

    dispatch(state.init(true));
  });

  return isInit;
};

export const closeExplorer = () => {
  return processor.dispatch(state.explore(false));
};

export const useData = () => {
  return useSelector((state: State.RootState) => state.projects.data);
};

export const useProcessing = () => {
  return useSelector((state: State.RootState) => state.projects.isProcessing);
};

export const useOpen = () => {
  processor.navigator = useNavigate();
};

export const useExplorer = () => {
  return useSelector((state: State.RootState) => state.projects.isExploring);
};

export const useLoaded = () => {
  return useSelector((state: State.RootState) => state.projects.isLoaded);
};

export const useMenuEvents = () => {
  const data = useData();
  const isLoaded = useSelector(
    (state: State.RootState) => state.projects.isLoaded
  );
  const isMenuReady = useSelector(
    (state: State.RootState) => state.projects.isMenuReady
  );
  const handleCreateEvent = () => {
    create();
  };
  const handleExploreEvent = () => {
    explore();
  };

  useEffect(() => {
    const hasProcessor = checkProcessor();
    const handleSaveEvent = () => {
      save(data);
    };
    const handlePublishEvent = () => {
      publish(data);
    };

    if (!isLoaded) {
      Menu.File.onProjectCreate(handleCreateEvent);
      Menu.File.onProjectOpen(handleExploreEvent);

      if (hasProcessor) {
        processor.dispatch(state.menuReady(true));
      }
    }

    if (isMenuReady) {
      Menu.File.onProjectSave(handleSaveEvent);
      Menu.File.onProjectPublish(handlePublishEvent);
    }

    return () => {
      Menu.File.offProjectCreate();
      Menu.File.offProjectOpen();

      if (isMenuReady) {
        Menu.File.offProjectSave();
        Menu.File.offProjectPublish();
      }
    };
  }, [isMenuReady, isLoaded, data]);

  return isMenuReady;
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
          Menu.Global.enable(Menu.Global.ITEMS.projectSave),
          Menu.Global.enable(Menu.Global.ITEMS.projectPublish),
          Menu.Global.enable(Menu.Global.ITEMS.importFile),
          Menu.Global.enable(Menu.Global.ITEMS.templateAdd),
          Menu.Global.enable(Menu.Global.ITEMS.templateOpen),
        ];
      } else {
        changes = [
          Menu.Global.disable(Menu.Global.ITEMS.projectSave),
          Menu.Global.disable(Menu.Global.ITEMS.projectPublish),
          Menu.Global.disable(Menu.Global.ITEMS.importFile),
          Menu.Global.disable(Menu.Global.ITEMS.templateAdd),
          Menu.Global.disable(Menu.Global.ITEMS.templateOpen),
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
      processor.dispatch(state.loaded(true));
      processor.dispatch(state.process(false));

      if (processor.navigator) {
        processor.navigator(defaultRoute);
      }
    });
  });
};

export const explore = (open = true) => {
  const hasProcessor = checkProcessor();

  if (!hasProcessor) {
    return;
  }

  setTimeout(() => {
    processor.dispatch(state.explore(open));
  }, 1);
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
      processor.dispatch(state.loaded(true));
      processor.dispatch(state.process(false));
      closeExplorer();

      if (processor.navigator) {
        processor.navigator(defaultRoute);
      }
    });
  });
};

export const save = (data: ProjectData) => {
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

let updateTimer: ReturnType<typeof setTimeout>;

export const update = (data: ProjectData, autoSave = false) => {
  if (!processor.dispatch) {
    console.error('preference processor not set!');
    return;
  }

  if (processor.isProcessing) {
    console.warn('preference update in progress...');
    return;
  }

  if (!autoSave) {
    if (updateTimer) {
      clearTimeout(updateTimer);
    }

    // delay update until changes have been completed
    updateTimer = setTimeout(() => {
      // ensure update is non-blocking
      window.requestAnimationFrame(() => {
        processor.dispatch(state.update(data));
      });
    }, 250);
  } else {
    save(data);
  }
};

export const publish = (data: ProjectData) => {
  return new Promise<requester.ApiResult>((resolve, reject) => {
    const hasProcessor = checkProcessor();

    if (!hasProcessor) {
      return;
    }

    processor.dispatch(state.process(true));

    api
      .publish(data)
      .then(result => {
        if (!result.error && !result.data.canceled) {
          processor.dispatch(state.update(result.data.project));
        }

        processor.dispatch(state.process(false));
        resolve(result);
      })
      .catch(error => {
        reject({
          error: true,
          message: error.message,
          data: {
            trace: error,
          },
        });
      });
  });
};

export const list = (limit = 100) => {
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

export const listRecent = (limit = 10) => {
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
    api.listRecent(limit).then(result => {
      if (result.error) {
        console.error(result);
        return;
      }

      resolve(result);
      processor.dispatch(state.process(false));
    });
  });
};

export const reset = () => {
  const hasProcessor = checkProcessor();

  if (!hasProcessor) {
    return;
  }

  processor.dispatch(state.reset({}));
};

export default {
  useInit,
  useData,
  useProcessing,
  useOpen,
  useMenuEvents,
  useLoaded,
  create,
  explore,
  save,
  publish,
  list,
  listRecent,
  reset,
};

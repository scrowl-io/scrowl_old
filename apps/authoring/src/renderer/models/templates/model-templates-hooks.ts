import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, State, requester } from '../../services';
import * as api from './model-templates-api';
import * as state from './model-templates-state';

const processor: State.StateProcessor = {};

export const useInit = () => {
  const isInit = useSelector(
    (state: State.RootState) => state.templates.isInit
  );
  const isProcessing = useProcessing();
  const dispatch = useDispatch();

  if (isProcessing || isInit) {
    return isInit;
  }

  dispatch(state.process(true));

  setTimeout(() => {
    dispatch(state.init(true));
  });

  processor.dispatch = dispatch;
  processor.isProcessing = isProcessing;
  return isInit;
};

export const useData = () => {
  return useSelector((state: State.RootState) => state.templates.data);
};

export const useProcessing = () => {
  return useSelector((state: State.RootState) => state.templates.isProcessing);
};

export const useExplorer = () => {
  return useSelector((state: State.RootState) => state.templates.isExploring);
};

const checkProcessor = () => {
  if (!processor.dispatch) {
    console.error('templates processor not set');
    return false;
  }

  if (processor.isProcessing) {
    console.warn('templates update in progress...');
    return false;
  }

  return true;
};

export const useMenuEvents = () => {
  const handleAddEvent = () => {
    add();
  };
  const handleExploreEvent = () => {
    explore();
  };

  useEffect(() => {
    Menu.File.onTemplateAdd(handleAddEvent);
    Menu.File.onTemplateOpen(handleExploreEvent);

    return () => {
      Menu.File.offTemplateAdd();
      Menu.File.offTemplateOpen();
    };
  }, []);

  return;
};

export const add = () => {
  return api.add();
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

export const closeExplorer = () => {
  return processor.dispatch(state.explore(false));
};

export const list = (limit = 10) => {
  return new Promise<requester.ApiResult>(resolve => {
    const hasProcessor = checkProcessor();

    if (!hasProcessor) {
      resolve({
        error: true,
        message: 'Templates processor not set',
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

export const load = () => {
  return api.load();
};

export default {
  useInit,
  useData,
  useProcessing,
  useExplorer,
  add,
  explore,
  closeExplorer,
  list,
  load,
};

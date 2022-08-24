import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Menu, State } from '../../services';
import * as api from './model-preferences-api';
import * as state from './model-preferences-state';
import { PreferenceData } from './model-preferences.types';

export const useData = () => {
  return useSelector((state: State.RootState) => state.preferences.data);
};

export const useProcessing = () => {
  return useSelector(
    (state: State.RootState) => state.preferences.isProcessing
  );
};

export const useOpen = (to = '/settings/theme') => {
  const navigator = useNavigate();

  Menu.File.onPreferencesOpen(() => {
    navigator(to);
  });
};

const processor: State.StateProcessor = {};

export const useInit = () => {
  const isInit = useSelector(
    (state: State.RootState) => state.preferences.isInit
  );
  const isProcessing = useProcessing();
  const dispatch = useDispatch();

  processor.dispatch = dispatch;
  processor.isProcessing = isProcessing;

  if (isProcessing || isInit) {
    return isInit;
  }

  dispatch(state.process(true));

  api.get().then(result => {
    if (result.error) {
      console.error(result);
      return;
    }

    dispatch(state.update(result.data.preference));
    dispatch(state.process(false));
    dispatch(state.init(true));
  });

  return isInit;
};

export const save = (data: PreferenceData) => {
  if (!processor.dispatch) {
    console.error('preference processor not set!');
    return;
  }

  if (processor.isProcessing) {
    console.warn('preference update in progress...');
    return;
  }

  processor.dispatch(state.process(true));

  api.update(data).then(result => {
    if (result.error) {
      console.error(result);
      return;
    }

    processor.dispatch(state.update(result.data.preferences));
    processor.dispatch(state.process(false));
  });
};

export const update = (data: PreferenceData, autoSave = false) => {
  if (!processor.dispatch) {
    console.error('preference processor not set!');
    return;
  }

  if (processor.isProcessing) {
    console.warn('preference update in progress...');
    return;
  }

  if (!autoSave) {
    processor.dispatch(state.update(data));
  } else {
    save(data);
  }
};

export default {
  useData,
  useProcessing,
  useOpen,
  useInit,
  save,
  update,
};

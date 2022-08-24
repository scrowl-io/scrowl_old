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

export const useInit = () => {
  const isInit = useSelector(
    (state: State.RootState) => state.preferences.isInit
  );
  const data = useData();
  const isProcessing = useProcessing();
  const dispatch = useDispatch();

  if (isProcessing || Object.keys(data).length) {
    return isInit;
  }

  dispatch(state.process(true));

  api.get().then(result => {
    if (result.error) {
      console.error(result);
      return;
    }

    dispatch(state.update(result.data.preferences));
    dispatch(state.process(false));
    dispatch(state.init(true));
  });

  return isInit;
};

export const useUpdate = (data: PreferenceData) => {
  const dispatch = useDispatch();

  dispatch(state.process(true));

  api.update(data).then(result => {
    if (result.error) {
      console.error(result);
      return;
    }

    dispatch(state.update(result.data.preferences));
    dispatch(state.process(false));
  });
};

export default {
  useData,
  useProcessing,
  useOpen,
  useInit,
  useUpdate,
};

import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../services';
import * as state from './page-editor-state';
import { Projects } from '../../models';

const processor: State.StateProcessor = {};

export const useInit = () => {
  const isInit = useSelector(
    (state: State.RootState) => state.preferences.isInit
  );
  const dispatch = useDispatch();

  if (isInit) {
    return isInit;
  }

  setTimeout(() => {
    dispatch(state.init(true));
  }, 1);

  processor.dispatch = dispatch;
  return isInit;
};

export const useActiveSlide = () => {
  return useSelector((state: State.RootState) => state.editor.activeSlide);
};

export const updateActiveSlide = (data: Projects.ProjectSlide) => {
  processor.dispatch(state.updateSlide(data));
};

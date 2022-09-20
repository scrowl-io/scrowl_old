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
  processor.dispatch = dispatch;

  if (isInit) {
    return isInit;
  }

  setTimeout(() => {
    dispatch(state.init(true));
  }, 1);

  return isInit;
};

export const useCurrentlyLoadedSlide = () => {
  return useSelector(
    (state: State.RootState) => state.editor.currentlyLoadedSlide
  );
};

export const updateCurrentlyLoadedSlide = (slideData: Projects.ProjectSlide) => {
  processor.dispatch(state.updateCurrentlyLoadedSlide(slideData));
};

export const useActiveSlide = () => {
  return useSelector((state: State.RootState) => state.editor.activeSlide);
};

export const updateActiveSlide = (slideData: Projects.ProjectSlide) => {
  processor.dispatch(state.updateSlide(slideData));
};

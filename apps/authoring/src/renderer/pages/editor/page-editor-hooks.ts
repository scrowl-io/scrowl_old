import { useSelector, useDispatch } from 'react-redux';
import { SlidePosition } from './page-editor.types';
import { State } from '../../services';
import * as state from './page-editor-state';
import { Projects, Templates } from '../../models';

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

export const useActiveSlide = () => {
  return useSelector((state: State.RootState) => state.editor.activeSlide);
};

export const useActiveSlidePosition = () => {
  return useSelector(
    (state: State.RootState) => state.editor.activeSlidePosition
  );
};

export const updateActiveSlide = (
  slideData: Partial<Projects.ProjectSlide>,
  position?: SlidePosition
) => {
  processor.dispatch(state.updateSlide(slideData));

  if (!position) {
    return;
  }

  processor.dispatch(state.updateSlidePosition(position));
};

export const updateActiveSlidePosition = (position: Partial<SlidePosition>) => {
  processor.dispatch(state.updateSlidePosition(position));
};

export const updateActiveSlideTemplate = (
  template: Templates.TemplateManifest
) => {
  processor.dispatch(state.updateActiveSlideTemplate(template));
};

export const useHasActiveSlide = () => {
  return useSelector((state: State.RootState) => state.editor.hasActiveSlide);
};

export const resetActiveSlide = () => {
  if (!processor.dispatch) {
    console.info('preference processor not set!');
    return;
  }

  processor.dispatch(state.resetActiveSlide({}));
};

export default {
  useInit,
  useActiveSlide,
  updateActiveSlide,
  useActiveSlidePosition,
  updateActiveSlidePosition,
  updateActiveSlideTemplate,
  useHasActiveSlide,
  resetActiveSlide,
};

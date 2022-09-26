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

export const useEditSlideRef = () => {
  return useSelector((state: State.RootState) => state.editor.editSlideRef);
};

export const updateEditSlideRef = (slideData: Projects.ProjectSlide) => {
  processor.dispatch(state.updateEditSlideRef(slideData));
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
  position: SlidePosition
) => {
  processor.dispatch(state.updateEditSlideRef(slideData));
  processor.dispatch(state.updateSlide(slideData));
  processor.dispatch(state.updateSlidePosition(position));
};

export const updateActiveSlideTemplate = (
  template: Templates.TemplateManifest
) => {
  processor.dispatch(state.updateActiveSlideTemplate(template));
};

export const updateEditSlideRefTemplate = (
  template: Templates.TemplateManifest
) => {
  processor.dispatch(state.updateEditSlideRefTemplate(template));
};

export const useHasActiveSlide = () => {
  return useSelector((state: State.RootState) => state.editor.hasActiveSlide);
};

export default {
  useInit,
  useEditSlideRef,
  updateEditSlideRef,
  useActiveSlide,
  useActiveSlidePosition,
  updateActiveSlide,
  updateActiveSlideTemplate,
  updateEditSlideRefTemplate,
  useHasActiveSlide,
};

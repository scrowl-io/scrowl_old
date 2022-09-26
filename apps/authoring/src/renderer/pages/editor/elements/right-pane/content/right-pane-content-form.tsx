import React from 'react';
import { SlidePosition } from '../../../page-editor.types';
import { Projects } from '../../../../../models';
import { FormBuilder, FormBuilderCommons } from '../../../../../components';
import { deepCopy } from './utils';
import {
  updateActiveSlide,
  useEditSlideRef,
  updateEditSlideRef,
  useActiveSlidePosition,
} from '../../../page-editor-hooks';
import { ProjectSlide } from '../../../../../../main/models/projects';

export type ContentFormProps = {
  activeSlide: ProjectSlide;
};

export const RightPaneContentForm = () => {
  const project = Projects.useData();
  const slideRef = useEditSlideRef();
  const modules = deepCopy(project.modules);
  const position: SlidePosition = useActiveSlidePosition();

  const handleOnSubmit = () => {
    if (
      position.moduleIdx === -1 ||
      position.lessonIdx === -1 ||
      position.slideIdx === -1
    ) {
      console.error('Active slide position not set', position);
      return;
    }

    const module = modules[position.moduleIdx];

    if (!module || !module.lessons.length) {
      console.error('Unable to find active slide module', position, modules);
      return;
    }

    const lesson = module.lessons[position.lessonIdx];

    if (!lesson || !lesson.slides.length) {
      console.error('Unable to find active slide lesson', position, modules);
      return;
    }

    let slide = lesson.slides[position.slideIdx];

    if (!slide) {
      console.error('Unable to find active slide', position, modules);
      return;
    }

    slide = Object.assign(slide, slideRef);
    updateActiveSlide(slide, position);
    Projects.update({ modules });
  };

  const handleOnUpdate = (data: FormBuilderCommons['formData']) => {
    const slide = deepCopy(slideRef);

    slide.template.elements = Object.assign(slide.template.elements, data);
    updateEditSlideRef(slide);

    const targetFrame = document.getElementById(
      'template-iframe'
    ) as HTMLIFrameElement;

    if (!targetFrame || !targetFrame.contentWindow) {
      return;
    }

    targetFrame.contentWindow.postMessage(
      { updateManifest: slide.template },
      '*'
    );
  };

  if (
    !slideRef.template ||
    !slideRef.template.elements ||
    !Object.keys(slideRef.template.elements).length
  ) {
    return <></>;
  }

  return (
    <div>
      <FormBuilder
        name={slideRef.name}
        formData={slideRef.template.elements}
        onUpdate={handleOnUpdate}
        onSubmit={handleOnSubmit}
      />
    </div>
  );
};

export default {
  RightPaneContentForm,
};

import React from 'react';
import { Projects } from '../../../../../models';
import { FormBuilder, FormBuilderCommons } from '../../../../../components';
import { deepCopy } from './utils';
import { updateActiveSlide } from '../../../page-editor-hooks';
import {
  ProjectLesson,
  ProjectModule,
  ProjectSlide,
} from '../../../../../../main/models/projects';

export type ContentFormProps = {
  activeSlide: ProjectSlide;
};

export const RightPaneContentForm = ({ activeSlide }: ContentFormProps) => {
  const slideData = deepCopy(activeSlide);
  const project = Projects.useData();
  const modules = deepCopy(project.modules);

  const getTargetSlide = () => {
    let targetSlide: ProjectSlide | undefined;
    modules.map((module: ProjectModule) => {
      if (targetSlide === undefined) {
        module.lessons.map((lesson: ProjectLesson) => {
          if (targetSlide === undefined) {
            lesson.slides.map((slide: ProjectSlide) => {
              if (slide.id === slideData.id) {
                targetSlide = slide;
                return;
              }
            });
          }
        });
      }
    });
    return targetSlide;
  };

  const handleOnSubmit = () => {
    const targetSlide = getTargetSlide();

    if (!targetSlide || targetSlide === null || targetSlide === undefined) {
      console.error('No target slide match');
      return;
    } else if (targetSlide.template) {
      Object.assign(
        targetSlide.template.elements,
        slideData.template?.elements
      );
    }

    Projects.update({ modules });
  };

  const handleOnUpdate = (data: FormBuilderCommons['formData']) => {
    if (slideData.template) {
      slideData.template.elements = Object.assign(
        slideData.template.elements,
        data
      );
    }

    updateActiveSlide(slideData);
  };

  if (!activeSlide.template) {
    return <></>;
  }

  return (
    <div>
      <FormBuilder
        name={activeSlide.name}
        formData={activeSlide.template.elements}
        onUpdate={handleOnUpdate}
        onSubmit={handleOnSubmit}
      />
    </div>
  );
};

export default {
  RightPaneContentForm,
};

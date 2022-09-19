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
    const moduleID: number | undefined = activeSlide.moduleID;
    const lessonID: number | undefined = activeSlide.lessonID;
    const slideID: number | undefined = activeSlide.id;

    if (moduleID && lessonID) {
      const targetLesson = modules[moduleID - 1].lessons.find(
        (lesson: ProjectLesson) => {
          return lesson.id === lessonID;
        }
      );

      const targetSlide = targetLesson.slides.find((slide: ProjectSlide) => {
        return slide.id === slideID;
      });
      return targetSlide;
    }
  };

  const handleOnSubmit = () => {
    const targetSlide = getTargetSlide();

    if (!targetSlide || targetSlide === null || targetSlide === undefined) {
      console.error('No target slide match');
      return;
    }
    Object.assign(targetSlide.template.elements, slideData.template?.elements);

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

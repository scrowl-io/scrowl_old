import React from 'react';
import { Projects } from '../../../../../models';
import { FormBuilder, FormBuilderCommons } from '../../../../../components';
import { deepCopy } from './utils';
import { updateActiveSlide } from '../../../page-editor-hooks';
import {
  LessonTreeItem,
  ModuleTreeItem,
  SlideTreeItem,
} from '../../pane-details/elements/tree-view';

export type ContentFormProps = {
  activeSlide: Projects.ProjectSlide;
};

export const RightPaneContentForm = ({ activeSlide }: ContentFormProps) => {
  const slideData = deepCopy(activeSlide);
  const project = Projects.useData();
  const modules = deepCopy(project.modules);

  const getTargetSlide = () => {
    let targetSlide;
    modules.map((module: ModuleTreeItem) => {
      module.lessons.map((lesson: LessonTreeItem) => {
        lesson.slides.map((slide: SlideTreeItem) => {
          if (slide.name === activeSlide.name) {
            console.log(slide);
            targetSlide = slide;
          }
        });
      });
    });
    if (targetSlide !== undefined) {
      return targetSlide as Projects.ProjectSlide;
    }
  };

  const handleOnSubmit = () => {
    const targetSlide = getTargetSlide();

    if (!targetSlide || targetSlide === null) {
      console.error('No target slide match');
      return;
    } else if (targetSlide.template) {
      Object.assign(
        targetSlide.template.elements,
        activeSlide.template?.elements
      );
    }

    Projects.update({ modules });
  };

  const handleOnUpdate = (data: FormBuilderCommons['formData']) => {
    slideData.template.elements = Object.assign(
      slideData.template.elements,
      data
    );

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

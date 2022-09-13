import React, { useEffect } from 'react';
import { Projects } from '../../../../../models';
import { FormBuilder, FormBuilderCommons } from '../../../../../components';
import { deepCopy } from './utils';
import { updateActiveSlide } from '../../../page-editor-hooks';

export type ContentFormProps = {
  activeSlide: Projects.ProjectSlide;
};

export const RightPaneContentForm = ({ activeSlide }: ContentFormProps) => {
  const slide = deepCopy(activeSlide);
  const project = Projects.useData();
  const modules = deepCopy(project.modules);

  const getTargetSlide = () => {
    let targetSlide;
    modules.map((module: any) => {
      module.lessons.map((lesson: any) => {
        lesson.slides.map((slide: any) => {
          if (slide.name === activeSlide.name) {
            targetSlide = slide;
          }
        });
      });
    });
    if (targetSlide != undefined) {
      return targetSlide as Projects.ProjectSlide;
    }
  };

  const handleOnSubmit = () => {
    const targetSlide = getTargetSlide();

    if (!targetSlide || targetSlide == null) {
      console.error('No target slide match');
      return;
    } else if (targetSlide.template) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      Object.entries(targetSlide.template.elements).map(targetElement => {
        if (activeSlide.template) {
          Object.entries(activeSlide.template.elements).map(activeElement => {
            if (targetElement[1].label === activeElement[1].label) {
              targetElement[1].value = activeElement[1].value;
            }
          });
        }
      });
    }

    Projects.update({ modules });
  };

  const handleOnUpdate = (data: FormBuilderCommons['formData']) => {
    slide.template.elements = Object.assign(slide.template.elements, data);

    updateActiveSlide(slide);
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

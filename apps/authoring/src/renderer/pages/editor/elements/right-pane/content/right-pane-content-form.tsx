import React from 'react';
import { Projects } from '../../../../../models';
import { FormBuilder, FormBuilderCommons } from '../../../../../components';
import { deepCopy } from './utils';
import { updateActiveSlide } from '../../../page-editor-hooks';

export type ContentFormProps = {
  activeSlide: Projects.ProjectSlide;
};

export const RightPaneContentForm = ({ activeSlide }: ContentFormProps) => {
  const slide = deepCopy(activeSlide);
  const handleOnSubmit = () => {
    console.log('submitting');
  };

  const handleOnUpdate = (data: FormBuilderCommons['formData']) => {
    slide.template.elements = Object.assign(slide.template.elements, data);

    updateActiveSlide(slide);
  };

  if (!activeSlide.template) {
    return <></>;
  }

  console.log('active slide', activeSlide);

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

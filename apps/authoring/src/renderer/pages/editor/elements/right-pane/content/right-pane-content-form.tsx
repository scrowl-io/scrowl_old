import React, { useState } from 'react';
import { Projects } from '../../../../../models';
import { GeneratedForm } from '../../../../../components/formBuilder';

export const RightPaneContentForm = ({ activeSlide }: any) => {
  const project = Projects.useData();
  const formTemplate = project.modules[0].lessons[0].slides[0].template;

  const [formData, setFormData] = useState({ ...formTemplate.elements });

  return (
    <div>
      <GeneratedForm formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default {
  RightPaneContentForm,
};

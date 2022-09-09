import React, { useState } from 'react';
import { Projects } from '../../../../../models';
import { GeneratedForm } from '../../../../../components/formBuilder';

export const RightPaneContentForm = () => {
  const project = Projects.useData();
  const formTemplate = project.modules[0].lessons[0].slides[0].template;

  return (
    <div>
      <GeneratedForm {...formTemplate} />
    </div>
  );
};

export default {
  RightPaneContentForm,
};

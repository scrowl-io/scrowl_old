import React from 'react';
import { Accordion } from '@owlui/lib';
import { Projects } from '../../../../../models';

export type PublishDrawerContentProps = {
  project: Projects.ProjectData;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deepCopy = (obj?: any) => {
  if (!obj) {
    return;
  }

  return JSON.parse(JSON.stringify(obj));
};

export const PublishDrawerFormSettings = ({
  project,
}: PublishDrawerContentProps) => {
  const scormConfig = deepCopy(project.scormConfig || {});
  const handleInputChange = (
    ev: React.FormEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = ev.currentTarget;
    const prop = target.name;
    const value = target.value;

    scormConfig[prop] = value;
    Projects.update({ scormConfig });
  };

  return (
    <>
      <div className="mb-2">
        <label htmlFor="publish1" className="form-label">
          Course Name
        </label>
        <input
          type="text"
          name="name"
          className="form-control form-control-sm"
          id="publish1"
          placeholder="Course Name"
          value={scormConfig.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="publish2" className="form-label">
          Course Description
        </label>
        <textarea
          name="description"
          className="form-control form-control-sm"
          id="publish2"
          placeholder="Describe the Project"
          value={scormConfig.description}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="mb-2">
        <label htmlFor="publish3" className="form-label">
          Authors
        </label>
        <input
          type="text"
          name="authors"
          className="form-control form-control-sm"
          id="publish3"
          placeholder="Course Authors"
          value={scormConfig.authors}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};

export const PublishDrawerContent = ({
  project,
}: PublishDrawerContentProps) => {
  const publishAccordion = [
    {
      id: '1',
      label: 'Course Settings',
      view: <PublishDrawerFormSettings project={project} />,
    },
  ];

  return <Accordion items={publishAccordion} alwaysOpen />;
};

export default {
  PublishDrawerContent,
  PublishDrawerFormSettings,
};

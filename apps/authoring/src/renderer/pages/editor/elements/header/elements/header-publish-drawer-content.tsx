import React from 'react';
import { Accordion } from '@owlui/lib';
import { Projects } from '../../../../../models';

export type PublishDrawerContentProps = {
  project: Projects.ProjectData;
};

export const PublishDrawerFormSettings = ({
  project,
}: PublishDrawerContentProps) => {
  const handleInputChange = (
    ev: React.FormEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = ev.currentTarget;
    const name = target.name;
    const value = target.value;
    console.log('input data', name, value);
    // Projects.update({ [target.name]: target.value });
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
          value={project.name}
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
          value={project.description}
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
          value={project.authors}
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

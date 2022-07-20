import React from 'react';
import * as style from './styles.module.scss';
import { NavigationDrawer as Nav } from '@owlui/lib';
import { CourseData } from '../course.types';
import { CourseTemplate } from '../templates/course';

export const PageRoute = '/structure';
export const PageName = 'Structure';

export const PageElement = () => {
  const [courseData, setCourseData] =
    React.useState<CourseData>(CourseTemplate);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const newData = { ...courseData };

    newData[e.target.name as keyof typeof courseData] = e.target.value;

    setCourseData(newData);
  };

  const SidebarContent = (
    <>
      <div>
        <h3>Project Settings</h3>
        <div className="field">
          <label className="field__label" htmlFor="project-name">
            Project Name<i aria-hidden="true">*</i>
          </label>
          <input
            className="field__input"
            name="name"
            id="project-name"
            value={courseData['name']}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label className="field__label" htmlFor="project-description">
            Project Description<i aria-hidden="true">*</i>
          </label>
          <textarea
            className="field__input"
            name="description"
            id="project-description"
            onChange={handleChange}
            value={courseData['description']}
          />
        </div>
        <div className="field">
          <label className="field__label" htmlFor="project-authors">
            Authors<i aria-hidden="true">*</i>
          </label>
          <textarea
            className="field__input"
            name="authors"
            id="project-authors"
            onChange={handleChange}
            value={courseData['authors']}
          />
        </div>
        <div className="nav__divider" />
        <div className="field">
          <label className="field__label" htmlFor="project-theme">
            Style Theme<i aria-hidden="true">*</i>
          </label>
          <select
            className="field__input"
            name="theme"
            id="project-theme"
            onChange={handleChange}
            value={courseData['theme']}
          >
            <option value="default">Default</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
    </>
  );

  return (
    <section className={style.structure}>
      <Nav header={SidebarContent} />
      <main></main>
    </section>
  );
};

export default {
  PageRoute,
  PageName,
  PageElement,
};

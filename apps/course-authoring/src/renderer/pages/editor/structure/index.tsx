import React from 'react';
import * as style from './styles.module.scss';
import { Default as Nav } from '@owlui/navigationdrawer';

export const PageRoute = '/structure';
export const PageName = 'Structure';

const SidebarContent = (
  <>
    <div>
      <h3>Project Settings</h3>
      <div className="field">
        <label className="field__label" htmlFor="project-name">
          Project Name<i aria-hidden="true">*</i>
        </label>
        <input className="field__input" id="project-name" type="text" />
      </div>
    </div>
    <div className={style.navDivider} />
  </>
);

export const PageElement = () => {
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

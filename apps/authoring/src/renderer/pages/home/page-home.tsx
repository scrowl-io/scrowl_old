import React from 'react';
import * as styles from './page-home.module.scss';
import { PageNavItems } from './page-home-routes';
import { NavigationBar } from '../../components/navigationbar';
import { Project } from '../../models';

const project = new Project();

export const PageElement = () => {
  project.ready();

  const isProcessing = project.useProcessing();
  // const recentProjects = [];

  return (
    <>
      <NavigationBar pages={PageNavItems} />
      <main className={styles.main}>
        <div>{isProcessing ? <div>WORKING ON IT</div> : ''}</div>
        <h1>Home Page</h1>
        <h2>SCROWL</h2>
        <section className="section-row">
          <div>
            <h3>Start</h3>
            <ul>
              <li>
                <a href="">New Project</a>
              </li>
              <li>
                <a href="">Open</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>Getting Started</h3>
            <ul>
              <li>
                <a href="">Beginner Tutorial Project</a>
              </li>
            </ul>
          </div>
        </section>
        <section className="section-row">
          <div>
            <h3>Recent</h3>
            <ul>
              {/* {recentProjects.map(recentProject => {
                return <li></li>;
              })} */}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};

export default {
  PageElement,
};

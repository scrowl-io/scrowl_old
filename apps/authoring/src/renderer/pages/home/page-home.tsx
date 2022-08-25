import React, { useEffect, useState } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import * as styles from './page-home.module.scss';
import { Logo } from '../../components/logo/comp-logo';
import { PageNavItems } from './page-home-routes';
import { NavigationBar } from '../../components/navigationbar';
import { Project, ProjectData } from '../../models';
import { Icon } from '@owlui/lib';
import { onProjectCreate } from '../../services/menu/service-menu-file';
import { EVENTS } from '../../../main/models/projects/model-projects';

const project = new Project();

export const PageElement = () => {
  project.ready();
  console.log('project model', project);
  const [recentProjects, setProjectList] = useState([]);
  const isProcessing = project.useProcessing();
  const projectModelData = project.useProjectData();

  useEffect(() => {
    project.list(10).then(res => {
      if (res.err) {
        console.warn(res);
        return;
      }

      setProjectList(res.data.projects);
    });
  }, []);

  console.log('recentProjects', recentProjects);

  const handleNewProject = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    const projectBtn = ev.currentTarget;

    if (!projectBtn.dataset.projectId) {
      console.error(`Unable to open project: project id required`);
      return;
    }

    const projectId = parseInt(projectBtn.dataset.projectId);

    project.create(projectId);
  };

  const handleOpenProject = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    const projectBtn = ev.currentTarget;

    if (!projectBtn.dataset.projectId) {
      console.error(`Unable to open project: project id required`);
      return;
    }

    const projectId = parseInt(projectBtn.dataset.projectId);

    if (isNaN(projectId)) {
      console.error(
        `Unable to open project: malformed id - ${projectBtn.dataset.projectId}`
      );
      return;
    }

    project.open(projectId);
  };

  console.log(projectModelData);

  return (
    <>
      <NavigationBar pages={PageNavItems} />
      <main className={styles.main}>
        <div>{isProcessing ? <div>WORKING ON IT</div> : ''}</div>
        <div className="section-title-wrap">
          <Logo />
          <h1 className="section-title">Scrowl Authoring</h1>
        </div>

        <div className="section-row">
          <div>
            <h2 className="section-title">Start</h2>
            <ul>
              <li>
                <button className="section-link" onClick={handleNewProject}>
                  <Icon
                    display="Outlined"
                    icon="library_add"
                    // style={{ fontSize: '2em' }}
                  />
                  New Project...
                </button>
              </li>
              <li>
                <button className="section-link" onClick={handleOpenProject}>
                  <Icon
                    display="Outlined"
                    icon="folder_open"
                    // style={{ fontSize: '2em' }}
                  />
                  Open...
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="section-title">Getting Started</h2>
            <ul>
              <li>
                <button className="section-link">
                  Beginner Tutorial Project...
                </button>
              </li>
            </ul>
          </div>
        </div>

        {recentProjects.length > 0 && (
          <>
            <h2 className="section-title">Recent Projects:</h2>
            <div>
              {recentProjects.map((project: ProjectData, index) => (
                <button
                  className="section-link"
                  key={index}
                  onClick={handleOpenProject}
                  data-project-id={project.id}
                >
                  {project.name}
                </button>
              ))}
              <Link className="section-link" to="">
                More...
              </Link>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default {
  PageElement,
};

/*
      Create a project, see a log message
      After project is created, shut down app and restart
      Then you'll have console log of recent projects, coming from UE
      Get UI into home page screen - then we can add interactivity
      */

import React, { useEffect, useState } from 'react';
import * as styles from './page-home.module.scss';
import { PageNavItems } from './page-home-routes';
import { NavigationBar } from '../../components/navigationbar';
import { Project, ProjectData } from '../../models';
import { ModalOutline } from '../../components/modal/index';
import { ModalDefaultProps } from '@owlui/lib';
const project = new Project();

export const PageElement = () => {
  project.ready();
  console.log('project model', project);
  const [recentProjects, setProjectList] = useState([]);
  const isProcessing = project.useProcessing();
  const projectModelData = project.useData();

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    project.list(10).then(res => {
      if (res.err) {
        console.warn(res);
        return;
      }

      /*
      Create a project, see a log message
      After project is created, shut down app and restart
      Then you'll have console log of recent projects, coming from UE
      Get UI into home page screen - then we can add interactivity
      */

      setProjectList(res.data.projects);
      console.log('recentProjects', res.data.projects);
    });
  }, []);

  const handleOpenModal = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
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

  const testProps = {
    header: {
      content: 'Test Header',
    },
    body: {
      content: 'Test Body',
    },
    footer: {
      content: 'Test Footer',
    },
  };

  const modalContent: ModalDefaultProps = {
    header: {
      bsProps: {
        closeButton: true,
        closeLabel: 'Close',
      },
      content: <h2>Modal Header</h2>,
    },
    body: {
      content: (
        <>
          <h6>Inside the modal body</h6>
          <hr />
          <p>Example of text inside the modal body.</p>
        </>
      ),
    },
    footer: {
      content: (
        <>
          <button>Save Changes</button>
        </>
      ),
    },
  };

  return (
    <>
      <NavigationBar pages={PageNavItems} />
      <main className={styles.main}>
        <div>{isProcessing ? <div>WORKING ON IT</div> : ''}</div>
        <h1>Home Page</h1>
        <ModalOutline modalContent={modalContent} />
        <button onClick={toggleModal}>TEST MODAL</button>
        {recentProjects.length > 0 && (
          <>
            <h3>Recent Projects:</h3>
            <div>
              {recentProjects.map((project: ProjectData, index) => (
                <button
                  key={index}
                  onClick={handleOpenProject}
                  data-project-id={project.id}
                >
                  {project.name}
                </button>
              ))}
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

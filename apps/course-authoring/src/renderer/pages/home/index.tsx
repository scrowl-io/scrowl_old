/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './styles.module.scss';
import { Button, Card, Icon, NavigationDrawer as Nav, Table } from '@owlui/lib';
import { CardGrid } from '../../components/cardgrid';
import { sidebarItems, cards, filesList, EXAMPLE_PROJECT } from './data';
import { Menu } from '../../services';
import { Project } from '../../models';
import { FileData, OpenFileData } from '../../../main/services/file-system';
import { ProjectData, ProjectDataNew } from '../../../main/models/project';

export const PageRoute = '/';
export const PageName = 'Home';

const TemplatesList = () => {
  const tempTemplatesQty = 6;

  return Array.from(Array(tempTemplatesQty), (e, i) => {
    return (
      <div key={i} className="owlui-grid-col-xs-2">
        <Card
          className={style.template}
          style={{ height: '110px', cursor: 'pointer' }}
        ></Card>
      </div>
    );
  });
};

export const PageElement = () => {
  const [projectData, setProjectData] = useState<ProjectDataNew | ProjectData>(
    EXAMPLE_PROJECT
  );
  const [projectDir, setProjectDir] = useState<string>();
  const activeProject = new Project(projectData);
  const [imgFileExample, setImgFileExample] = useState<string | undefined>();

  const importFile = () => {
    function updatePlaceholderImage(importResult: OpenFileData) {
      if (importResult.error) {
        console.error(importResult.message);
        return;
      }

      if (importResult.filename) {
        setImgFileExample(`scrowl-file://${importResult.filename}`);
      }
    }

    if (!projectDir) {
      console.error('Unable to import file - project not created');
      return;
    }

    activeProject.importFile(['image']).then(updatePlaceholderImage);
  };

  useEffect(() => {
    const updateProject = (createResult: FileData) => {
      if (createResult.error) {
        console.error(createResult.message);
        return;
      }

      setProjectData(activeProject.data);
      setProjectDir(activeProject.workingDir);
    };

    Menu.File.onProjectNew(() => {
      if (projectDir) {
        console.error('Unbale to create project - project already created');
        return;
      }

      activeProject.create(projectData).then(updateProject);
    });

    Menu.File.onProjectSave(() => {
      if (!projectDir) {
        console.error('Unable to save project - project not created');
        return;
      }

      activeProject.save().then(updateProject);
    });

    Menu.File.onProjectSaveAs(() => {
      if (!projectDir) {
        console.error('Unable to save project - project not created');
        return;
      }

      activeProject.saveAs().then(updateProject);
    });

    Menu.File.onImportFile(importFile);

    if (activeProject.workingDir) {
      Menu.Global.disable(Menu.Global.ITEMS.projectNew);
      Menu.Global.enable(Menu.Global.ITEMS.projectSave);
      Menu.Global.enable(Menu.Global.ITEMS.projectSaveAs);
      Menu.Global.enable(Menu.Global.ITEMS.importFile);
    } else {
      Menu.Global.enable(Menu.Global.ITEMS.projectNew);
      Menu.Global.disable(Menu.Global.ITEMS.projectSave);
      Menu.Global.disable(Menu.Global.ITEMS.projectSaveAs);
      Menu.Global.disable(Menu.Global.ITEMS.importFile);
    }
  }, [projectData, projectDir]);

  const Header = (
    <>
      <div>
        <h1 className={style.navTitle}>
          <Icon
            className={style.navTitleIcon}
            icon="school"
            aria-hidden="true"
          />
          <span>Scrowl</span>
        </h1>
      </div>
      <div className={style.navActions}>
        <div>
          <Button variant="link">
            <Link to="/settings">Settings</Link>
          </Button>
        </div>
        <div className={style.navDivider} />
        <div>
          <Button onClick={importFile} disabled={projectDir ? false : true}>
            Import Image
          </Button>
          {imgFileExample && (
            <>
              <div className={style.navDivider} />
              <img
                src={imgFileExample}
                alt="Example"
                style={{ width: 'auto', height: '100px' }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      <Nav className={style.nav} header={Header} items={sidebarItems} />
      <main className={style.main}>
        <section>
          <div>
            <CardGrid cards={cards} />
          </div>
        </section>
        <section className={style.filesList}>
          <div>
            <h2 className={style.sectionTitle}>Your Files</h2>
            <Table tableData={filesList} />
          </div>
        </section>
        <section className={style.templatesList}>
          <div>
            <h2 className={style.sectionTitle}>Templates</h2>
            <div className="owlui-grid-row">{TemplatesList()}</div>
          </div>
        </section>
      </main>
    </>
  );
};

export default {
  PageName,
  PageRoute,
  PageElement,
};

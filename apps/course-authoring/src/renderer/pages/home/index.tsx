import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './styles.module.scss';
import { Button, Card, Icon, NavigationDrawer, Table } from '@owlui/lib';
import { sidebarItems, cards, filesList, EXAMPLE_PROJECT } from './data';
import * as projectModel from '../../models/project-models';
import { CardGrid } from '../../components/cardgrid';
import {
  AllowedFiles,
  FileData,
  OpenFileData,
  SaveFileData,
} from '../../../main/services/file-system/types';
import { Project } from './data.types';

export const PageRoute = '/';
export const PageName = 'Home';

const Header = (
  <>
    <div>
      <h1 className={style.navTitle}>
        <Icon className={style.navTitleIcon} icon="school" aria-hidden="true" />
        <span>Scrowl</span>
      </h1>
    </div>
    <div className={style.navActions}>
      <div>
        <Button variant="link">
          <Link to="/settings">Settings</Link>
        </Button>
      </div>
      <div>
        <Button variant="link">Open</Button>
      </div>
    </div>
    <div className={style.navDivider} />
  </>
);

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
  const [projectDir, setProjectDir] = useState<string | undefined>();
  const [projectFile, setProjectFile] = useState<string | undefined>();
  const [projectData] = useState<Project>(EXAMPLE_PROJECT);
  const [imgFileExample, setImgFileExample] = useState<string | undefined>();

  const createProject = () => {
    const resolveProjectCreate = (createResult: FileData) => {
      if (createResult.error) {
        console.error(createResult.message);
        return;
      }

      setProjectDir(createResult.dir);
    };

    projectModel.create(projectData).then(resolveProjectCreate);
  };

  const importFile = (fileTypes: AllowedFiles[]) => {
    if (!projectDir) {
      console.error('you must create a new project to import files.');
      return;
    }

    const resolveImportFile = (importResult: OpenFileData) => {
      if (importResult.error) {
        console.error(importResult.message);
        return;
      }

      if (importResult.filename) {
        setImgFileExample(`scrowl-file://${importResult.filename}`);
      }
    };

    projectModel.importFile(fileTypes, projectDir).then(resolveImportFile);
  };

  const saveProject = () => {
    if (!projectDir) {
      console.error('you must create a new project before saving the project.');
      return;
    }

    const resolveProjecetSave = function (saveResult: SaveFileData) {
      if (saveResult.error) {
        console.error(saveResult.message);
        return;
      }

      setProjectFile(saveResult.filePath);
    };

    projectModel.save(projectDir, projectFile).then(resolveProjecetSave);
  };

  if (projectDir) console.log(projectDir);

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
        <div>
          <Button onClick={createProject} disabled={!projectDir ? false : true}>
            New Project
          </Button>
        </div>
        <div className={style.navDivider} />
        <div>
          <Button
            onClick={() => importFile(['image'])}
            disabled={projectDir ? false : true}
          >
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
        <div className={style.navDivider} />
        <div>
          <Button onClick={saveProject} disabled={projectDir ? false : true}>
            Save Project
          </Button>
        </div>
      </div>
      <div className={style.navDivider} />
    </>
  );

  return (
    <>
      <NavigationDrawer
        className={style.nav}
        header={Header}
        items={sidebarItems}
      />
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

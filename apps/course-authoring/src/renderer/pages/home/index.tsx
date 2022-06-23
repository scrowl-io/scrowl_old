import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './styles.module.scss';
import { Default as Nav } from '@owlui/navigationdrawer';
import { Default as Btn } from '@owlui/button';
import { Default as Icon } from '@owlui/icons';
import { Default as Table } from '@owlui/table';
import { Default as Card } from '@owlui/card';
import { sidebarItems, cards, filesList } from './data';
import { CardGrid } from '../../components/cardgrid';
import {
  AllowedFiles,
  FileData,
  OpenFileData,
  SaveFileData,
} from '../../../main/services/file-system/types';
import { newProjectModel } from './newProjectModel';

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
  const [projectDir, setprojectDir] = useState<string | undefined>();
  const [projectFile, setprojectFile] = useState<string | undefined>();
  const [courseJson] = useState(newProjectModel);
  const [imgFileExample, setImgFileExample] = useState<string | undefined>();

  const handleNewProject = () => {
    window.electronAPI.ipcRenderer
      .invoke('new-project', courseJson)
      .then((tempDir: FileData) => {
        setprojectDir(tempDir.dirPath);
      });
  };

  const handleOpenFile = (fileType: AllowedFiles[]) => {
    window.electronAPI.ipcRenderer
      .invoke('import-file', fileType, projectDir)
      .then((fileData: OpenFileData) => {
        if (fileData.filePaths.length) {
          setImgFileExample(`scrowl-file://${fileData.filePaths[0]}`);
        }
      });
  };

  const handleSaveProject = () => {
    window.electronAPI.ipcRenderer
      .invoke('save-project', projectDir, projectFile)
      .then((fileData: SaveFileData) => {
        setprojectFile(fileData.filePath);
      });
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
          <Btn variant="link">
            <Link to="/settings">Settings</Link>
          </Btn>
        </div>
        <div>
          <Btn onClick={handleNewProject} disabled={!projectDir ? false : true}>
            New Project
          </Btn>
        </div>
        <div className={style.navDivider} />
        <div>
          <Btn
            onClick={() => handleOpenFile(['image'])}
            disabled={projectDir ? false : true}
          >
            Import Image
          </Btn>
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
          <Btn onClick={handleSaveProject} disabled={projectDir ? false : true}>
            Save Project
          </Btn>
        </div>
      </div>
      <div className={style.navDivider} />
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
            <Table columns={filesList.columns} items={filesList.items} />
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

import { IpcMainInvokeEvent } from 'electron';
import { Model } from '../model-types';
import { ProjectEvents } from './model-project-types';
import {
  FileSystem as fs,
  Requester,
} from '../../services';

export const create = function (event: IpcMainInvokeEvent, project: unknown) {
  const dirPrefix = 'scrowl';
  const projectFileName = 'scrowl.project';
  const tempDir = fs.dirTempSync(dirPrefix);

  if (tempDir.error) {
    return tempDir;
  }

  const filename = `${tempDir.pathName}/${projectFileName}`;

  return fs.fileWriteSync(filename, project);
};

const write = function (source: string, filename: string): fs.FileData {
  if (!source) {
    return {
      error: true,
      message: 'project requires a source',
    };
  }

  if (!filename) {
    return {
      error: true,
      message: 'project requires a filename',
    };
  }

  return fs.archive(source, filename);
};

export const save = async function (
  event: IpcMainInvokeEvent,
  projectTempPath: string,
  isSaveAs: boolean,
  projectPath: string
) {
  const dialogOptions = {
    title: 'Scrowl - Save Project',
    filters: [
      {
        name: 'Scrowl Project',
        extensions: ['scrowl'],
      },
    ],
  };

  if (!projectPath || isSaveAs) {
    const dialogResult = await fs.dialogSave(dialogOptions);

    if (dialogResult.error) {
      return dialogResult;
    }

    if (dialogResult.filePath) {
      projectPath = dialogResult.filePath;
    }
  }

  return write(projectTempPath, projectPath);
};

export const importFile = async function (
  event: IpcMainInvokeEvent,
  fileTypes: Array<fs.AllowedFiles>,
  projectTempPath: string
) {
  const filters = fs.getDialogMediaFilters(fileTypes);

  if (!filters.length) {
    return {
      error: true,
      message: 'valid file types need to be declared for importing',
    };
  }

  const dialogOptions = {
    title: 'Scrowl - Import File',
    filters,
  };
  const dialogResult = await fs.dialogOpen(dialogOptions);

  if (dialogResult.error) {
    return dialogResult;
  }

  if (!dialogResult.filePaths.length) {
    return {
      error: true,
      message: 'no files found/selected',
    };
  }

  return fs.fileTempSync(dialogResult.filePaths[0], projectTempPath);
};

export const EVENTS:ProjectEvents = [
  {
    name: 'project/new',
    type: 'invoke',
    fn: create,
  },
  {
    name: 'project/save',
    type: 'invoke',
    fn: save,
  },
  {
    name: 'project/import-file',
    type: 'invoke',
    fn: importFile,
  },
];

export const init = () => {
  Requester.registerAll(EVENTS);
};

export const Project:Model = {
  EVENTS,
  init,
  create,
  save,
  importFile,
}

export default Project;

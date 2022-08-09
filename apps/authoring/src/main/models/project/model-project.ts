import { app, IpcMainInvokeEvent } from 'electron';
import { Model } from '../model.types';
import {
  ProjectEvents,
  CreateResult,
  SaveResult,
  ImportResult,
  ProjectData,
} from './model-project.types';
import { FileSystem as fs, Requester } from '../../services';
import { projectData as EXAMPLE_DATA } from './model-project-data';
import { Preferences } from '../preferences';
import { Projects } from '../projects';

const PROJECT_DIR_PREFIX = 'scrowl';
const PROJECT_FILE_NAME = 'scrowl.project';
const PROJECT_SAVED_EXTENSION = 'scrowl';

export const create = function (
  event: IpcMainInvokeEvent,
  projectID: ProjectData
): CreateResult {
  const tempDir: fs.DirectoryTempResult = fs.dirTempSync(PROJECT_DIR_PREFIX);

  if (tempDir.error) {
    return tempDir;
  }

  const filename = `${tempDir.data.pathname}/${PROJECT_FILE_NAME}`;

  // TODO: The tempProjectData will be replaced by the proper project data loaded from the project
  // template file according to the projectID received from the frontend. The way the templates
  // will be stored hasn't been defined yet so we'll use example data for now.
  const currentDate = new Date();
  const tempProjectData: ProjectData = {
    ...EXAMPLE_DATA,
    id: currentDate.getTime(),
    workingFile: filename,
    workingDir: filename.split('/').slice(0, -1).join('/'),
    createdAt: currentDate.toJSON(),
    updatedAt: currentDate.toJSON(),
    openedAt: currentDate.toJSON(),
  };

  const writeRes = fs.fileWriteSync(filename, tempProjectData);

  if (writeRes.error) {
    return writeRes;
  }

  return {
    error: false,
    data: {
      filename: filename,
      project: tempProjectData,
    },
  };
};

export const open = async function () {
  const dialogOptions = {
    title: 'Scrowl - Open Project',
    filters: [
      {
        name: 'Scrowl Project',
        extensions: ['scrowl'],
      },
    ],
  };

  const dialogResult = await fs.dialogOpen(dialogOptions);

  if (dialogResult.error) {
    return {
      error: true,
      message: 'Unable to save project - working directory required',
    };
  }

  if (dialogResult.data.canceled) {
    return {
      error: true,
      message: 'No files found/selected',
    };
  }

  const tempDir = fs.dirTempSync(PROJECT_DIR_PREFIX);

  if (tempDir.error || !tempDir.data.pathname) {
    return tempDir;
  }

  const projectData = fs.unarchive(
    dialogResult.data.filePaths[0],
    tempDir.data.pathname
  );

  return fs.fileReadSync(`${projectData.data.projectDir}/${PROJECT_FILE_NAME}`);
};

const write = function (source: string, filename: string): fs.FileDataResult {
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

export const save = (event: IpcMainInvokeEvent, project: ProjectData) => {
  return new Promise<SaveResult>((resolve, reject) => {
    const updateProject = (res: fs.DialogSaveResult) => {
      if (!project.workingDir) {
        reject({
          error: true,
          message: 'Unable to save project - working directory required',
        });
        return;
      }

      if (res.error) {
        reject(res);
        return;
      }

      const filePath = `${res.data.filePath}/${project.id}.${PROJECT_SAVED_EXTENSION}`;

      const writeRes = write(project.workingDir, filePath);

      if (writeRes.error) {
        reject(writeRes);
        return;
      }

      try {
        project.saveFile = writeRes.data.filename;
        project.saveDir = writeRes.data.filename
          .split('/')
          .slice(0, -1)
          .join('/');

        app.addRecentDocument(filePath);

        Projects.insert({
          id: project.id,
          name: project.name,
        })
          .then(() =>
            resolve({
              error: false,
              data: {
                filename: writeRes.data.filename,
                project: project,
              },
            })
          )
          .catch((err: string) => {
            reject({
              error: true,
              message: `Unable to save project - ${err}`,
            });
          });
      } catch (err) {
        const message =
          err && typeof err === 'string'
            ? err
            : 'Unable to save project - unknown reason';

        resolve({
          error: true,
          message,
        });
      }
    };

    if (!project) {
      resolve({
        error: true,
        message: 'Unable to save project - project data required',
      });
    }

    if (!project.workingDir) {
      resolve({
        error: true,
        message: 'Unable to save project - working directory required',
      });
    }

    Preferences.get('save_folder_path').then((savingDir: Model) =>
      updateProject({
        error: false,
        data: {
          canceled: false,
          filePath: savingDir.save_folder_path,
        },
      })
    );
  });
};

export const importFile = (
  event: IpcMainInvokeEvent,
  fileTypes: Array<fs.AllowedFiles>,
  project: ProjectData
) => {
  return new Promise<ImportResult>(resolve => {
    if (!project) {
      resolve({
        error: true,
        message: 'Unable to import a file - project required',
      });
      return;
    }

    if (!project.workingDir) {
      resolve({
        error: true,
        message: 'Unable to import a file - project working directory required',
      });
      return;
    }

    if (!fileTypes || !fileTypes.length) {
      resolve({
        error: true,
        message: 'Unable to import a file - file types required',
      });
      return;
    }

    const filters = fs.getDialogMediaFilters(fileTypes);

    if (!filters.length) {
      resolve({
        error: true,
        message: `Unable to import a file: ${fileTypes.join(
          ', '
        )} - not supported`,
      });
      return;
    }

    const dialogOptions = {
      title: 'Scrowl - Import File',
      filters,
    };

    fs.dialogOpen(dialogOptions).then(openRes => {
      if (openRes.error) {
        resolve(openRes);
        return;
      }

      if (!openRes.data.filePaths.length) {
        resolve({
          error: true,
          message: 'Unable to import file - no file selected',
        });
        return;
      }

      const importSource = openRes.data.filePaths[0];

      if (!project.workingDir) {
        resolve({
          error: true,
          message:
            'Unable to import a file - project working directory required',
        });
        return;
      }

      const copyRes = fs.fileTempSync(importSource, project.workingDir);

      if (copyRes.error) {
        resolve(copyRes);
      }

      const workingImport = copyRes.data.filename;
      project.workingImports = project.workingImports || [];
      project.workingImports.push(workingImport);

      resolve({
        error: false,
        data: {
          contents: project,
          import: workingImport,
        },
      });
    });
  });
};

const getScrowlFiles = async () => {
  const savingDir = await Preferences.get('save_folder_path');

  const dirReadRes = await fs.getSortedFilesFromDir(savingDir.save_folder_path);

  if (dirReadRes.error) {
    return dirReadRes;
  }

  if (!dirReadRes.data?.files.length) {
    return {
      ...dirReadRes,
      message: 'No recent files have been saved. Saving directory is empty.',
    };
  }

  return dirReadRes;
};

const getRecentScrowlFiles = async () => {
  const scrowlFilesRes = await getScrowlFiles();

  const recentFilesList = scrowlFilesRes.data?.files.slice(0, 10);

  return {
    ...scrowlFilesRes,
    data: {
      files: recentFilesList,
    },
  };
};

export const EVENTS: ProjectEvents = {
  new: {
    name: '/projects/create',
    type: 'invoke',
    fn: create,
  },
  save: {
    name: 'project/save',
    type: 'invoke',
    fn: save,
  },
  recent: {
    name: '/projects/list/recent',
    type: 'invoke',
    fn: getRecentScrowlFiles,
  },
  import: {
    name: 'project/import-file',
    type: 'invoke',
    fn: importFile,
  },
};

export const init = () => {
  Requester.registerAll(EVENTS);
};

export const Project: Model = {
  EVENTS,
  init,
  create,
  open,
  save,
  getRecentScrowlFiles,
  importFile,
};

export default Project;

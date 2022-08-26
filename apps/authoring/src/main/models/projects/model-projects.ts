import { Model } from '../model.types';
import {
  ProjectEvents,
  ImportResult,
  ProjectData,
} from './model-projects.types';
import {
  FileSystem as fs,
  InternalStorage as IS,
  Requester,
} from '../../services';
import * as table from './model-projects-schema';

const writeProjectTemp = (
  project: ProjectData,
  filename: string,
  contents: string
) => {
  return new Promise<Requester.ApiResult>(resolve => {
    if (!project.id) {
      resolve({
        error: true,
        message:
          'Unable to add project to temporary directory: project id required',
      });
      return;
    }

    const filePath = fs.join(`${project.id}`, filename);

    fs.writeFileTemp(filePath, contents).then(writeRes => {
      if (writeRes.error) {
        resolve(writeRes);
        return;
      }

      resolve({
        error: false,
        data: {
          filename,
          contents,
        },
      });
    });
  });
};

// TODO change the event to send (remove the resolves)
export const create = () => {
  // TODO add support for handling duplicating a project when a project ID is passed
  return new Promise<Requester.ApiResult>(resolve => {
    let project: ProjectData = { name: 'Untitled Project' };

    // create a new entity in the DB
    IS.create(table.name, project).then(createRes => {
      if (createRes.error) {
        createRes.message = 'Unable to create project';
        resolve(createRes);
        return;
      }

      project = createRes.data.item;
      writeProjectTemp(
        project,
        'manifest.json',
        JSON.stringify(project, null, 2)
      ).then(writeRes => {
        if (writeRes.error) {
          resolve(writeRes);
          return;
        }

        const result = {
          error: false as const,
          data: {
            project,
          },
        };

        resolve(result);
      });
    });
  });
};

export const save = (
  ev: Requester.RequestEvent,
  project: ProjectData,
  onlyManifest = false
) => {
  return new Promise<Requester.ApiResult>(resolve => {
    if (!project.id) {
      resolve({
        error: true,
        message: 'Unable to save: project id required',
      });
      return;
    }

    // update the project in the DB
    IS.update(table.name, project, { id: project.id })
      .then(updateRes => {
        if (updateRes.error) {
          resolve(updateRes);
          return;
        }

        if (!updateRes.data.item) {
          resolve({
            error: true,
            message: 'Malformed save: project was not returned',
            data: updateRes,
          });
          return;
        }

        const updatedProject = updateRes.data.item;

        // write the new manifest
        writeProjectTemp(
          updatedProject,
          'manifest.json',
          JSON.stringify(updatedProject, null, 2)
        ).then(writeRes => {
          if (writeRes.error) {
            resolve(writeRes);
            return;
          }

          const from = !onlyManifest
            ? updatedProject.id.toString()
            : fs.join(updatedProject.id.toString(), 'manifest.json');
          const to = !onlyManifest
            ? updatedProject.id.toString()
            : fs.join(updatedProject.id.toString(), 'manifest.json');

          // copy the project temp folder into the save folder
          fs.copyTempToSave(from, to).then(copyRes => {
            if (copyRes.error) {
              resolve(copyRes);
              return;
            }

            resolve({
              error: false,
              data: {
                project: updatedProject,
              },
            });
          });
        });
      })
      .catch(e => {
        resolve({
          error: true,
          message: 'Failed to save changes to storage',
          data: {
            trace: e,
          },
        });
      });
  });
};

export const list = (ev: Requester.RequestEvent, limit?: number) => {
  return new Promise<Requester.ApiResult>(resolve => {
    const getProjectsManifests = (projectRecords: Array<ProjectData>) => {
      const filePromises = projectRecords.map(project => {
        return fs.readFileSave(fs.join(`${project.id}`, 'manifest.json'));
      });

      try {
        Promise.allSettled(filePromises).then(fileResults => {
          const projects: Array<ProjectData | undefined> = [];
          fileResults.forEach(result => {
            if (result.status === 'rejected') {
              return;
            }

            const fileRes = result.value;

            if (fileRes.error) {
              return;
            }

            projects.push(fileRes.data.contents);
          });

          resolve({
            error: false,
            data: {
              projects,
            },
          });
        });
      } catch (e) {
        resolve({
          error: true,
          message: 'Failed to read projects files',
          data: {
            trace: e,
          },
        });
      }
    };

    try {
      const orderBy: IS.StorageOrder = [
        {
          column: 'updated_at',
        },
      ];

      IS.read(table.name, undefined, orderBy, limit).then(readRes => {
        if (readRes.error) {
          resolve(readRes);
          return;
        }

        getProjectsManifests(readRes.data.items);
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to read projects from storage',
        data: {
          trace: e,
        },
      });
    }
  });
};

export const open = function (ev: Requester.RequestEvent, projectId: number) {
  if (!projectId) {
    Requester.send(EVENTS.open.name, {
      error: true,
      message: 'Unable to open: project id required',
    });
    return;
  }

  // track the opening of the project
  const updateProjectData = () => {
    try {
      IS.read(table.name, { id: projectId }).then(readRes => {
        if (readRes.error) {
          Requester.send(EVENTS.open.name, readRes);
          return;
        }

        const project = readRes.data.items[0];

        project.opened_at = IS.getTimestamp();
        save(ev, project, true).then(saveRes => {
          Requester.send(EVENTS.open.name, saveRes);
        });
      });
    } catch (e) {
      Requester.send(EVENTS.open.name, {
        error: true,
        message: 'Failed to update project while opening',
        data: {
          trace: e,
        },
      });
    }
  };

  // copy the project from the save folder to the temp folder
  try {
    const from = projectId.toString();
    const to = projectId.toString();

    fs.copyTempToSave(from, to).then(copyRes => {
      if (copyRes.error) {
        Requester.send(EVENTS.open.name, copyRes);
        return;
      }

      updateProjectData();
    });
  } catch (e) {
    Requester.send(EVENTS.open.name, {
      error: true,
      message: `Failed to open project: ${projectId}`,
      data: {
        trace: e,
      },
    });
  }
};

export const importFile = (
  ev: Requester.RequestEvent,
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
          project: project,
          import: workingImport,
        },
      });
    });
  });
};

export const publish = (ev: Requester.RequestEvent, project: ProjectData) => {
  return new Promise<Requester.ApiResult>(resolve => {
    if (!project || !project.id) {
      resolve({
        error: true,
        message: 'Unable to publish project: project data required',
      });
      return;
    }

    try {
      // check/get temp location
      // create dist folder in temp
      // copy temp except for manifest into dist/content
      // copy package/content tp dist/content
      // get temp/manifest
      // compile templates/index.hbs with temp/manifest to dist/content/index.html
      // package scorm to downloads folder
      resolve({
        error: false,
        data: {
          project,
        },
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to publish project',
        data: {
          trace: e,
          project,
        },
      });
    }
  });
};

export const EVENTS: ProjectEvents = {
  create: {
    name: '/projects/create',
    type: 'send',
  },
  onCreate: {
    name: '/projects/create',
    type: 'invoke',
    fn: create,
  },
  save: {
    name: '/projects/save',
    type: 'send',
  },
  onSave: {
    name: '/projects/save',
    type: 'invoke',
    fn: save,
  },
  open: {
    name: '/projects/open',
    type: 'send',
  },
  onOpen: {
    name: '/projects/open',
    type: 'on',
    fn: open,
  },
  list: {
    name: '/projects/list',
    type: 'invoke',
    fn: list,
  },
  import: {
    name: 'project/import-file',
    type: 'send',
  },
  onImport: {
    name: 'project/import-file',
    type: 'invoke',
    fn: importFile,
  },
  publish: {
    name: '/projects/publish',
    type: 'send',
  },
  onPublish: {
    name: '/projects/publish',
    type: 'invoke',
    fn: publish,
  },
};

export const init = () => {
  return new Promise<Requester.ApiResult>(resolve => {
    try {
      Requester.registerAll(EVENTS);
      IS.__tableCreate(table.name, table.schema).then(() => {
        resolve({
          error: false,
          data: {
            table: table.name,
          },
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Unable to initialize project model',
        data: {
          trace: e,
        },
      });
    }
  });
};

export const Project: Model = {
  EVENTS,
  init,
  create,
  open,
  save,
  importFile,
};

export default Project;

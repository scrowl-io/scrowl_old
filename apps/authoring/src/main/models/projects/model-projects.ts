import { Model } from '../model.types';
import {
  ProjectEvents,
  ImportResult,
  ProjectData,
} from './model-projects.types';
import {
  FileSystem as fs,
  InternalStorage as IS,
  Publisher,
  Requester,
} from '../../services';
import * as table from './model-projects-schema';
import { data } from './model-project.mock';
import { requester } from '../../../renderer/services';

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
    try {
      let project: ProjectData = {
        name: data.name,
      };

      // create a new entity in the DB
      IS.create(table.name, project).then(createRes => {
        if (createRes.error) {
          createRes.message = 'Unable to create project';
          resolve(createRes);
          return;
        }

        project = {
          ...createRes.data.item,
          scormConfig: data.scormConfig,
          modules: data.modules || [],
          glossary: data.glossary || [],
          resources: data.resources || [],
        };
        writeProjectTemp(
          project,
          'manifest.json',
          JSON.stringify(project, null, 2)
        ).then(writeRes => {
          if (writeRes.error) {
            resolve(writeRes);
            return;
          }

          resolve({
            error: false,
            data: {
              project,
            },
          });
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to create project',
        data: {
          trace: e,
        },
      });
    }
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
    // eslint-disable-next-line prefer-const
    let { modules, glossary, resources, scormConfig, ...data } = project;
    modules = modules || [];
    glossary = glossary || [];
    resources = resources || [];

    IS.update(table.name, data, { id: data.id })
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

        const updatedProject = Object.assign(updateRes.data.item, {
          scormConfig,
          modules,
          glossary,
          resources,
        });
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
  const checkProjectExists = (project: ProjectData) => {
    return new Promise<requester.ApiResult>(resolve => {
      try {
        fs.existsFileSave(fs.join(`${project.id}`, 'manifest.json')).then(
          res => {
            if (res.error) {
              resolve(res);
              return;
            }

            resolve({
              error: false,
              data: {
                exists: res.data.exists,
                project,
              },
            });
          }
        );
      } catch (e) {
        resolve({
          error: true,
          message: 'Failed to check project existence',
          data: {
            trace: e,
            project,
          },
        });
      }
    });
  };

  return new Promise<Requester.ApiResult>(resolve => {
    const getProjectsManifests = (projectRecords: Array<ProjectData>) => {
      const filePromises = projectRecords.map(project => {
        return checkProjectExists(project);
      });

      try {
        Promise.allSettled(filePromises).then(fileResults => {
          const projects: Array<ProjectData | undefined> = [];

          fileResults.forEach(result => {
            if (result.status === 'rejected') {
              return;
            }

            const fileRes = result.value;

            if (fileRes.error || !fileRes.data.exists) {
              return;
            }

            projects.push(fileRes.data.project);
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
          order: 'desc',
        },
      ];

      IS.read(table.name, undefined, orderBy, limit).then(readRes => {
        if (readRes.error) {
          resolve(readRes);
          return;
        }

        if (readRes.data.items.length) {
          getProjectsManifests(readRes.data.items);
          return;
        }

        resolve({
          error: false,
          data: {
            projects: [],
          },
        });
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

export const open = (ev: Requester.RequestEvent, projectId: number) => {
  const updateTempFolder = () => {
    return new Promise<Requester.ApiResult>(resolve => {
      try {
        const from = projectId.toString();
        const to = projectId.toString();

        fs.copyTempToSave(from, to).then(copyRes => {
          if (copyRes.error) {
            resolve(copyRes);
            return;
          }

          fs.readFileSave(fs.join(`${projectId}`, 'manifest.json')).then(
            resolve
          );
        });
      } catch (e) {
        resolve({
          error: true,
          message: 'Failed to open temporary project folder',
          data: {
            trace: e,
          },
        });
      }
    });
  };

  const openProject = (project: ProjectData) => {
    return new Promise<Requester.ApiResult>(resolve => {
      try {
        project.opened_at = IS.getTimestamp();
        save(ev, project, true).then(resolve);
      } catch (e) {
        resolve({
          error: true,
          message: 'Failed to update project while writing meta data',
          data: {
            trace: e,
            projectId,
          },
        });
      }
    });
  };

  return new Promise<Requester.ApiResult>(resolve => {
    if (!projectId) {
      resolve({
        error: true,
        message: 'Unable to open: project id required',
      });
      return;
    }

    try {
      updateTempFolder().then(tempRes => {
        if (tempRes.error) {
          resolve(tempRes);
          return;
        }

        const data = tempRes.data.contents;
        openProject(data).then(resolve);
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to open project',
        data: {
          trace: e,
          projectId,
        },
      });
    }
  });
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
      save(ev, project, true).then(saveRes => {
        if (saveRes.error) {
          resolve(saveRes);
        }

        Publisher.pack(saveRes.data.project).then(resolve);
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
    type: 'invoke',
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

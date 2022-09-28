import { Model } from '../model.types';
import {
  ProjectEvents,
  ImportResult,
  ProjectData,
} from './model-projects.types';
import {
  FileSystem as fs,
  InternalStorage as IS,
  Logger,
  Publisher,
  Requester,
} from '../../services';
import * as table from './model-projects-schema';
// import { data } from './model-project.mock';
import { requester } from '../../../renderer/services';
import { add as addTemplate } from '../templates';
import { SaveDialogOptions } from 'electron';

const writeProjectTemp = (
  project: ProjectData,
  filename: string,
  contents: string
) => {
  return new Promise<Requester.ApiResult>(resolve => {
    if (!project.id) {
      const missingIdError: Requester.ApiResultError = {
        error: true,
        message:
          'Unable to add project to temporary directory: project id required',
      };
      Logger.error(missingIdError);
      resolve(missingIdError);
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

export const create = () => {
  const addProjectTemplates = (project: ProjectData) => {
    return new Promise<Requester.ApiResult>(resolve => {
      try {
        const modules = project.modules || [];

        if (!modules.length) {
          const missingModulesError: Requester.ApiResultError = {
            error: true,
            message: 'Unable to add templates: project requires modules',
          };
          Logger.error(missingModulesError);
          resolve(missingModulesError);
          return;
        }

        if (!project.id) {
          const missingIdError: Requester.ApiResultError = {
            error: true,
            message: 'Unable to add templates: project id required',
          };
          Logger.error(missingIdError);
          resolve(missingIdError);
          return;
        }

        const projectId = project.id;
        const templateNames = new Set<string>();

        modules.forEach(module => {
          module.lessons.forEach(lesson => {
            lesson.slides.forEach(slide => {
              if (!slide.template) {
                return;
              }

              templateNames.add(slide.template.meta.name);
            });
          });
        });

        const addPromises = Array.from(templateNames).map((name: string) => {
          return addTemplate(undefined, name, projectId);
        });

        Promise.allSettled(addPromises).then(addRes => {
          const templates: Array<{
            [key: string]: string;
          }> = [];

          addRes.forEach(res => {
            if (res.status === 'rejected') {
              Logger.error('Failed to add template', res);
              return;
            }

            if (res.value.error) {
              Logger.warn('Unable to add template', res);
              return;
            }

            templates.push(res.value.data);
          });

          resolve({
            error: false,
            data: {
              templates,
            },
          });
        });
      } catch (e) {
        const createError = {
          error: true,
          message: 'Failed to add templates to project',
          data: {
            trace: e,
          },
        };
        Logger.error(createError);
        resolve(createError);
      }
    });
  };
  // TODO add support for handling duplicating a project when a project ID is passed
  return new Promise<Requester.ApiResult>(resolve => {
    try {
      let project: ProjectData = {
        name: 'Untitled Project',
      };
      const complete = (res: Requester.ApiResult) => {
        if (res.error) {
          Logger.error(res);
          resolve(res);
          return;
        }

        resolve({
          error: false,
          data: {
            project,
          },
        });
      };

      // create a new entity in the DB
      IS.create(table.name, project).then(createRes => {
        if (createRes.error) {
          createRes.message = 'Unable to create project';
          Logger.error(createRes);
          resolve(createRes);
          return;
        }

        project = {
          ...createRes.data.item,
          scormConfig: {
            name: project.name,
            description: '',
            authors: '',
          },
          modules: [],
          glossary: [],
          resources: [],
        };
        writeProjectTemp(
          project,
          'manifest.json',
          JSON.stringify(project, null, 2)
        ).then(writeRes => {
          if (!project.modules || !project.modules.length) {
            complete(writeRes);
            return;
          }

          // addProjectTemplates(project).then(complete);
        });
      });
    } catch (e) {
      const createError = {
        error: true,
        message: 'Failed to create project',
        data: {
          trace: e,
        },
      };
      Logger.error(createError);
      resolve(createError);
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
      const missingIdError: Requester.ApiResultError = {
        error: true,
        message: 'Unable to save: project id required',
      };
      Logger.error(missingIdError);
      resolve(missingIdError);
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
          Logger.error(updateRes);
          resolve(updateRes);
          return;
        }

        if (!updateRes.data.item) {
          const malformedError: Requester.ApiResultError = {
            error: true,
            message: 'Malformed save: project was not returned',
            data: updateRes,
          };
          Logger.error(malformedError);
          resolve(malformedError);
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
            Logger.error(writeRes);
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
              Logger.error(copyRes);
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
        const saveError = {
          error: true,
          message: 'Failed to save changes to storage',
          data: {
            trace: e,
          },
        };
        Logger.error(saveError);
        resolve(saveError);
      });
  });
};

export const listRecent = (ev: Requester.RequestEvent, limit?: number) => {
  const checkProjectExists = (project: ProjectData) => {
    return new Promise<requester.ApiResult>(resolve => {
      try {
        fs.existsFileSave(fs.join(`${project.id}`, 'manifest.json')).then(
          res => {
            if (res.error) {
              Logger.error(res);
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
        const listError = {
          error: true,
          message: 'Failed to check project existence',
          data: {
            trace: e,
            project,
          },
        };
        Logger.error(listError);
        resolve(listError);
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
        const listRecentError = {
          error: true,
          message: 'Failed to read projects files',
          data: {
            trace: e,
          },
        };
        Logger.error(listRecentError);
        resolve(listRecentError);
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
          Logger.error(readRes);
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
      const listRecentError = {
        error: true,
        message: 'Failed to read projects from storage',
        data: {
          trace: e,
        },
      };
      Logger.error(listRecentError);
      resolve(listRecentError);
    }
  });
};

export const list = (ev: Requester.RequestEvent, limit?: number) => {
  const checkProjectExists = (project: ProjectData) => {
    return new Promise<requester.ApiResult>(resolve => {
      try {
        fs.existsFileSave(fs.join(`${project.id}`, 'manifest.json')).then(
          res => {
            if (res.error) {
              Logger.error(res);
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
        const existError = {
          error: true,
          message: 'Failed to check project existence',
          data: {
            trace: e,
            project,
          },
        };
        Logger.error(existError);
        resolve(existError);
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
        const manifestError = {
          error: true,
          message: 'Failed to read projects files',
          data: {
            trace: e,
          },
        };
        Logger.error(manifestError);
        resolve(manifestError);
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
          Logger.error(readRes);
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
      const listError = {
        error: true,
        message: 'Failed to read projects from storage',
        data: {
          trace: e,
        },
      };
      Logger.error(listError);
      resolve(listError);
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
            Logger.error(copyRes);
            resolve(copyRes);
            return;
          }

          fs.readFileSave(fs.join(`${projectId}`, 'manifest.json')).then(
            resolve
          );
        });
      } catch (e) {
        const openError = {
          error: true,
          message: 'Failed to open temporary project folder',
          data: {
            trace: e,
          },
        };
        Logger.error(openError);
        resolve(openError);
      }
    });
  };

  const openProject = (project: ProjectData) => {
    return new Promise<Requester.ApiResult>(resolve => {
      try {
        project.opened_at = IS.getTimestamp();
        save(ev, project, true).then(resolve);
      } catch (e) {
        const openError = {
          error: true,
          message: 'Failed to update project while writing meta data',
          data: {
            trace: e,
            projectId,
          },
        };
        Logger.error(openError);
        resolve(openError);
      }
    });
  };

  return new Promise<Requester.ApiResult>(resolve => {
    if (!projectId) {
      const missingIdError: Requester.ApiResultError = {
        error: true,
        message: 'Unable to open: project id required',
      };
      Logger.error(missingIdError);
      resolve(missingIdError);
      return;
    }

    try {
      updateTempFolder().then(tempRes => {
        if (tempRes.error) {
          Logger.error(tempRes);
          resolve(tempRes);
          return;
        }

        const data = tempRes.data.contents;
        openProject(data).then(resolve);
      });
    } catch (e) {
      const openError = {
        error: true,
        message: 'Failed to open project',
        data: {
          trace: e,
          projectId,
        },
      };
      Logger.error(openError);
      resolve(openError);
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
      const missingProjectError: Requester.ApiResultError = {
        error: true,
        message: 'Unable to import a file - project required',
      };
      Logger.error(missingProjectError);
      resolve(missingProjectError);
      return;
    }

    if (!project.workingDir) {
      const pathingError: Requester.ApiResultError = {
        error: true,
        message: 'Unable to import a file - project working directory required',
      };
      Logger.error(pathingError);
      resolve(pathingError);
      return;
    }

    if (!fileTypes || !fileTypes.length) {
      const missingFileTypesError: Requester.ApiResultError = {
        error: true,
        message: 'Unable to import a file - file types required',
      };
      Logger.error(missingFileTypesError);
      resolve(missingFileTypesError);
      return;
    }

    const filters = fs.getDialogMediaFilters(fileTypes);

    if (!filters.length) {
      const importError: Requester.ApiResultError = {
        error: true,
        message: `Unable to import a file: ${fileTypes.join(
          ', '
        )} - not supported`,
      };
      Logger.error(importError);
      resolve(importError);
      return;
    }

    const dialogOptions = {
      title: 'Scrowl - Import File',
      filters,
    };

    fs.dialogOpen(dialogOptions).then(openRes => {
      if (openRes.error) {
        Logger.error(openRes);
        resolve(openRes);
        return;
      }

      if (!openRes.data.filePaths.length) {
        const noFileError: Requester.ApiResultError = {
          error: true,
          message: 'Unable to import file - no file selected',
        };
        Logger.error(noFileError);
        resolve(noFileError);
        return;
      }

      const importSource = openRes.data.filePaths[0];

      if (!project.workingDir) {
        const workingPathError: Requester.ApiResultError = {
          error: true,
          message:
            'Unable to import a file - project working directory required',
        };
        Logger.error(workingPathError);
        resolve(workingPathError);
        return;
      }

      const copyRes = fs.fileTempSync(importSource, project.workingDir);

      if (copyRes.error) {
        Logger.error(copyRes);
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
      const missingIdError: Requester.ApiResultError = {
        error: true,
        message: 'Unable to publish project: project data required',
      };
      Logger.error(missingIdError);
      resolve(missingIdError);
      return;
    }

    save(ev, project, true)
      .then(saveRes => {
        if (saveRes.error) {
          Logger.error(saveRes);
          resolve(saveRes);
          return;
        }

        try {
          const filename = `${Publisher.toScormCase(project.name || '')}`;
          const dialogOptions: SaveDialogOptions = {
            properties: ['showOverwriteConfirmation', 'createDirectory'],
            buttonLabel: 'Publish',
            message: 'Publish Scrowl Project',
            defaultPath: fs.join(fs.pathDownloadsFolder, filename),
          };

          fs.dialogSave(dialogOptions).then(dialogRes => {
            if (dialogRes.error) {
              Logger.error(dialogRes);
              resolve(dialogRes);
              return;
            }

            if (dialogRes.data.canceled) {
              resolve(dialogRes);
              return;
            }

            if (!dialogRes.data.filePath) {
              const missingPathError = {
                error: true,
                message: 'File path required',
                data: dialogRes.data,
              };
              Logger.error(missingPathError);
              resolve(missingPathError);
              return;
            }

            const filepath = `${dialogRes.data.filePath}.zip`;

            Publisher.pack(saveRes.data.project, filepath).then(resolve);
          });
        } catch (e) {
          const publishError = {
            error: true,
            message: 'Failed to publish',
            data: {
              trace: e,
            },
          };
          Logger.error(publishError);
          resolve(publishError);
        }
      })
      .catch(e => {
        const publishError = {
          error: true,
          message: 'Failed to publish',
          data: {
            trace: e,
          },
        };
        Logger.error(publishError);
        resolve(publishError);
      });
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
  listRecent: {
    name: '/projects/list/recent',
    type: 'invoke',
    fn: listRecent,
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

import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import { app } from 'electron';
import {
  FileExistsResult,
  DirectoryTempResult,
  FileDataResult,
  FSResult,
} from './service-fs.types';
import { create } from 'handlebars/runtime';

export const pathSaveFolder = app.getPath('userData');
export const pathTempFolder = path.join(app.getPath('temp'), 'scrowl');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createResultError = (message: string, error?: any): FSResult => {
  if (error === undefined) {
    return {
      error: true,
      message,
    };
  } else {
    return {
      error: true,
      message,
      data: {
        trace: error,
      },
    };
  }
};

const normalize = (pathname: string) => {
  return path.normalize(pathname);
};

const isJSON = (name: string) => {
  return /.json$/.test(name) || /.project$/.test(name);
};

export const join = (...paths: Array<string>) => {
  return path.join.apply(null, paths);
};

export const ext = (pathname: string) => {
  return path.extname(pathname);
};

export const dirName = (pathname: string) => {
  return path.dirname(pathname);
};

export const dirExistsSync = (pathname: string): FileExistsResult => {
  try {
    return {
      error: false,
      data: {
        exists: fs.existsSync(normalize(pathname)),
      },
    };
  } catch (err) {
    const message =
      err && typeof err === 'string'
        ? err
        : `Unable to check directory existance: ${pathname} - unknown reason`;

    return {
      error: true,
      message,
    };
  }
};

export const dirTempSync = (prefix: string): DirectoryTempResult => {
  let tmpDir;

  try {
    tmpDir = fs.mkdtempSync(
      path.join(os.tmpdir(), `${prefix ? `${prefix}_` : ''}`)
    );

    return {
      error: false,
      data: {
        pathname: tmpDir,
      },
    };
  } catch (err) {
    const message =
      err && typeof err === 'string'
        ? err
        : `Unable to create temp directory: ${prefix} - unknown reason`;

    return {
      error: true,
      message,
    };
  }
};

export const fileExistsSync = (pathname: string): FileExistsResult => {
  try {
    return {
      error: false,
      data: {
        exists: fs.pathExistsSync(pathname),
      },
    };
  } catch (err) {
    const message =
      err && typeof err === 'string'
        ? err
        : `Unable to check file existance: ${pathname} - unknown reason`;

    return {
      error: true,
      message,
    };
  }
};

export const fileReadSync = (
  pathname: string,
  media: BufferEncoding = 'utf8'
): FileDataResult | FileExistsResult => {
  const exists = fileExistsSync(pathname);

  if (exists.error) {
    return {
      error: true,
      message: exists.message,
    };
  }

  if (media === undefined) {
    media = 'utf8';
  }

  const filename = normalize(pathname);

  try {
    let contents;
    const file = fs.readFileSync(filename, { encoding: media, flag: 'r' });

    if (isJSON(filename)) {
      contents = JSON.parse(file);
    } else {
      contents = file;
    }

    return {
      error: false,
      data: {
        filename,
        contents,
      },
    };
  } catch (err) {
    const message =
      err && typeof err === 'string'
        ? err
        : `Unable to read file: ${pathname} - unknown reason`;

    return {
      error: true,
      message,
    };
  }
};

export const fileWriteSync = (
  pathname: string,
  contents: unknown
): FileDataResult => {
  const filename = normalize(pathname);

  if (!contents) {
    return {
      error: true,
      message: `Unable to write file: ${pathname} - contents required`,
    };
  }

  try {
    if (isJSON(pathname)) {
      if (typeof contents !== 'string') {
        contents = JSON.stringify(contents, null, 2);
      } else {
        contents = JSON.stringify(JSON.parse(contents), null, 2);
      }
    }

    fs.outputFileSync(filename, contents);

    return {
      error: false,
      data: {
        filename,
      },
    };
  } catch (err) {
    const message =
      err && typeof err === 'string'
        ? err
        : `Unable to write file: ${pathname} - unknown reason`;

    return {
      error: true,
      message,
    };
  }
};

export const fileCopySync = (source: string, dest: string): FileDataResult => {
  const sourcePath = normalize(source);
  const destPath = normalize(dest);

  try {
    fs.copySync(sourcePath, destPath);

    return {
      error: false,
      data: {
        filename: destPath,
      },
    };
  } catch (err) {
    const message =
      err && typeof err === 'string'
        ? err
        : `Unable to copy: ${source} to ${dest} - unknown reason`;

    return {
      error: true,
      message,
    };
  }
};

export const fileTempSync = (source: string, dest: string): FileDataResult => {
  const destFile = `${dest}/${path.basename(source)}`;

  return fileCopySync(source, destFile);
};

// export const getSortedFilesFromDir = async (
//   source: string
// ): Promise<FileFromDirDataResult> => {
//   try {
//     const filesList = await fs.promises.readdir(source);

//     return {
//       error: false,
//       data: {
//         files: filesList
//           .map(filename => ({
//             fileLocation: `${source}/${filename}`,
//             modifiedAt: fs.statSync(`${source}/${filename}`).mtime,
//             createdAt: fs.statSync(`${source}/${filename}`).birthtime,
//           }))
//           .sort(
//             (fileA, fileB) =>
//               fileB.modifiedAt.getTime() - fileA.modifiedAt.getTime()
//           ),
//       },
//     };
//   } catch (err) {
//     const message =
//       err && typeof err === 'string'
//         ? err
//         : `Unable to read files from: ${source} - unknown reason`;

//     return {
//       error: true,
//       message,
//     };
//   }
// };

// const getValidProjectFiles = (
//   dirFiles: FileFromDirData[],
//   dbProjects: IS.StorageData[]
// ): FileFromDirData[] => {
//   dirFiles.forEach(dirFile => {
//     const fileNamePath = path.basename(dirFile.fileLocation);
//     const fileNameExt = path.extname(dirFile.fileLocation);
//     const fileName = path.basename(fileNamePath, fileNameExt);

//     dbProjects.forEach(dbProject => {
//       if (dbProject.id.toString() === fileName) {
//         dirFile.projectName = dbProject.name as string;
//       }
//     });
//   });

//   return dirFiles.filter(dirFile =>
//     Object.prototype.hasOwnProperty.call(dirFile, 'projectName')
//   );
// };

// export const getScrowlFiles = async (): Promise<FileFromDirDataResult> => {
//   const savingDir = await Preferences.get('save_folder_path');

//   if (!savingDir.save_folder_path) {
//     return {
//       error: true,
//       message:
//         'No saving directory has been set in the application preferences.',
//     };
//   } else {
//     const dirReadRes = await getSortedFilesFromDir(savingDir.save_folder_path);

//     const dbProjects = await Projects.get();

//     if (dirReadRes.error) {
//       return dirReadRes;
//     }

//     if (!dirReadRes.data?.files.length) {
//       return {
//         ...dirReadRes,
//         message: 'No recent files have been saved. Saving directory is empty.',
//       };
//     }

//     if (!dbProjects.length) {
//       return {
//         error: true,
//         message: 'No projects found in the database.',
//       };
//     }

//     const validProjectFiles = getValidProjectFiles(
//       dirReadRes.data?.files,
//       dbProjects
//     );

//     return {
//       ...dirReadRes,
//       data: {
//         files: validProjectFiles,
//       },
//     };
//   }
// };

// export const getRecentScrowlFiles = async () => {
//   const scrowlFilesRes = await getScrowlFiles();

//   const recentFilesList = scrowlFilesRes.data?.files.slice(0, 10);

//   if (!scrowlFilesRes.error) {
//     return {
//       ...scrowlFilesRes,
//       data: {
//         files: recentFilesList,
//       },
//     };
//   } else {
//     return scrowlFilesRes;
//   }
// };

const writeFile = (pathname: string, contents: unknown) => {
  return new Promise<FSResult>((resolve, reject) => {
    if (!pathname) {
      resolve(createResultError('Unable to write file: path required'));
      return;
    }

    if (!contents) {
      resolve(createResultError('Unable to write file: contents required'));
      return;
    }

    try {
      let fileData = contents;

      if (isJSON(pathname)) {
        if (typeof contents !== 'string') {
          fileData = JSON.stringify(contents, null, 2);
        } else {
          fileData = JSON.stringify(JSON.parse(contents), null, 2);
        }
      }

      fs.outputFile(pathname, fileData).then(() => {
        resolve({
          error: false,
          data: {
            pathname,
            contents: fileData,
          },
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const writeFileTemp = (filename: string, contents: unknown) => {
  return new Promise<FSResult>((resolve, reject) => {
    if (!filename) {
      resolve(
        createResultError(
          'Unable to write file to temp directory: filename required'
        )
      );
      return;
    }

    if (!contents) {
      resolve(
        createResultError(
          'Unable to write file to temp directory: contents required'
        )
      );
      return;
    }

    try {
      const pathname = `${pathTempFolder}/${filename}`;

      writeFile(pathname, contents).then(resolve).catch(reject);
    } catch (e) {
      reject(e);
    }
  });
};

export const writeFileSave = (filename: string, contents: unknown) => {
  return new Promise<FSResult>((resolve, reject) => {
    if (!filename) {
      resolve(
        createResultError(
          'Unable to write file to temp directory: filename required'
        )
      );
      return;
    }

    if (!contents) {
      resolve(
        createResultError(
          'Unable to write file to temp directory: contents required'
        )
      );
      return;
    }

    try {
      const pathname = `${pathSaveFolder}/${filename}`;

      writeFile(pathname, contents).then(resolve).catch(reject);
    } catch (e) {
      reject(e);
    }
  });
};

export const copyTempToSave = (source: string, dest: string) => {
  return new Promise<FSResult>(resolve => {
    if (!source) {
      resolve(
        createResultError('Unable to copy temp to source: source required')
      );
      return;
    }

    if (!dest) {
      resolve(
        createResultError('Unable to copy temp to source: destination required')
      );
      return;
    }

    try {
      const sourcePath = join(pathTempFolder, source);
      const destPath = join(pathSaveFolder, source);

      fs.copy(sourcePath, destPath)
        .then(() => {
          resolve({
            error: false,
            data: {
              source,
              sourcePath,
              dest,
              destPath,
            },
          });
        })
        .catch(e => {
          resolve(createResultError(`Unable to copy ${source} to ${dest}`, e));
        });
    } catch (e) {
      resolve(createResultError(`Unable to copy ${source} to ${dest}`, e));
    }
  });
};

const readDir = (pathname: string) => {
  return new Promise<FSResult>((resolve, reject) => {
    if (!pathname) {
      resolve(createResultError('Unable to read directory: path required'));
      return;
    }

    try {
      fs.readdir(pathname).then(() => {
        resolve({
          error: false,
          data: {
            pathname,
          },
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const readDirTemp = (pathname: string) => {
  return new Promise<FSResult>((resolve, reject) => {
    if (!pathname) {
      resolve(
        createResultError('Unable to read temp directory: path required')
      );
      return;
    }

    try {
      const tempPath = path.join(`${pathTempFolder}`, pathname);

      readDir(tempPath).then(resolve);
    } catch (e) {
      reject(e);
    }
  });
};

export const readDirSave = (pathname: string) => {
  return new Promise<FSResult>((resolve, reject) => {
    if (!pathname) {
      resolve(
        createResultError('Unable to read temp directory: path required')
      );
      return;
    }

    try {
      const savePath = path.join(`${pathSaveFolder}`, pathname);

      readDir(savePath).then(resolve);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  pathSaveFolder,
  pathTempFolder,
  join,
  ext,
  dirName,
  dirExistsSync,
  dirTempSync,
  fileExistsSync,
  fileReadSync,
  fileWriteSync,
  fileCopySync,
  fileTempSync,
  writeFileTemp,
  writeFileSave,
  readDirTemp,
  readDirSave,
  copyTempToSave,
};

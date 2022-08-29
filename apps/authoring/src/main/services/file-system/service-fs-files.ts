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

export const pathSaveFolder = app.getPath('userData');
export const pathTempFolder = path.join(app.getPath('temp'), 'scrowl');
export const pathDownloadsFolder = app.getPath('downloads');

export const getAssetPath = (sourceDir: string) => {
  const assetPath = __dirname.replace(
    join('services', 'file-system'),
    sourceDir
  );

  if (process.env.NODE_ENV === 'development') {
    return assetPath;
  }

  return assetPath.replace('Resources/app.asar/', '');
};

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

export const fileExistsSync = (pathname: string): FSResult => {
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

export const writeFile = (pathname: string, contents: unknown) => {
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

export const copy = (source: string, dest: string, opts?: fs.CopyOptions) => {
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
      if (!fs.pathExistsSync(source)) {
        resolve({
          error: true,
          message: `Unable to copy ${source}: path does not exist`,
          data: {
            source,
            dest,
          },
        });
        return;
      }

      fs.copy(source, dest, opts)
        .then(() => {
          resolve({
            error: false,
            data: {
              source,
              dest,
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

      copy(sourcePath, destPath).then(resolve);
    } catch (e) {
      resolve(createResultError(`Unable to copy temp ${source} to ${dest}`, e));
    }
  });
};

export const copySaveToTemp = (source: string, dest: string) => {
  return new Promise<FSResult>(resolve => {
    if (!source) {
      resolve(
        createResultError('Unable to copy save to source: source required')
      );
      return;
    }

    if (!dest) {
      resolve(
        createResultError('Unable to copy save to source: destination required')
      );
      return;
    }

    try {
      const sourcePath = join(pathSaveFolder, source);
      const destPath = join(pathTempFolder, source);

      copy(sourcePath, destPath).then(resolve);
    } catch (e) {
      resolve(createResultError(`Unable to copy save ${source} to ${dest}`, e));
    }
  });
};

export const readFile = (pathname: string) => {
  return new Promise<FSResult>(resolve => {
    if (!pathname) {
      resolve(createResultError('Unable to read file: path required'));
      return;
    }

    const existsRes = fileExistsSync(pathname);

    if (existsRes.error) {
      resolve(existsRes);
      return;
    }

    if (!existsRes.data.exists) {
      resolve(
        createResultError(
          `Unable to read file: file does not exist ${pathname}`
        )
      );
      return;
    }

    try {
      fs.readFile(pathname, { encoding: 'utf-8', flag: 'r' }).then(file => {
        resolve({
          error: false,
          data: {
            pathname,
            contents: isJSON(pathname) ? JSON.parse(file) : file,
          },
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: `Unable to read from: ${pathname}`,
        data: {
          trace: e,
        },
      });
    }
  });
};

export const readFileTemp = (pathname: string) => {
  return new Promise<FSResult>(resolve => {
    if (!pathname) {
      resolve(createResultError('Unable to read file: path required'));
      return;
    }

    try {
      const savePath = path.join(`${pathTempFolder}`, pathname);

      readFile(savePath).then(resolve);
    } catch (e) {
      resolve({
        error: true,
        message: `Unable to read from: ${pathname}`,
        data: {
          trace: e,
        },
      });
    }
  });
};

export const readFileSave = (pathname: string) => {
  return new Promise<FSResult>(resolve => {
    if (!pathname) {
      resolve(createResultError('Unable to read file: path required'));
      return;
    }

    try {
      const savePath = path.join(`${pathSaveFolder}`, pathname);

      readFile(savePath).then(resolve);
    } catch (e) {
      resolve({
        error: true,
        message: `Unable to read from: ${pathname}`,
        data: {
          trace: e,
        },
      });
    }
  });
};

const readDir = (pathname: string) => {
  return new Promise<FSResult>(resolve => {
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
      resolve({
        error: true,
        message: `Unable to read from: ${pathname}`,
        data: {
          trace: e,
        },
      });
    }
  });
};

export const readDirTemp = (pathname: string) => {
  return new Promise<FSResult>(resolve => {
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
      resolve({
        error: true,
        message: `Unable to read from: ${pathname}`,
        data: {
          trace: e,
        },
      });
    }
  });
};

export const readDirSave = (pathname: string) => {
  return new Promise<FSResult>(resolve => {
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
      resolve({
        error: true,
        message: `Unable to read from: ${pathname}`,
        data: {
          trace: e,
        },
      });
    }
  });
};

export default {
  pathSaveFolder,
  pathTempFolder,
  pathDownloadsFolder,
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
  writeFile,
  writeFileTemp,
  writeFileSave,
  readFile,
  readFileTemp,
  readFileSave,
  readDirTemp,
  readDirSave,
  copy,
  copyTempToSave,
  copySaveToTemp,
};

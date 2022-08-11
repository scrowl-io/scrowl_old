import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import {
  FileExistsResult,
  DirectoryTempResult,
  FileDataResult,
  FileFromDirDataResult,
  FileFromDirData,
} from './service-fs.types';
import { InternalStorage as IS } from '../../services';
import { Preferences, Projects } from '../../models';

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

export const getSortedFilesFromDir = async (
  source: string
): Promise<FileFromDirDataResult> => {
  try {
    const filesList = await fs.promises.readdir(source);

    return {
      error: false,
      data: {
        files: filesList
          .map(filename => ({
            fileLocation: `${source}/${filename}`,
            modifiedAt: fs.statSync(`${source}/${filename}`).mtime,
            createdAt: fs.statSync(`${source}/${filename}`).birthtime,
          }))
          .sort(
            (fileA, fileB) =>
              fileB.modifiedAt.getTime() - fileA.modifiedAt.getTime()
          ),
      },
    };
  } catch (err) {
    const message =
      err && typeof err === 'string'
        ? err
        : `Unable to read files from: ${source} - unknown reason`;

    return {
      error: true,
      message,
    };
  }
};

const getValidProjectFiles = (
  dirFiles: FileFromDirData[],
  dbProjects: IS.DatabaseData[]
): FileFromDirData[] => {
  dirFiles.forEach(dirFile => {
    const fileNamePath = path.basename(dirFile.fileLocation);
    const fileNameExt = path.extname(dirFile.fileLocation);
    const fileName = path.basename(fileNamePath, fileNameExt);

    dbProjects.forEach(dbProject => {
      if (dbProject.id.toString() === fileName) {
        dirFile.projectName = dbProject.name as string;
      }
    });
  });

  return dirFiles.filter(dirFile =>
    Object.prototype.hasOwnProperty.call(dirFile, 'projectName')
  );
};

export const getScrowlFiles = async (): Promise<FileFromDirDataResult> => {
  const savingDir = await Preferences.get('save_folder_path');

  if (!savingDir.save_folder_path) {
    return {
      error: true,
      message:
        'No saving directory has been set in the application preferences.',
    };
  } else {
    const dirReadRes = await getSortedFilesFromDir(savingDir.save_folder_path);

    const dbProjects = await Projects.get();

    if (dirReadRes.error) {
      return dirReadRes;
    }

    if (!dirReadRes.data?.files.length) {
      return {
        ...dirReadRes,
        message: 'No recent files have been saved. Saving directory is empty.',
      };
    }

    if (!dbProjects.length) {
      return {
        error: true,
        message: 'No projects found in the database.',
      };
    }

    const validProjectFiles = getValidProjectFiles(
      dirReadRes.data?.files,
      dbProjects
    );

    return {
      ...dirReadRes,
      data: {
        files: validProjectFiles,
      },
    };
  }
};

export const getRecentScrowlFiles = async () => {
  const scrowlFilesRes = await getScrowlFiles();

  const recentFilesList = scrowlFilesRes.data?.files.slice(0, 10);

  return {
    ...scrowlFilesRes,
    data: {
      files: recentFilesList,
    },
  };
};

export default {
  join,
  ext,
  dirExistsSync,
  dirTempSync,
  fileExistsSync,
  fileReadSync,
  fileWriteSync,
  fileCopySync,
  fileTempSync,
  getSortedFilesFromDir,
  getScrowlFiles,
  getRecentScrowlFiles,
};

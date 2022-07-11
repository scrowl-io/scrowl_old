import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import { FileData } from './types';

const normalize = (pathName: string) => {
  return path.normalize(pathName);
};

const isJSON = (name: string) => {
  return /.json$/.test(name) || /.project$/.test(name);
};

export const join = (...paths: Array<string>) => {
  return path.join.apply(null, paths);
};

export const ext = (pathName: string) => {
  return path.extname(pathName);
};

export const dirExistsSync = (pathName: string) => {
  try {
    return {
      error: false,
      exists: fs.existsSync(normalize(pathName)),
    };
  } catch (err) {
    return {
      error: true,
      exists: false,
      message: err,
    };
  }
};

export const dirTempSync = (prefix: string) => {
  let tmpDir;

  try {
    tmpDir = fs.mkdtempSync(
      path.join(os.tmpdir(), `${prefix ? `${prefix}_` : ''}`)
    );

    return {
      error: false,
      pathName: tmpDir,
    };
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const fileExistsSync = (pathName: string) => {
  try {
    return {
      error: false,
      exists: fs.pathExistsSync(pathName),
    };
  } catch (err) {
    return {
      error: true,
      exists: false,
      message: err,
    };
  }
};

export const fileReadSync = (
  pathName: string,
  media: BufferEncoding = 'utf8'
) => {
  const exists = fileExistsSync(pathName);

  if (exists.error) {
    return {
      error: true,
      message: exists.message,
    };
  }

  if (media === undefined) {
    media = 'utf8';
  }

  const filename = normalize(pathName);

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
      contents,
    };
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const fileWriteSync = (
  pathName: string,
  contents: unknown
): FileData => {
  const filename = normalize(pathName);

  if (!contents) {
    return {
      error: true,
      filename,
      message: 'no contents to write',
    };
  }

  try {
    if (isJSON(pathName)) {
      if (typeof contents !== 'string') {
        contents = JSON.stringify(contents, null, 2);
      } else {
        contents = JSON.stringify(JSON.parse(contents), null, 2);
      }
    }

    fs.outputFileSync(filename, contents);

    return {
      error: false,
      filename,
    };
  } catch (err) {
    return {
      error: true,
      filename,
      message: err,
    };
  }
};

export const fileCopySync = (source: string, dest: string): FileData => {
  const sourcePath = normalize(source);
  const destPath = normalize(dest);

  try {
    fs.copySync(sourcePath, destPath);

    return {
      error: false,
      filename: destPath,
    };
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const fileTempSync = (source: string, dest: string): FileData => {
  const destFile = `${dest}/${path.basename(source)}`;

  return fileCopySync(source, destFile);
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
};

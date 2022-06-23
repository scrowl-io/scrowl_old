import AdmZip from 'adm-zip';
import fs from 'fs-extra';
import os from 'os';
import path from 'path';

export const createTempDir = (prefix: string) => {
  let tmpDir;

  try {
    tmpDir = fs.mkdtempSync(
      path.join(os.tmpdir(), `${prefix ? `${prefix}_` : ''}`)
    );

    return {
      error: false,
      dirPath: tmpDir,
    };
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const copyFileToTempDir = (src: string, dest: string) => {
  const destFile = `${dest}/${path.basename(src)}`;

  fs.copy(src, destFile, err => {
    if (err) throw err;
  });
};

export const zipFile = (projectSrc: string, filePath: string) => {
  try {
    const zip = new AdmZip();

    zip.addLocalFolder(projectSrc);

    zip.writeZip(filePath);

    return {
      error: false,
      filePath: filePath,
    };
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const checkFileExists = async (file: string) => {
  const fileExists = await fs.pathExists(file);

  return fileExists;
};

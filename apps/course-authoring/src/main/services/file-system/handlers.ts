import { IpcMainInvokeEvent } from 'electron';
import fs from 'fs-extra';
import path from 'path';
import { createTempDir, createZipFile } from '../../util';
import { getOpenFilePath, getSaveFilePath } from './handlers/dialog';

import { FileFilters, OpenFileData, SaveFileData } from './types';

const FileFilters: FileFilters = {
  image: { name: 'Image', extensions: ['jpg', 'jpeg', 'png'] },
  video: { name: 'Video', extensions: ['mp4', 'mkv', 'avi'] },
  scrowl: { name: 'Scrowl Project', extensions: ['scrowl'] },
};

const zipProject = (projectSrc: string, filePath: string) => {
  try {
    createZipFile(projectSrc, filePath);

    return {
      message: 'Project saved successfully',
      error: false,
    };
  } catch (err) {
    return {
      message: err,
      error: true,
    };
  }
};

const copyFile = (src: string, dest: string) => {
  const destFile = `${dest}/${path.basename(src)}`;

  fs.copy(src, destFile, err => {
    if (err) console.log(err);
    console.log('copied to destination');
  });
};

export const openFile = async (
  event: IpcMainInvokeEvent,
  fileTypes: string[],
  projectDir: string
) => {
  const filters = fileTypes.map(type => FileFilters[type]);

  const dialogOptions = {
    title: 'Scrowl - Open File',
    filters: filters,
  };

  const fileData: OpenFileData = await getOpenFilePath(dialogOptions);

  if (fileData.filePaths.length) {
    copyFile(fileData.filePaths[0], projectDir);
  }

  return fileData;
};

export const saveProject = async () => {
  const projectSrc = '/Users/cicerofonseca/Desktop/course-example';

  const dialogOptions = {
    title: 'Scrowl - Save Project',
    filters: [
      {
        name: 'Scrowl Project',
        extensions: ['scrowl'],
      },
    ],
  };

  const fileData: SaveFileData = await getSaveFilePath(dialogOptions);

  if (fileData.error) {
    return fileData;
  }

  if (fileData.filePath) {
    return zipProject(projectSrc, fileData.filePath);
  }
};

export const newProject = () => {
  const tempDir = createTempDir();

  console.log(tempDir);

  return tempDir;
};

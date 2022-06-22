import { IpcMainInvokeEvent } from 'electron';
import { createZipFile } from '../../util';
import { getOpenFilePath, getSaveFilePath } from './handlers/dialog';

import { FileData, FileFilters } from './types';

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

export const openFile = async (event: IpcMainInvokeEvent, args: string[]) => {
  const filters = args.map(arg => FileFilters[arg]);

  const dialogOptions = {
    title: 'Scrowl - Open File',
    filters: filters,
  };

  const fileData = await getOpenFilePath(dialogOptions);

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

  const fileData: FileData = await getSaveFilePath(dialogOptions);

  if (fileData.error) {
    return fileData;
  }

  if (fileData.filePath) {
    return zipProject(projectSrc, fileData.filePath);
  }
};

export const newProject = () => {
  console.log('New Project...');
};

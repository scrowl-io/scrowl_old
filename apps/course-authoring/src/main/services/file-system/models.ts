import { IpcMainInvokeEvent, SaveDialogOptions } from 'electron';
import { getOpenFilePath, getSaveFilePath } from './handlers/dialog';
import {
  checkFileExists,
  copyFileToTempDir,
  createFile,
  createTempDir,
  zipFile,
} from './handlers/file-system';
import { FileFilters, OpenFileData, SaveFileData } from './types';

const FileFilters: FileFilters = {
  image: { name: 'Image', extensions: ['jpg', 'jpeg', 'png'] },
  video: { name: 'Video', extensions: ['mp4', 'mkv', 'avi'] },
  scrowl: { name: 'Scrowl Project', extensions: ['scrowl'] },
};

export const newProject = (event: IpcMainInvokeEvent, courseJson: unknown) => {
  const dirPrefix = 'scrowl';
  const projectFileName = 'scrowl.project';
  const tempDir = createTempDir(dirPrefix);

  if (tempDir.dirPath)
    createFile(
      `${tempDir.dirPath}/${projectFileName}`,
      JSON.stringify(courseJson)
    );

  return tempDir;
};

export const importFile = async (
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
    fileData.filePaths[0] = await copyFileToTempDir(
      fileData.filePaths[0],
      projectDir
    );
  }

  return fileData;
};

const saveProjectDialog = async (
  dialogOptions: SaveDialogOptions,
  projectDir?: string
) => {
  const fileData: SaveFileData = await getSaveFilePath(dialogOptions);

  if (fileData.error) {
    return fileData;
  }

  if (fileData.filePath && projectDir) {
    return zipFile(projectDir, fileData.filePath);
  }
};

export const saveProject = async (
  event: IpcMainInvokeEvent,
  projectDir: string,
  projectFile: string
) => {
  const dialogOptions = {
    title: 'Scrowl - Save Project',
    filters: [
      {
        name: 'Scrowl Project',
        extensions: ['scrowl'],
      },
    ],
  };

  if (!projectFile) {
    return saveProjectDialog(dialogOptions, projectDir);
  }

  const fileExists = await checkFileExists(projectFile);

  if (fileExists) {
    return zipFile(projectDir, projectFile);
  } else {
    return saveProjectDialog(dialogOptions, projectDir);
  }
};

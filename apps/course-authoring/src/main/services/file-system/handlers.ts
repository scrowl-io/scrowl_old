import { dialog, IpcMainInvokeEvent, shell } from 'electron';
import fs from 'fs-extra';
import { FileData, FileFilters } from './types';

const FileFilters: FileFilters = {
  image: { name: 'Image', extensions: ['jpg', 'jpeg', 'png'] },
  video: { name: 'Video', extensions: ['mp4', 'mkv', 'avi'] },
  scrowl: { name: 'Scrowl Project', extensions: ['scrowl'] },
};

export const openFileDialog = async (
  event: IpcMainInvokeEvent,
  args: string[]
) => {
  const filters = args.map(arg => FileFilters[arg]);

  const filePath = await dialog
    .showOpenDialog({
      properties: ['openFile'],
      message: 'Scrowl - Open File',
      filters: filters,
    })
    .then(res => {
      if (!res.canceled) {
        return res.filePaths[0];
      }
    });

  return filePath;
};

export const saveProject = async () => {
  const fileData = {} as FileData;

  fileData.file = await dialog
    .showSaveDialog({
      title: 'Scrowl - Save Project',
      filters: [
        {
          name: 'Scrowl Project',
          extensions: ['scrowl'],
        },
      ],
    })
    .then(res => {
      const filePath = res.filePath;

      if (!filePath) return;

      fs.writeFile(filePath, 'File content or files...', err => {
        if (err) {
          fileData.error = `An error ocurred creating the file: ${err.message}`;
        }
      });

      return filePath;
    });

  if (!fileData.error)
    dialog
      .showMessageBox({
        title: 'Success',
        message: 'Project saved successfully.',
        buttons: ['Show in finder', 'Ok'],
        defaultId: 1,
      })
      .then(res => {
        if (res.response === 0 && fileData.file)
          shell.showItemInFolder(fileData.file);
      });

  return fileData;
};

import { dialog, IpcMainInvokeEvent } from 'electron';
import fs from 'fs-extra';
import { FileTypes } from './types';

const FileFilters: FileTypes = {
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
  const file = await dialog
    .showSaveDialog({
      title: 'Save Scrowl project as...',
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

      fs.writeFile(filePath, 'test', err => {
        if (err) {
          console.log('An error ocurred creating the file ' + err.message);
        }

        // TODO: Validate error and user closing the save file dialog

        console.log('The file has been succesfully saved');
      });

      return filePath;
    });

  return file;
};

import { dialog, IpcMainInvokeEvent } from 'electron';
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
  const filePath = dialog
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
      console.log(res);

      // if (!fileName) return;

      // fs.writeFile(fileName, 'test', err => {
      //   if (err) {
      //     alert('An error ocurred creating the file ' + err.message);
      //   }

      //   alert('The file has been succesfully saved');
      // });
    });

  return filePath;
};

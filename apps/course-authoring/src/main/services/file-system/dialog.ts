import { dialog, OpenDialogOptions, SaveDialogOptions } from 'electron';
import { OpenFileData, SaveFileData, FileFilters, AllowedFiles } from './types';

export const MEDIA_TYPES: FileFilters = {
  image: { name: 'Image', extensions: ['jpg', 'jpeg', 'png'] },
  video: { name: 'Video', extensions: ['mp4', 'mkv', 'avi'] },
  project: { name: 'Scrowl Project', extensions: ['scrowl'] },
};

export const getDialogMediaFilters = (filters: Array<AllowedFiles>) => {
  return filters.map(filter => MEDIA_TYPES[filter]);
};

export const dialogOpen = (options: OpenDialogOptions) => {
  return new Promise<OpenFileData>((resolve, reject) => {
    dialog
      .showOpenDialog(options)
      .then(({ canceled, filePaths }: OpenFileData) => {
        resolve({
          error: false,
          canceled,
          filePaths,
        });
      })
      .catch(err => {
        reject({
          filePaths: [],
          canceled: false,
          error: true,
          message: err,
        });
      });
  });
};

export const dialogSave = (options: SaveDialogOptions) => {
  return new Promise<SaveFileData>((resolve, reject) => {
    dialog
      .showSaveDialog(options)
      .then(({ canceled, filePath }: SaveFileData) => {
        resolve({
          error: false,
          canceled,
          filePath,
        });
      })
      .catch(err => {
        reject({
          filePath: '',
          canceled: false,
          error: true,
          message: err,
        });
      });
  });
};

export default {
  dialogOpen,
  dialogSave,
};

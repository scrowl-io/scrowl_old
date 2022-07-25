import { dialog, OpenDialogOptions, SaveDialogOptions } from 'electron';
import {
  DialogOpenResult,
  DialogSaveResult,
  FileFilters,
  AllowedFiles,
} from './service-fs.types';

export const MEDIA_TYPES: FileFilters = {
  image: { name: 'Image', extensions: ['jpg', 'jpeg', 'png'] },
  video: { name: 'Video', extensions: ['mp4', 'mkv', 'avi'] },
  project: { name: 'Scrowl Project', extensions: ['scrowl'] },
};

export const getDialogMediaFilters = (filters: Array<AllowedFiles>) => {
  return filters.map(filter => MEDIA_TYPES[filter]);
};

export const dialogOpen = (options: OpenDialogOptions) => {
  return new Promise<DialogOpenResult>((resolve, reject) => {
    dialog
      .showOpenDialog(options)
      .then(({ canceled, filePaths }) => {
        resolve({
          error: false,
          data: {
            canceled,
            filePaths,
          },
        });
      })
      .catch(err => {
        const message =
          err && typeof err === 'string'
            ? err
            : `Unable to open dialog - unknown reason`;

        reject({
          error: true,
          message,
        });
      });
  });
};

export const dialogSave = (options: SaveDialogOptions) => {
  return new Promise<DialogSaveResult>((resolve, reject) => {
    dialog
      .showSaveDialog(options)
      .then(({ canceled, filePath }) => {
        resolve({
          error: false,
          data: {
            canceled,
            filePath,
          },
        });
      })
      .catch(err => {
        const message =
          err && typeof err === 'string'
            ? err
            : `Unable to save dialog - unknown reason`;

        reject({
          error: true,
          message,
        });
      });
  });
};

export default {
  dialogOpen,
  dialogSave,
};

import { dialog, OpenDialogOptions, SaveDialogOptions } from 'electron';
import { FileData } from '../types';

export const getOpenFilePath = async (
  options: OpenDialogOptions
): Promise<FileData> => {
  try {
    return await dialog.showOpenDialog(options);
  } catch (err) {
    return {
      filePath: '',
      canceled: false,
      error: true,
      message: err,
    };
  }
};

export const getSaveFilePath = async (
  options: SaveDialogOptions
): Promise<FileData> => {
  try {
    return await dialog.showSaveDialog(options);
  } catch (err) {
    return {
      filePath: '',
      canceled: false,
      error: true,
      message: err,
    };
  }
};

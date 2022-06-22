import { dialog, OpenDialogOptions, SaveDialogOptions } from 'electron';
import { OpenFileData, SaveFileData } from '../types';

export const getOpenFilePath = async (
  options: OpenDialogOptions
): Promise<OpenFileData> => {
  try {
    return await dialog.showOpenDialog(options);
  } catch (err) {
    return {
      filePaths: [],
      canceled: false,
      error: true,
      message: err,
    };
  }
};

export const getSaveFilePath = async (
  options: SaveDialogOptions
): Promise<SaveFileData> => {
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

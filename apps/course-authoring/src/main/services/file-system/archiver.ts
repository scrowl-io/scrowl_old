import AdmZip from 'adm-zip';
import { SaveFileData } from './types';

export const archive = (source: string, dest: string): SaveFileData => {
  try {
    const zip = new AdmZip();

    zip.addLocalFolder(source);

    zip.writeZip(dest);

    return {
      error: false,
      filePath: dest,
    };
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};

export default {
  archive,
};

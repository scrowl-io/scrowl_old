import AdmZip from 'adm-zip';
import { FileDataResult } from './service-fs.types';

export const archive = (source: string, dest: string): FileDataResult => {
  try {
    const zip = new AdmZip();

    zip.addLocalFolder(source);

    zip.writeZip(dest);

    return {
      error: false,
      data: {
        filename: dest,
      }
    };
  } catch (err) {
    const message = err && typeof err === 'string' ? err : `Unable to archive: ${source} to ${dest} - unknown reason`;

    return {
      error: true,
      message,
    };
  }
};

export default {
  archive,
};

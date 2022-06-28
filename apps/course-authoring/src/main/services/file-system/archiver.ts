import AdmZip from 'adm-zip';

export const archive = (source: string, dest: string) => {
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

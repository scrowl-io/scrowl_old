/* eslint import/prefer-default-export: off, import/no-mutable-exports: off */
import { URL } from 'url';
import path from 'path';
import AdmZip from 'adm-zip';

export let resolveHtmlPath: (htmlFileName: string) => string;

if (process.env.NODE_ENV === 'development') {
  const port = process.env.PORT || 1234;
  resolveHtmlPath = (htmlFileName: string) => {
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  };
} else {
  resolveHtmlPath = (htmlFileName: string) => {
    return `file://${path.join(__dirname, '../../', 'dist', htmlFileName)}`;
  };
}

export const createZipFile = (src: string, dest: string) => {
  const zip = new AdmZip();

  zip.addLocalFolder(src);

  zip.writeZip(dest);
};

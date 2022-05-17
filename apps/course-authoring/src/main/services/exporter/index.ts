import path from 'path';
import fs from 'fs-extra';
import { ipcMain } from 'electron';
import packager from '@liascript/simple-scorm-packager';
import { PathingProps, PathingKey } from './types';

const pathing: PathingProps = {
  source: path.join(__dirname, 'course-template'),
  out: path.join(__dirname, 'course-packs'),
};

const setPathing = () => {
  let dest = '' as PathingKey;

  for (dest in pathing) {
    if (!fs.existsSync(pathing[dest])) {
      fs.mkdirSync(pathing[dest]);
    }
  }
};

export const pack = () => {
  return new Promise(resolve => {
    const config = {
      version: '1.2',
      organization: 'OSG',
      language: 'en-US',
      startingPage: 'content/index.html',
      source: pathing.source,
      package: {
        version: '0.0.1',
        zip: true,
        outputFolder: pathing.out,
      },
    };

    setPathing();
    packager(config, (msg: string) => {
      resolve(msg);
    });
  });
};

export const EVENTS = {
  package: 'package-course',
};

export const init = () => {
  ipcMain.handle(EVENTS.package, pack);
};

export default {
  EVENTS,
  init,
  pack,
};

import path from 'path';
import fs from 'fs-extra';
import packager from 'scorm-packager';
import { PathingProps, PathingKey, ExporterEvents } from './service-exporter.types';
import { registerAll, RegisterEventType } from '../requester';

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

export const EVENTS:ExporterEvents = {
  package: {
    name: 'package-course',
    type: 'invoke',
    fn: pack,
  },
};

export const init = () => {
  registerAll(EVENTS);
};

export const getEvents = (
  type: RegisterEventType
) => {
  const eventList: Array<string> = [];

  for (const [key, event] of Object.entries(EVENTS)) {

    if (event.type === type) {
      eventList.push(event.name);
    }
  }

  return eventList;
}

export default {
  EVENTS,
  init,
  pack,
};

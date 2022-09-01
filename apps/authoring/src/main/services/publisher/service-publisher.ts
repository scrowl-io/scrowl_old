import packager from 'scorm-packager';
import { PublisherEvents } from './service-publisher.types';
import { ProjectData } from '../../models/projects/model-projects.types';
import { registerAll, ApiResult } from '../requester';
import { compile } from '../templater';
import {
  pathTempFolder,
  pathDownloadsFolder,
  getAssetPath,
  join,
  copy,
  readFile,
  writeFile,
} from '../file-system';

const publisherAssetPath = () => {
  return getAssetPath(join('services', 'publisher'));
};

const createScormSource = (source: string, dist: string) => {
  return new Promise<ApiResult>(resolve => {
    try {
      const templatesPath = join(
        publisherAssetPath(),
        'project',
        'package',
        'content'
      );
      const dest = join(dist, 'content');

      const opts = {
        filter: (src: string) => {
          return src.indexOf('manifest.json') === -1;
        },
      };

      copy(source, dest, opts).then(copyRes => {
        if (copyRes.error) {
          resolve(copyRes);
          return;
        }

        copy(templatesPath, dist).then(resolve);
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to create scorm source files',
        data: {
          trace: e,
          dist,
          source,
        },
      });
    }
  });
};

const createScormEntry = (source: string, dest: string) => {
  return new Promise<ApiResult>(resolve => {
    try {
      const manifestSource = join(source, 'manifest.json');
      readFile(manifestSource).then(readManifest => {
        if (readManifest.error) {
          resolve(readManifest);
          return;
        }

        const manifest = readManifest.data.contents;
        const entrySource = join(
          publisherAssetPath(),
          'project',
          'templates',
          'index.hbs'
        );

        readFile(entrySource).then(readEntry => {
          if (readEntry.error) {
            resolve(readEntry);
            return;
          }

          const entryRes = compile(readEntry.data.contents, {
            manifest: JSON.stringify(manifest),
          });

          if (entryRes.error) {
            resolve(entryRes);
            return;
          }

          const entryDest = join(dest, 'content', 'index.html');
          const entryFile = entryRes.data.contents;

          writeFile(entryDest, entryFile).then(resolve);
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to create scorm entry',
        data: {
          trace: e,
          source,
          dest,
        },
      });
    }
  });
};

const toScormCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

const createScormPackage = (source: string, projectName?: string) => {
  return new Promise<ApiResult>(resolve => {
    if (!projectName) {
      resolve({
        error: true,
        message: 'Unable to create scorm package: project name missing',
      });
      return;
    }

    try {
      const config = {
        version: '1.2',
        organization: 'OSG',
        language: 'en-US',
        startingPage: 'content/index.html',
        source: source,
        package: {
          name: toScormCase(projectName),
          version: '0.0.1',
          zip: true,
          outputFolder: pathDownloadsFolder,
        },
      };

      packager(config, (message: string) => {
        resolve({
          error: false,
          data: {
            message,
          },
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to create scorm package',
        data: {
          trace: e,
          path: source,
          projectName,
        },
      });
    }
  });
};

export const pack = (project: ProjectData) => {
  return new Promise<ApiResult>(resolve => {
    if (!project || !project.id) {
      resolve({
        error: true,
        message: 'Unable to publish project: project data required',
      });
      return;
    }

    try {
      const source = join(pathTempFolder, project.id.toString());
      const dest = join(pathTempFolder, 'dist');

      createScormSource(source, dest).then(sourceRes => {
        if (sourceRes.error) {
          resolve(sourceRes);
          return;
        }

        createScormEntry(source, dest).then(entryRes => {
          if (entryRes.error) {
            resolve(entryRes);
            return;
          }

          createScormPackage(dest, project.name).then(resolve);
        });
      });
    } catch (e) {
      resolve({
        error: true,
        message: 'Failed to publish project',
        data: {
          trace: e,
          project,
        },
      });
    }
  });
};

export const EVENTS: PublisherEvents = {
  package: {
    name: 'publish-project',
    type: 'invoke',
    fn: pack,
  },
};

export const init = () => {
  registerAll(EVENTS);
};

export default {
  EVENTS,
  init,
  pack,
};

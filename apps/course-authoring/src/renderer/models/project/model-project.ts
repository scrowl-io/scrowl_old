import {
  AllowedFiles,
  FileData,
} from '../../../main/services/file-system/service-fs.types';
import { EVENTS } from '../../../main/models/project';
import { Project } from '../../pages/home/data.types';
import { requester } from '../../services';

// export const create = (project: Project) => {
//   return new Promise<FileData>((resolve, reject) => {
//     requester.invoke(EVENTS.new.save, project)
//       .then((res: FileData) => {
//         if (res.error) {
//           resolve(res);
//           return;
//         }

//         if (res.filename) {
//           res.dir = res.filename.split('/').slice(0, -1).join('/');
//         }

//         resolve(res);
//       })
//       .catch(reject);
//   });
// };

function create() {
  console.log(arguments)
}

export const init = (projectData) => {
  requester.newProject(create);
};

export const save = (project: string, isSaveAs: boolean, source?: string) => {
  return requester.invoke(EVENTS.save.name, project, isSaveAs, source);
};

export const importFile = (fileTypes: AllowedFiles[], source: string) => {
  return requester.invoke(EVENTS.import.name, fileTypes, source);
};

export default {
  create,
  save,
  importFile,
};

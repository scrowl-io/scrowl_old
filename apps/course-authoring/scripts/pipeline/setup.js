import fs from '../utils/file-system.js';

const fileMap = {
  'node_modules/scorm-again/dist/scorm12.js': {
    dest: './src/main/services/exporter/course-template/content/scorm12.js',
    includePaths: ['../../'],
  },
};

const getFile = (source, includePaths) => {
  let contents;
  let pathChecks = ['./'];
  let filepath;

  if (Array.isArray(includePaths) && includePaths.length) {
    pathChecks = pathChecks.concat(includePaths);
  }

  for (let i = 0, ii = pathChecks.length; i < ii; i++) {
    filepath = `${pathChecks[i]}${source}`;
    contents = fs.getFile(filepath);

    if (contents) {
      break;
    }
  }

  return {
    filepath,
    contents,
  };
};

const copy = () => {
  for (let file in fileMap) {
    let { contents } = getFile(file, fileMap[file].includePaths);

    if (!contents) {
      continue;
    }

    if (fileMap[file].transformer) {
      contents = fileMap[file].transformer(contents);
    }

    fs.setFile(fileMap[file].dest, contents);
  }
};

copy();

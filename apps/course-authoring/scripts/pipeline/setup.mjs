/*
  This file is currently not being use in anyway.

  It was created as we originally thought we would have to ship the scorm runtime api with each course.

  What this file does, is that it looks up files and copies them into a destination.

  This is to serve as an example incase we need this type of functionality in the future.
*/

import fs from '../utils/file-system.mjs';

// This map uses the key to declare a path to the source file
const fileMap = {
  'node_modules/scorm-again/dist/scorm12.js': {
    dest: './src/main/services/exporter/course-template/content/scorm12.js', // this is the target destination of the file to be copied to
    includePaths: ['../../'], // because this is a mono-repo files may not be located at the project level, this allows the source file to be search in other locations
  },
};

const getFile = (source, includePaths) => {
  // this function attempts to find the source file at the project location and any declared location in includesPaths (if any exists)
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
    // get the contents of the source file
    let { contents } = getFile(file, fileMap[file].includePaths);

    if (!contents) {
      continue;
    }

    if (fileMap[file].transformer) {
      // apply a transformation if there is one
      contents = fileMap[file].transformer(contents);
    }

    fs.setFile(fileMap[file].dest, contents); // write the file to the target destination
  }
};

copy();

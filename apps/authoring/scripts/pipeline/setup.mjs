import fs from '../utils/file-system.mjs';

const addDefaultExports = (code, exporting) => {
  const moduleDefaults = exporting.join(',\n');
  return `${code}\nexport default {\n${moduleDefaults},\n};\n`;
};

const reactToES = code => {
  const wrapStart = /if(.)*\n(.)*(\n)*(.*)'use strict';\n/g;
  const wrapEnd = /\}\)\(\);\n}\n$/g;
  const unwrapped = code.replace(wrapStart, '').replace(wrapEnd, '');
  const importing = /(?:var)(.*)=(?: require\(')(.*)(?:'\);)/g;
  const exporting = /(?:exports\.)(.*)(?:=)(.*);/g;
  const replaceDeclarations = [];
  const defaultExports = [];
  const imported = unwrapped.replace(importing, (match, prop, val) => {
    prop = prop.trim();
    val = val.trim();

    return `import ${prop} from '${val}'`;
  });
  let exported = imported.replace(exporting, (match, prop, val) => {
    prop = prop.trim();
    val = val.trim();

    if (prop !== val) {
      if (val.includes(prop)) {
        defaultExports.push(`  ${prop}: ${val}`);
        return '';
      }

      defaultExports.push(`  ${prop}`);
      return `export const ${prop} = ${val};`;
    }

    defaultExports.push(`  ${prop}`);
    replaceDeclarations.push(prop);
    return '';
  });

  if (!replaceDeclarations.length) {
    return addDefaultExports(exported, defaultExports);
  }

  replaceDeclarations.forEach(prop => {
    const re = new RegExp(`(?:var ${prop} = )(.*);`);

    exported = exported.replace(re, (match, val) => {
      val = val.trim();
      return `export const ${prop} = ${val};`;
    });
  });

  return addDefaultExports(exported, defaultExports);
};

// This map uses the key to declare a path to the source file
const sourceMap = {
  'node_modules/@scrowl/runtime/dist/scrowl.runtime.js': {
    dest: './src/main/services/publisher/project/package/content/scrowl.runtime.js', // this is the target destination of the file to be copied to
    includePaths: ['../../'], // because this is a mono-repo files may not be located at the project level, this allows the source file to be search in other locations
  },
  'node_modules/@scrowl/runtime/dist/scrowl.runtime.js.map': {
    dest: './src/main/services/publisher/project/package/content/scrowl.runtime.js.map', // this is the target destination of the file to be copied to
    includePaths: ['../../'], // because this is a mono-repo files may not be located at the project level, this allows the source file to be search in other locations
  },
  'node_modules/@scrowl/player/dist': {
    dest: './src/main/services/publisher/project/package/content/',
    includePaths: ['../../'],
    options: {
      overwrite: true,
      filter: (source, dest) => {
        return source.indexOf('.d.ts') === -1;
      },
    },
  },
  'node_modules/scrowl-template-introduction/build': {
    dest: './src/main/models/templates/assets/template-introduction',
    includePaths: ['../../'],
    options: {
      overwrite: true,
    },
  },
  'node_modules/react/cjs/react.development.js': {
    dest: './src/main/models/templates/assets/workspace/react.development.js',
    includePaths: ['../../'],
    transformer: contents => {
      return reactToES(contents);
    },
  },
  // 'node_modules/scheduler/cjs/scheduler.development.js': {
  //   dest: './src/main/models/templates/assets/workspace/scheduler.development.js',
  //   includePaths: ['../../'],
  //   transformer: contents => {
  //     return reactToES(contents);
  //   },
  // },
  // 'node_modules/react-dom/cjs/react-dom.development.js': {
  //   dest: './src/main/models/templates/assets/workspace/react-dom.development.js',
  //   includePaths: ['../../'],
  //   transformer: contents => {
  //     return reactToES(contents);
  //   },
  // },
  'node_modules/react/cjs/react-jsx-runtime.development.js': {
    dest: './src/main/models/templates/assets/workspace/react-jsx-runtime.development.js',
    includePaths: ['../../'],
    transformer: contents => {
      return reactToES(contents);
    },
  },
};

const findPath = (source, includePaths) => {
  // this function attempts to find the source file at the project location and any declared location in includesPaths (if any exists)
  if (!includePaths) {
    return source;
  }

  if (!Array.isArray(includePaths)) {
    throw new Error(`Paths to check must be an array: ${includePaths}`);
  }

  let checkPath, filePath;
  let pathChecks = includePaths.length ? ['./'].concat(includePaths) : ['./'];

  for (let i = 0, ii = pathChecks.length; i < ii; i++) {
    checkPath = `${pathChecks[i]}${source}`;

    if (fs.pathExistsSync(checkPath)) {
      filePath = checkPath;
      break;
    }
  }

  return filePath;
};

const copyDir = (source, options) => {
  fs.copySync(source, options.dest, options.options);
};

const copyFile = (source, options) => {
  let contents = fs.getFile(source);

  if (!contents) {
    return;
  }

  if (options.transformer) {
    // apply a transformation if there is one
    contents = options.transformer(contents);
  }

  fs.setFile(options.dest, contents); // write the file to the target destination
};

const copy = () => {
  let pathname;

  for (let source in sourceMap) {
    pathname = findPath(source, sourceMap[source].includePaths);

    if (!pathname) {
      continue;
    }

    if (fs.isDirectory(pathname)) {
      copyDir(pathname, sourceMap[source]);
    } else {
      copyFile(pathname, sourceMap[source]);
    }
  }
};

copy();

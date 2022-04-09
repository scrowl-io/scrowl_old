const { Resolver } = require('@parcel/plugin');
const path = require('path');

module.exports = new Resolver({
  async resolve({specifier, dependency }) {
    const nodeModuleRegex = /\/node_modules\//g

    if (dependency.specifierType === 'url' && dependency.loc.filePath.match(nodeModuleRegex)) {
      const dirname = path.dirname(dependency.loc.filePath);

      return path.resolve(dirname, specifier);
    }

    return null;
  }
});
const fs = require('fs');
const { Resolver } = require('@parcel/plugin');
const { pathToFileURL } = require('url');

const findUrlPath = (lookup, logger) => {
  const loadPaths = ["../../node_modules/", "./node_modules/", "../../packages/", "./"];
  let filepath = lookup.startsWith(`~`) ? lookup.substring(1) : lookup;
  let toUrl = '';

  const filePaths = loadPaths
    .map((dir) => {
      toUrl = pathToFileURL(dir);

      return {
        url: new URL(`${toUrl}${filepath}`),
        pathname: `${toUrl.pathname}${filepath}`
      }
    })
    .filter((item) => {
      return fs.existsSync(item.url);
    })
  
  return filePaths[0].pathname;
}

module.exports = new Resolver({
  async resolve({ dependency, options, specifier, logger }) {
    const nodeModuleRegex = /node_modules\//g;
    const themePackageRegex = /@owlui\/theme\//g;
    const isNodeModule = specifier.match(nodeModuleRegex);
    const isThemePackage = specifier.match(themePackageRegex);

    if (
      dependency.specifierType === 'url' &&
      dependency.loc &&
      (isNodeModule || isThemePackage)
    ) {
      const url = isThemePackage ? findUrlPath(specifier, logger) : pathToFileURL(specifier).pathname;
      
      return {
        filePath: url,
      };
    }

    return null;
  },
});
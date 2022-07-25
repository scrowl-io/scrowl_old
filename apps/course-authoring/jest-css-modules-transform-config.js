const sassConfig = require('./.sassrc.json');
const postcssConfig = require('./.postcssrc.json');

const setPostCssPlugins = () => {
  const pluginList = [];

  for (let plugin in postcssConfig.plugins) {
    pluginList.push(require(plugin)(postcssConfig.plugins[plugin]));
  }

  return pluginList;
}

module.exports = {
  sassConfig,
  postcssConfig: {
    plugins: setPostCssPlugins(),
  },
};
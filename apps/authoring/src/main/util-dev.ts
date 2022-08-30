import { FileSystem as fs } from './services';

export const updateDevEnv = () => {
  const configPath = fs.join(__dirname, '../../scripts/pipeline/dev.env.json');
  const configRes = fs.fileReadSync(configPath);

  if (configRes.error) {
    console.error(configRes);
    return;
  }

  const config = configRes.data.contents;

  config.restart++;
  process.env.restart = config.restart.toString();
  fs.fileWriteSync(configPath, config);
};

export default {
  updateDevEnv,
};

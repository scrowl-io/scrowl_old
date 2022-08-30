import fs from '../utils/file-system.mjs';

const configPath = './scripts/pipeline/dev.env.json';
let config = fs.getFile(fs.join(configPath));

if (!config) {
  config = {};
}

config.restart = 0;
fs.setFile(fs.join(configPath), config);

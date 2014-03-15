
var fs = require('fs'),
    defaultConfigPath = './default_config.json',
    configPath = './config.json',
    configRaw,
    config;

try {
    configRaw = fs.readFileSync(configPath);
    config = JSON.parse(configRaw);
} catch (err) {
    // config file doesn't exist, create a new config file
    // with default settings from default_config.json
    configRaw = fs.readFileSync(defaultConfigPath);
    config = JSON.parse(configRaw);
    fs.writeFile(configPath, JSON.stringify(config, null, 4));
} finally {
    module.exports = config;
}

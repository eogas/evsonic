
var fs = require('fs'),
    defaultConfigPath = './default_config.json',
    configPath = './config.json',
    configRaw,
    config,
    changed = false;

try {
    configRaw = fs.readFileSync(defaultConfigPath);
    defaultConfig = JSON.parse(configRaw);
    configRaw = fs.readFileSync(configPath);
    config = JSON.parse(configRaw);
    // check if new options have been added to default_config
    for (var prop in defaultConfig) {
        if (!config.hasOwnProperty(prop)) {
            changed = true;
            config[prop] = defaultConfig[prop];
        }
    }
     // create new config file if changes found
     if (changed) {
        fs.writeFile(configPath, JSON.stringify(config, null, 4));
    }
} catch (err) {
    // config file doesn't exist, create a new config file
    // with default settings from default_config.json
    config = defaultConfig;
    fs.writeFile(configPath, JSON.stringify(config, null, 4));
} finally {
    module.exports = config;
}

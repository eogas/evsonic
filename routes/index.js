
module.exports = function(app) {
    // export all of the routes
    exports.home = require('./home.js')(app);
    exports.home = require('./login.js')(app);
    exports.home = require('./logout.js')(app);
    exports.home = require('./music.js')(app);
    exports.home = require('./register.js')(app);
    exports.home = require('./settings.js')(app);
    exports.home = require('./video.js')(app);
};

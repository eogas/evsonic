/// <reference path="../typings/node/node.d.ts"/>

module.exports = function(app) {
    // session/auth routes
    exports.session = require('./session.js')(app);
    exports.user = require('./user.js')(app);

    // other routes
    exports.mediadir = require('./mediadir.js')(app);
    exports.mediainfo = require('./mediainfo.js')(app);
    exports.mediafile = require('./mediafile.js')(app);
};

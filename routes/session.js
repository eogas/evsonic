
var passport = require('passport');

module.exports = function(app) {
    app.post('/session', passport.authenticate('local'), function(req, res) {
        res.redirect('/');
    });

    app.delete('/session', function(req, res) {
        req.logout();
        res.sendStatus(200);
    });
};


var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    models = require('./models');

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    models.User.find({
        username: username
    }, 1, function(err, items) {
        done(err, err || items[0]);
    });
});

passport.use(new LocalStrategy(function(username, password, done) {
    models.User.find({
        username: username
    }, 1, function(err, users) {
        if (err) {
            return done(err);
        }

        if (users.length < 1) {
            return done(null, false, {
                message: 'Invalid username or password.'
            });
        }

        var user = users[0];

        bcrypt.compare(password, user.password, function(err, res) {
            if (err) {
                return done(err);
            }

            if (res) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: 'Invalid username or password.'
                });
            }
        });
    });
}));

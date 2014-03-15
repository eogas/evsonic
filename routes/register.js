
var passport = require('passport'),
    bcrypt = require('bcrypt'),
    models = require('../models'),
    config = require('../config');

module.exports = function(app) {
    app.post('/register', function(req, res) {
        var username = req.body.regUsername,
            password = req.body.regPassword,
            repeatedPass = req.body.regRepeatedPass;

        // invalid user or pass
        if (username.length < 1 ||
            password.length < 1 ||
            password !== repeatedPass) {
            res.redirect('/');
            return;
        }

        models.User.find({
            username: username
        }, 1, function(err, existingUsers) {

            // username is in use
            if (existingUsers.length > 0) {
                res.redirect('/');
                return;
            }

            // hash the password
            bcrypt.hash(password, config.bcrypt_cost, function(err, hash) {
                if (err) {
                    console.log(err);
                    return;
                }

                // all is well, create the user
                models.User.create([{
                    username: username,
                    password: hash
                }], function(err, newUsers) {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    // small hack to get around different field names
                    // on the registration form
                    req.body.username = username;
                    req.body.password = password;

                    // login
                    passport.authenticate('local')(req, res, function() {
                        res.redirect('/');
                    });
                });
            });
        });
    });
};

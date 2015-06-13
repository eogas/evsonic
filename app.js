/// <reference path="typings/node/node.d.ts"/>

var config = require('./config.js');

var express = require('express'),
    app = express(),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    path = require('path');

var models = require('./models')(app);

// express config
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: config.session_secret
}));
app.use(passport.initialize());
app.use(passport.session());

var auth = require('./auth'),
    routes = require('./routes')(app);

// pass any files through unchanged
app.get('*.*', function(req, res) {
    res.sendFile(req.url, res);
});

var views = function(view) {
    return path.join(__dirname, './views/', view);
};

// if we have a user session, push out home.html (angular handles routing),
// otherwise present the login form
app.get('*', function(req, res) {
    if (req.user) {
        res.sendFile(views('home.html'));
    } else {
        res.sendFile(views('login.html'));
    }
});

app.listen(config.port);
console.log('Listening on port ' + config.port + '...');
